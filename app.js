/* ================================================================
   BUYER & SELL PLAYBOOK — APP
   Hash-routed single page. No framework, no build step, no login.
   Progress and theme persist in localStorage (device only).
   ================================================================ */
(function () {
  "use strict";

  var COURSE = window.PLAYBOOK_COURSE;
  if (!COURSE) {
    document.body.innerHTML =
      '<p style="padding:2rem;font-family:sans-serif">content.js is missing — the course data could not be loaded.</p>';
    return;
  }

  /* ---------- helpers ---------- */
  function $(sel, el) { return (el || document).querySelector(sel); }
  function $all(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function phaseOf(id) {
    for (var i = 0; i < COURSE.phases.length; i++) {
      if (COURSE.phases[i].id === id) return COURSE.phases[i];
    }
    return { id: id, label: "General" };
  }

  function phaseRoman(phaseId) {
    for (var i = 0; i < COURSE.phases.length; i++) {
      if (COURSE.phases[i].id === phaseId) return pad(i + 1);
    }
    return "—";
  }

  function moduleIndex(id) {
    for (var i = 0; i < COURSE.modules.length; i++) {
      if (COURSE.modules[i].id === id) return i;
    }
    return -1;
  }

  function driveUrl(m) {
    return (m && m.drive) ? m.drive : COURSE.drive;
  }

  function announce(msg) {
    var region = $("#live");
    if (!region) return;
    region.textContent = "";
    window.requestAnimationFrame(function () { region.textContent = msg; });
  }

  /* ---------- state ---------- */
  var STORE_KEY = "bs-playbook-v1";
  var THEME_KEY = "bs-theme";

  var store = load();
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return { done: parsed.done || {}, checks: parsed.checks || {} };
      }
    } catch (e) { /* storage unavailable — run in memory */ }
    return { done: {}, checks: {} };
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* no-op */ }
  }

  function checksFor(id) {
    return store.checks[id] || [];
  }
  function checkCount(id) {
    var c = checksFor(id);
    return c.filter(Boolean).length;
  }
  function isDone(id) { return !!store.done[id]; }

  var TOTAL = COURSE.modules.length;
  function doneCount() {
    return COURSE.modules.reduce(function (n, m) { return n + (isDone(m.id) ? 1 : 0); }, 0);
  }

  function firstIncomplete() {
    for (var i = 0; i < COURSE.modules.length; i++) {
      if (!isDone(COURSE.modules[i].id)) return COURSE.modules[i];
    }
    return COURSE.modules[0];
  }

  /* ---------- theme ---------- */
  function applyTheme(t, persist) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = $("#themeToggle");
    if (btn) btn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    if (persist) {
      try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* no-op */ }
    }
  }
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  /* ---------- shared bits ---------- */
  var ICONS = {
    check: '<svg class="side-check" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l4 4L16 5.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    doneBadge: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15"/><path d="M6 10.3l2.6 2.7L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    halfBadge: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 10h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    ext: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8.5 5H5.5a1.5 1.5 0 00-1.5 1.5v7.5A1.5 1.5 0 005.5 15.5h7.5A1.5 1.5 0 0014.5 14v-3M11 4.5h4.5V9M15 5L9.5 10.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10h12M10.5 4.5 16 10l-5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowDown: '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5v12M4.5 10l5.5 5.5 5.5-5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    drive: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.2 3h5.6l6.4 11-2.8 5H5.6L2.8 14 9.2 3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.2 3l-6.4 11L5.6 19M14.8 3l6.4 11-2.8 5M7 14h10" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    search: '<svg class="search-ico" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.8"/><path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    party: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19L15.5 8.5M15.5 8.5l2.6-2.6a1.6 1.6 0 00-2.3-2.3l-2.6 2.6M15.5 8.5l3 3M9 5l1.2 1.2M5 9l1.2 1.2M17 13l-1.2 1.2M13 17l-1.2-1.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  };

  function statusOf(m) {
    if (isDone(m.id)) return { cls: "is-done", label: "Completed", icon: ICONS.doneBadge };
    var done = checkCount(m.id);
    if (done > 0) return { cls: "is-partial", label: done + " of " + m.checks.length + " checked", icon: ICONS.halfBadge };
    return { cls: "is-new", label: "Not started", icon: "" };
  }

  /* ---------- sidebar ---------- */
  function renderSidebar() {
    var nav = $("#sidebar");
    var html = '<div class="sidebar-intro"><p class="sidebar-kicker">The collection</p><h2 class="sidebar-title">Your transaction journey</h2><p class="sidebar-subtitle">' + COURSE.phases.length + ' phases. One exceptional client experience.</p></div>';
    COURSE.phases.forEach(function (phase) {
      var mods = COURSE.modules.filter(function (m) { return m.phase === phase.id; });
      if (!mods.length) return;
      html += '<div class="phase-group"><p class="phase-label"><span class="phase-num">' + phaseRoman(phase.id) + "</span><span class=\"phase-name\">" + esc(phase.label) + '</span><span class="phase-count">' + pad(mods.length) + "</span></p>";
      mods.forEach(function (m) {
        var i = moduleIndex(m.id);
        html +=
          '<a class="side-link" href="#/module/' + m.id + '" data-id="' + m.id + '">' +
          '<span class="side-num" aria-hidden="true">' + pad(i + 1) + "</span>" +
          '<span class="side-title">' + esc(m.title) + "</span>" +
          ICONS.check +
          '<span class="sr-only">Module ' + (i + 1) + " of " + TOTAL + "</span>" +
          "</a>";
      });
      html += "</div>";
    });
    html += '<div class="sidebar-note"><span class="sidebar-note-mark" aria-hidden="true">B&amp;S</span><span>Thoughtful process.<br>Exceptional service.</span></div>';
    nav.innerHTML = html;
  }

  function refreshSidebar(currentId) {
    $all(".side-link", $("#sidebar")).forEach(function (link) {
      var id = link.getAttribute("data-id");
      link.classList.toggle("done", isDone(id));
      if (id === currentId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      var sr = link.querySelector(".sr-only");
      if (sr) {
        sr.textContent = "Module " + (moduleIndex(id) + 1) + " of " + TOTAL + (isDone(id) ? ", completed" : "");
      }
    });
  }

  /* ---------- progress UI ---------- */
  function refreshProgress() {
    var n = doneCount();
    var pct = Math.round((n / TOTAL) * 100);
    var fill = $("#headerProgressFill");
    if (fill) fill.style.width = pct + "%";
    var track = $("#headerProgressTrack");
    if (track) {
      track.setAttribute("aria-valuenow", String(n));
      track.setAttribute("aria-valuemax", String(TOTAL));
      track.setAttribute("aria-valuetext", n + " of " + TOTAL + " modules complete");
    }
    var label = $("#headerProgressLabel");
    if (label) label.textContent = n + " of " + TOTAL + " modules complete";

    var dashTrack = $("#dashProgressTrack");
    if (dashTrack) {
      var dashFill = $("#dashProgressFill");
      if (dashFill) dashFill.style.width = pct + "%";
      var meta = $("#dashProgressMeta");
      if (meta) meta.innerHTML = "<span>Your journey</span><strong>" + n + " / " + TOTAL + " complete</strong>";
    }
  }

  /* ---------- dashboard ---------- */
  function cardHtml(m) {
    var i = moduleIndex(m.id);
    var phase = phaseOf(m.phase);
    var st = statusOf(m);
    var cls = "card" + (isDone(m.id) ? " done" : "");
    return (
      '<li data-card="' + m.id + '">' +
      '<a class="' + cls + '" href="#/module/' + m.id + '" aria-label="Module ' + (i + 1) + ": " + esc(m.title) + (isDone(m.id) ? " (completed)" : "") + ">" +
      '<span class="card-top"><span class="card-num" aria-hidden="true">' + pad(i + 1) + "</span>" +
      '<span class="card-status ' + st.cls + '">' + st.icon + "<span>" + esc(st.label) + "</span></span></span>" +
      '<span class="card-phase">' + esc(phase.label) + "</span>" +
      '<h3 class="card-title">' + esc(m.title) + "</h3>" +
      '<p class="card-sum">' + esc(m.summary) + "</p>" +
      '<span class="card-foot"><span class="card-open">Explore module</span>' + ICONS.arrow + "</span>" +
      "</a></li>"
    );
  }

  function renderDashboard() {
    var m = $("#main");
    var n = doneCount();
    var allDone = n === TOTAL;
    var next = firstIncomplete();
    var nextIndex = moduleIndex(next.id) + 1;
    var pct = Math.round((n / TOTAL) * 100);

    var html = '<section class="dashboard-hero" aria-label="Playbook overview">';
    html += '<div class="hero-copy">';
    html += '<p class="eyebrow"><span class="eyebrow-rule" aria-hidden="true"></span>' + esc(COURSE.title) + '</p>';
    html += '<h1 tabindex="-1" id="pageTitle">Exceptional service,<br><em>beautifully delivered.</em></h1>';
    html += '<p class="lead">' + esc(COURSE.intro) + '</p>';

    if (allDone) {
      html += '<div class="celebrate" role="status">' + ICONS.party + "<span>Playbook complete — all fourteen modules run through. Beautifully done.</span></div>";
    }

    html += '<div class="dash-cta">';
    html += '<a class="btn btn-primary" href="#/module/' + next.id + '">' +
      (allDone ? "Review the playbook" : n === 0 ? "Begin your journey" : "Continue your journey") + ICONS.arrow + "</a>";
    if (n > 0 && !allDone) {
      html += '<span class="cta-note">Next · ' + pad(nextIndex) + ' ' + esc(next.title) + "</span>";
    }
    html += '<button type="button" class="btn btn-text" data-action="browse-modules">Explore all modules' + ICONS.arrowDown + "</button>";
    html += "</div>";

    html += '<div class="hero-progress">' +
      '<div class="progress-meta" id="dashProgressMeta"><span>Your journey</span><strong>' + n + " / " + TOTAL + " complete</strong></div>" +
      '<div class="progress-track" id="dashProgressTrack" role="progressbar" aria-label="Playbook progress" aria-valuemin="0" aria-valuemax="' + TOTAL + '" aria-valuenow="' + n + '" aria-valuetext="' + n + " of " + TOTAL + ' modules complete"><div class="progress-fill" id="dashProgressFill" style="width:' + pct + '%"></div></div>' +
      '<div class="hero-facts"><span><strong>14</strong> guided modules</span><span><strong>06</strong> focused phases</span><span>Self-paced</span></div>' +
      "</div></div>";

    html += '<figure class="hero-visual">' +
      '<img src="assets/residence-hero.jpg" alt="A contemporary limestone residence surrounded by mature trees and landscaped gardens at golden hour" fetchpriority="high">' +
      '<div class="hero-image-wash" aria-hidden="true"></div>' +
      '<div class="hero-photo-label"><span class="photo-label-mark" aria-hidden="true">B&amp;S</span><span>THE PRIVATE CLIENT STANDARD</span></div>' +
      '<figcaption class="hero-caption"><span class="caption-kicker">BUILT ON THE DETAILS</span><strong>Thoughtful at every turn.</strong><span>From first conversation to final handoff.</span></figcaption>' +
      '<span class="hero-frame" aria-hidden="true"></span>' +
      "</figure></section>";

    html += '<section class="module-library" id="moduleMap" aria-labelledby="libraryTitle">';
    html += '<div class="library-head"><div><p class="eyebrow">THE PLAYBOOK</p><h2 id="libraryTitle">A journey in six phases</h2></div>' +
      '<p>Practical workflows, shared resources, and a clear path through every client relationship.</p></div>';
    html += '<div class="library-tools"><p class="library-count"><strong>14</strong> curated workflows <span aria-hidden="true">·</span> six phases</p>';
    html += '<section class="dash-search" role="search" aria-label="Search modules"><label for="moduleSearch">Find a workflow</label>';
    html += '<div class="search-wrap">' + ICONS.search +
      '<input type="search" id="moduleSearch" name="moduleSearch" placeholder="Try “inspection” or “closing”…" autocomplete="off">' +
      '<button type="button" class="search-clear" data-action="clear-search" hidden aria-label="Clear search"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button>' +
      "</div></section></div>";

    var blocks = "";
    COURSE.phases.forEach(function (phase) {
      var mods = COURSE.modules.filter(function (x) { return x.phase === phase.id; });
      if (!mods.length) return;
      blocks += '<section class="phase-block" aria-labelledby="ph-' + phase.id + '">';
      blocks += '<div class="phase-heading"><h2 class="phase-title" id="ph-' + phase.id + '"><span class="phase-num">PHASE ' + phaseRoman(phase.id) + "</span><span>" + esc(phase.label) + "</span></h2>" +
        '<span class="phase-total">' + pad(mods.length) + (mods.length === 1 ? " module" : " modules") + "</span></div>";
      blocks += '<ol class="cards" data-phase="' + phase.id + '">';
      mods.forEach(function (x) { blocks += cardHtml(x); });
      blocks += "</ol>";
      blocks += '<p class="search-empty" data-phase-empty="' + phase.id + '" hidden>No workflows in this phase match your search.</p>';
      blocks += "</section>";
    });
    html += blocks;

    html += '<p class="search-empty global-empty" id="globalEmpty" hidden>No workflows match your search. Try another phrase, or <button type="button" data-action="clear-search" class="linkish">clear the search</button>.</p>';
    html += '<footer class="dash-foot"><span>Training files are shared on <a href="' + esc(COURSE.drive) + '" target="_blank" rel="noopener noreferrer">Google Drive</a> — no login required.</span>' +
      '<span>Your progress is saved on this device only.</span></footer>';
    html += "</section>";

    m.innerHTML = html;
    wireSearch();
    document.title = COURSE.title + " — Private Client Playbook";
  }

  /* ---------- module view ---------- */
  function renderModule(id) {
    var idx = moduleIndex(id);
    if (idx === -1) { location.hash = ""; return; }
    var m = COURSE.modules[idx];
    var phase = phaseOf(m.phase);
    var prev = idx > 0 ? COURSE.modules[idx - 1] : null;
    var next = idx < TOTAL - 1 ? COURSE.modules[idx + 1] : null;
    var checks = checksFor(id);
    var doneN = checkCount(id);
    var complete = isDone(id);
    var url = driveUrl(m);

    var html = "";
    html += '<nav class="crumbs" aria-label="Breadcrumb"><ol>' +
      '<li><a href="#/">Overview</a></li>' +
      '<li><span>Phase ' + phaseRoman(phase.id) + " — " + esc(phase.label) + "</span></li>" +
      '<li><span aria-current="page">' + esc(m.title) + "</span></li></ol></nav>";

    html += '<header class="module-hero" data-phase="' + esc(phase.id) + '"><div class="mod-head">' +
      '<p class="eyebrow"><span class="eyebrow-rule" aria-hidden="true"></span>MODULE ' + pad(idx + 1) + ' <span class="sep">/</span> PHASE ' + phaseRoman(phase.id) + ' OF ' + pad(COURSE.phases.length) + '</p>';
    html += '<h1 tabindex="-1" id="pageTitle">' + esc(m.title) + "</h1>";
    html += '<p class="lead mod-lead">' + esc(m.summary) + "</p>";
    html += '<span class="module-phase-tag">' + esc(phase.label) + "</span></div>";
    html += '<div class="module-index" aria-hidden="true"><span>THE PLAYBOOK</span><strong>' + pad(idx + 1) + '</strong><span>OF ' + pad(TOTAL) + '</span></div></header>';

    html += '<section class="drive-banner" aria-labelledby="drive-h">' +
      '<div class="drive-ico">' + ICONS.drive + "</div>" +
      '<div class="drive-copy"><p class="resource-kicker">YOUR RESOURCE LIBRARY</p><h2 id="drive-h">Everything you need, in one place</h2>' +
      '<p>Open this workflow’s video, templates and reference files in shared Google Drive. No login required.</p></div>' +
      '<a class="btn btn-primary" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Open module folder ' + ICONS.arrow + "</a>" +
      "</section>";

    html += '<section class="mod-section" aria-labelledby="steps-h"><div class="section-heading"><div><p class="section-kicker">THE PROCESS</p><h2 id="steps-h">The run-through</h2></div>' +
      '<span class="section-count">' + pad(m.steps.length) + (m.steps.length === 1 ? " step" : " steps") + "</span></div>" +
      '<p class="section-intro">Move through each step at your own pace. The shared resources are there whenever you need a closer look.</p><ol class="steps">';
    m.steps.forEach(function (s) { html += "<li><p>" + esc(s) + "</p></li>"; });
    html += "</ol></section>";

    html += '<section class="mod-section checklist-section" aria-labelledby="checks-h">' +
      '<div class="section-heading"><div><p class="section-kicker">YOUR STANDARD</p><h2 id="checks-h">A confident handoff</h2></div>' +
      '<span class="checks-count" id="checksCount">' + doneN + " of " + m.checks.length + " complete</span></div>" +
      '<p class="section-intro">Use this checklist to confirm each detail is ready before moving on.</p><ul class="checks">';
    m.checks.forEach(function (c, i) {
      html += '<li><label><input type="checkbox" data-check="' + i + '"' + (checks[i] ? " checked" : "") + "><span>" + esc(c) + "</span></label></li>";
    });
    html += "</ul></section>";

    var hint = !complete && doneN === m.checks.length
      ? ' <span class="action-note">All checks done — mark it complete below.</span>'
      : !complete
        ? ' <span class="action-note">Tick every check above, then mark the module complete.</span>'
        : ' <span class="action-note">Completed — you can undo if you need to revisit it.</span>';

    html += '<div class="mod-actions"><button type="button" class="btn ' + (complete ? "btn-ghost" : "btn-primary") + '" data-action="toggle-complete" aria-pressed="' + complete + '">' +
      (complete ? "Completed ✓ &nbsp;Undo" : "Mark module complete") + "</button>" + hint + "</div>";

    html += '<nav class="pager" aria-label="Module navigation">';
    if (prev) {
      html += '<a class="pager-card prev" href="#/module/' + prev.id + '"><span class="pager-dir">← Previous</span><span class="pager-title">' + esc(prev.title) + "</span></a>";
    } else {
      html += '<a class="pager-card prev" href="#/" ><span class="pager-dir">← Back to</span><span class="pager-title">Dashboard</span></a>';
    }
    if (next) {
      html += '<a class="pager-card next" href="#/module/' + next.id + '"><span class="pager-dir">Next →</span><span class="pager-title">' + esc(next.title) + "</span></a>";
    } else {
      html += '<span class="pager-empty">That was the last module — back to the <a href="#/">dashboard</a> to review your progress.</span>';
    }
    html += "</nav>";

    html += '<p class="kbd-hint">Shortcuts: <kbd>N</kbd> next module · <kbd>P</kbd> previous module · <kbd>D</kbd> dashboard</p>';

    $("#main").innerHTML = html;
    document.title = m.title + " — " + COURSE.title;
  }

  /* ---------- search ---------- */
  function wireSearch() {
    var input = $("#moduleSearch");
    if (!input) return;
    var clearBtn = $('.search-clear[data-action="clear-search"]');

    function run(q) {
      var query = q.trim().toLowerCase();
      var totalMatches = 0;
      var phaseHits = {};
      COURSE.modules.forEach(function (m) {
        var li = $('#main [data-card="' + m.id + '"]');
        if (!li) return;
        var hay = (m.title + " " + m.summary + " " + phaseOf(m.phase).label).toLowerCase();
        var hit = !query || hay.indexOf(query) !== -1;
        li.hidden = !hit;
        if (hit) { totalMatches++; phaseHits[m.phase] = (phaseHits[m.phase] || 0) + 1; }
      });
      COURSE.phases.forEach(function (phase) {
        var empty = $('[data-phase-empty="' + phase.id + '"]');
        if (empty) empty.hidden = !query || (phaseHits[phase.id] || 0) > 0;
      });
      var global = $("#globalEmpty");
      if (global) global.hidden = totalMatches > 0;
      if (clearBtn) clearBtn.hidden = !q;
      if (query) announce(totalMatches + (totalMatches === 1 ? " module matches" : " modules match") + " your search");
    }

    input.addEventListener("input", function () { run(input.value); });
    if (clearBtn) clearBtn.addEventListener("click", function () { input.value = ""; run(""); input.focus(); });
  }

  function clearSearch() {
    var input = $("#moduleSearch");
    if (input) {
      input.value = "";
      COURSE.modules.forEach(function (m) {
        var card = $('#main [data-card="' + m.id + '"]');
        if (card) card.hidden = false;
      });
      $all("[data-phase-empty]").forEach(function (p) { p.hidden = true; });
      var global = $("#globalEmpty");
      if (global) global.hidden = true;
      var clearBtn = $('.search-clear[data-action="clear-search"]');
      if (clearBtn) clearBtn.hidden = true;
    }
  }

  /* ---------- actions ---------- */
  function toggleComplete(id) {
    var m = COURSE.modules[moduleIndex(id)];
    if (!m) return;
    var nowDone = !isDone(id);
    store.done[id] = nowDone ? true : undefined;
    if (!store.done[id]) delete store.done[id];
    save();
    renderModule(id); // re-render so button + hint update
    var btn = $('[data-action="toggle-complete"]');
    if (btn) btn.focus(); // keep keyboard focus on the control we just changed
    refreshSidebar(id);
    refreshProgress();
    announce(nowDone ? m.title + " marked complete. " + doneCount() + " of " + TOTAL + " done." : m.title + " marked as in progress.");
  }

  function toggleCheck(id, i) {
    var m = COURSE.modules[moduleIndex(id)];
    if (!m) return;
    var checks = checksFor(id);
    checks[i] = !checks[i];
    store.checks[id] = checks;
    save();
    var label = $("#checksCount");
    var doneN = checkCount(id);
    if (label) label.textContent = doneN + " of " + m.checks.length + " done";
    if (!isDone(id) && doneN === m.checks.length) {
      announce("All checks done for " + m.title + ". Mark the module complete when you're ready.");
    }
  }

  /* ---------- router ---------- */
  var firstRender = true;

  function route() {
    var hash = location.hash || "#/";
    var modMatch = hash.match(/^#\/module\/([\w-]+)$/);
    var view, id = null;
    if (modMatch && moduleIndex(modMatch[1]) !== -1) {
      view = "module"; id = modMatch[1];
    } else {
      view = "dashboard";
    }

    if (view === "dashboard") {
      renderDashboard();
    } else {
      renderModule(id);
    }
    refreshSidebar(view === "module" ? id : null);
    refreshProgress();
    closeNav();

    if (!firstRender) {
      window.scrollTo({ top: 0, behavior: "auto" });
      var h1 = $("#pageTitle");
      if (h1) h1.focus();
    }
    firstRender = false;
  }

  /* ---------- mobile nav ---------- */
  function openNav() {
    document.body.classList.add("nav-open");
    var scrim = $("#navScrim");
    if (scrim) scrim.hidden = false;
    var btn = $("#menuBtn");
    if (btn) btn.setAttribute("aria-expanded", "true");
    var first = $('.side-link[aria-current="page"]', $("#sidebar")) || $(".side-link", $("#sidebar"));
    if (first) first.focus();
  }
  function closeNav() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    var scrim = $("#navScrim");
    if (scrim) scrim.hidden = true;
    var btn = $("#menuBtn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  /* ---------- global wiring ---------- */
  document.addEventListener("click", function (e) {
    var actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      var action = actionEl.getAttribute("data-action");
      if (action === "toggle-complete") {
        var hash = location.hash.match(/^#\/module\/([\w-]+)$/);
        if (hash) toggleComplete(hash[1]);
      } else if (action === "clear-search") {
        clearSearch();
        var input = $("#moduleSearch");
        if (input && actionEl.classList.contains("search-clear")) input.focus();
      } else if (action === "browse-modules") {
        var moduleMap = $("#moduleMap");
        var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (moduleMap) moduleMap.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    }
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.matches("#main .checks input[type=checkbox]")) {
      var hash = location.hash.match(/^#\/module\/([\w-]+)$/);
      if (hash) toggleCheck(hash[1], Number(t.getAttribute("data-check")));
    }
  });

  document.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || "";
    var typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable);

    if (e.key === "Escape") {
      if (document.body.classList.contains("nav-open")) {
        closeNav();
        var btn = $("#menuBtn");
        if (btn) btn.focus();
      }
      return;
    }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

    var hash = location.hash || "#/";
    var modMatch = hash.match(/^#\/module\/([\w-]+)$/);

    if (e.key === "/" && !modMatch) {
      var input = $("#moduleSearch");
      if (input) { e.preventDefault(); input.focus(); }
      return;
    }
    if (modMatch) {
      var idx = moduleIndex(modMatch[1]);
      if (e.key === "n" || e.key === "N") {
        if (idx < TOTAL - 1) location.hash = "#/module/" + COURSE.modules[idx + 1].id;
      } else if (e.key === "p" || e.key === "P") {
        if (idx > 0) location.hash = "#/module/" + COURSE.modules[idx - 1].id;
      } else if (e.key === "d" || e.key === "D") {
        location.hash = "#/";
      }
    }
  });

  /* ---------- init ---------- */
  function init() {
    // Header height for sidebar offset
    var header = $(".site-header");
    if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");

    applyTheme(currentTheme(), false); // sync toggle button state with the applied theme
    renderSidebar();
    route();

    var themeBtn = $("#themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });

    var menuBtn = $("#menuBtn");
    if (menuBtn) menuBtn.addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) closeNav();
      else openNav();
    });
    var scrim = $("#navScrim");
    if (scrim) scrim.addEventListener("click", function () { closeNav(); });

    window.addEventListener("hashchange", route);
    window.addEventListener("resize", function () {
      if (header) document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
