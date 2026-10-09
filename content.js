/* ================================================================
   BUYER & SELL PLAYBOOK — COURSE CONTENT
   ----------------------------------------------------------------
   This is the only file you need to touch to update the site.
   - `drive`        : the shared Google Drive folder (opens in a
                     new tab — it is shared with "anyone with the
                     link", so no login is needed).
   - module.drive   : optional deep link. Paste that module's own
                     subfolder URL here and its "Open module
                     folder" button will jump straight to it.
                     Leave it empty to open the root folder.
   ================================================================ */

window.PLAYBOOK_COURSE = {
  title: "The Buyer & Sell Playbook",
  tagline: "A private guide to the art of exceptional service.",
  intro:
    "Fourteen considered workflows take you from the first signed contract through closing and beyond. " +
    "Explore the standards, open the shared training resources, and track each step at your own pace — all in one place.",
  drive: "https://drive.google.com/drive/folders/1JD8dnZ1RQs5So590tUph-8zIykh7oxIu?usp=sharing",

  phases: [
    { id: "contracts",   label: "Contracts & Clients" },
    { id: "listing",     label: "Listing" },
    { id: "offers",      label: "Offers — Virginia" },
    { id: "inspections", label: "Inspections" },
    { id: "closing",     label: "Closing & Celebrations" },
    { id: "rentals",     label: "Rentals & Tenant Accounts" },
  ],

  modules: [
    {
      id: "clients-in-contract",
      title: "Clients in Contract",
      phase: "contracts",
      drive: "",
      summary:
        "When a buyer or seller signs a purchase contract, the clock starts. Walk through how a new client in contract is set up, what details are captured, and where the file lives so nothing gets lost.",
      steps: [
        "Open this module's folder in Drive and take stock of what's inside — video, templates and checklists.",
        "Watch the training video once, start to finish, and note any questions.",
        "Review the templates side by side with the video, so you know where every piece of client information gets recorded.",
        "Set up a practice client end to end before you close the folder.",
      ],
      checks: [
        "I can explain what “in contract” means and when the process kicks in",
        "I know which details to capture when a new contract is signed",
        "I can set up a new client using the template",
        "I know where the client's file lives after setup",
        "I've saved the video and templates to my quick-reference spot",
      ],
    },
    {
      id: "commercial-contracts",
      title: "Commercial Contracts",
      phase: "contracts",
      drive: "",
      summary:
        "Commercial deals follow a different contract path than residential ones. Walk through the commercial forms, how they differ from the ones you already know, and how each one gets filed.",
      steps: [
        "Open this module's folder in Drive and list the commercial forms it contains.",
        "Watch the training video, paying attention to where commercial terms differ from residential.",
        "Work through each form and mark the fields where your details go.",
        "Compare a commercial form against a residential one so the differences stick.",
      ],
      checks: [
        "I can tell a commercial deal from a residential one",
        "I know which forms apply to commercial contracts",
        "I can name the key differences from residential paperwork",
        "I know how a signed commercial contract gets filed",
        "I've saved the commercial forms set as a reference",
      ],
    },
    {
      id: "listing-on-bright",
      title: "Listing Property on Bright",
      phase: "listing",
      drive: "",
      summary:
        "Bright is where our listings go to work. Walk through the standard path for putting a property on Bright — from preparing the listing details to going live — so every listing is clean and complete.",
      steps: [
        "Open this module's folder in Drive and review the listing-prep checklist.",
        "Watch the training video, following along with the screens as they appear.",
        "Run the listing flow once on a practice property without posting it live.",
        "Review the go-live checklist so nothing gets missed on a real listing.",
      ],
      checks: [
        "I know what information must be gathered before a listing is created",
        "I can complete every field of a Bright listing correctly",
        "I know how photos, status and showing details are set up",
        "I've run through the go-live checklist",
        "I know who to ping when something won't sync on Bright",
      ],
    },
    {
      id: "offers-virginia",
      title: "Offers/Forms for Virginia Properties",
      phase: "offers",
      drive: "",
      summary:
        "Virginia deals run on the state's standard purchase and sales forms. Walk through which form to use for each offer scenario, how each one is completed, and how the paperwork is tracked through the transaction.",
      steps: [
        "Open this module's folder in Drive and map out the forms — offer, acceptance, addenda.",
        "Watch the training video, noting which form belongs to which scenario.",
        "Complete a sample offer from start to finish.",
        "Follow the tracking sheet so every page of a deal is accounted for.",
      ],
      checks: [
        "I can pick the right form for any offer scenario",
        "I've completed a sample offer with no blank fields",
        "I know how addenda and amendments attach to the main form",
        "I can track every page of a deal's paperwork",
        "I know where to find fresh, blank forms",
      ],
    },
    {
      id: "order-inspection-walkthrough",
      title: "Order Inspection and Final Walkthrough",
      phase: "inspections",
      drive: "",
      summary:
        "The inspection keeps the timeline moving. Walk through how both the home inspection and the buyer's final walkthrough are ordered, what is requested, and how the appointments are logged.",
      steps: [
        "Open this module's folder in Drive and review the ordering template.",
        "Watch the training video and follow the ordering steps.",
        "Place a practice order for both the inspection and the final walkthrough.",
        "Log both appointments the way the team tracks them.",
      ],
      checks: [
        "I know when the inspection and final walkthrough happen in the timeline",
        "I can place orders for both appointments",
        "I know exactly what details to include when ordering",
        "I can log both appointments in the tracker",
        "I know what to do when a date conflicts or a client needs to move one",
      ],
    },
    {
      id: "inspection-notice",
      title: "Property Inspection Notice",
      phase: "inspections",
      drive: "",
      summary:
        "Inspections must be noticed to the right parties, on time. Walk through how the property inspection notice is prepared with our template, and how it is checked before it goes out.",
      steps: [
        "Open this module's folder in Drive and study the notice template.",
        "Watch the training video, paying attention to who receives the notice and when.",
        "Draft a sample notice for a practice property.",
        "Run the pre-send review checklist line by line.",
      ],
      checks: [
        "I know who has to receive the inspection notice",
        "I can complete the template without errors",
        "I know the deadline for each notice type",
        "I've run the pre-send review checklist",
        "I know how sent notices are filed",
      ],
    },
    {
      id: "wv-va-inspectors",
      title: "WV/VA Inspectors",
      phase: "inspections",
      drive: "",
      summary:
        "West Virginia and Virginia properties use a specific set of approved inspectors. Walk through the roster, what each inspector covers, and how to book the right one for the job.",
      steps: [
        "Open this module's folder in Drive and review the inspector roster.",
        "Watch the training video and note each inspector's coverage area.",
        "Match three practice scenarios to the right inspector.",
        "Save a copy of the roster where you keep working references.",
      ],
      checks: [
        "I can tell the WV and VA inspector lists apart",
        "I know each inspector's coverage area",
        "I can book the right inspector for a given property",
        "I know what details are needed to book an inspection",
        "I've saved the roster to my quick-reference spot",
      ],
    },
    {
      id: "order-home-warranty",
      title: "Order Home Warranty",
      phase: "closing",
      drive: "",
      summary:
        "Many closings include a home warranty, and it's ours to order. Walk through the ordering process — provider, plan and timing — so the warranty is in place before closing day.",
      steps: [
        "Open this module's folder in Drive and review the ordering template.",
        "Watch the training video and follow the order steps.",
        "Place a practice order for a sample closing.",
        "Record the warranty details where closing files keep them.",
      ],
      checks: [
        "I know when in the timeline the warranty is ordered",
        "I can complete the order with the correct details",
        "I know what coverage is ordered and how it's billed",
        "I've recorded the confirmation in the closing file",
        "I know how to adjust or cancel the order if plans change",
      ],
    },
    {
      id: "housekeeping-letter",
      title: "Housekeeping Letter & Preparation",
      phase: "closing",
      drive: "",
      summary:
        "Before the final stretch, the property needs prep — and the housekeeping letter starts it. Walk through how the letter is written and how the prep is run so the home shows up polished at the finish line.",
      steps: [
        "Open this module's folder in Drive and study the housekeeping letter template.",
        "Watch the training video, following the prep sequence.",
        "Draft a sample letter and run the prep checklist on a practice property.",
        "Send the practice letter and log what was scheduled.",
      ],
      checks: [
        "I can write the housekeeping letter without errors",
        "I know who receives the letter and what it needs to say",
        "I can run the prep checklist start to finish",
        "I know how prep completion is confirmed",
        "I've saved the template to my quick-reference spot",
      ],
    },
    {
      id: "congratulation-letter",
      title: "Write a Congratulation Letter",
      phase: "closing",
      drive: "",
      summary:
        "Closing is the moment we make personal. Walk through how the congratulation letter is written — warm, professional, and on brand — using our template and examples.",
      steps: [
        "Open this module's folder in Drive and read the template and examples.",
        "Watch the training video and note the tone guidelines.",
        "Write a sample letter for a practice client.",
        "Review it against the checklist before signing off.",
      ],
      checks: [
        "I can personalize the template without losing the professional tone",
        "My letter has the right closing details — names, property, date",
        "I know how letters get printed and sent",
        "I've written and reviewed a full sample letter",
        "I know who reviews letters before they go out",
      ],
    },
    {
      id: "ordering-gifts",
      title: "Ordering Gifts",
      phase: "closing",
      drive: "",
      summary:
        "Closing gifts are a small detail clients remember. Walk through the vendor, the ordering process and the timing so gifts arrive for every closing, on time.",
      steps: [
        "Open this module's folder in Drive and review the vendor details and gift options.",
        "Watch the training video and follow the ordering steps.",
        "Place a practice order for a sample closing date.",
        "Log the order and its delivery window.",
      ],
      checks: [
        "I know how far in advance to order for a given closing date",
        "I can place an order with the correct delivery address",
        "I can handle personalization — names and notes — correctly",
        "I've logged the order and its delivery confirmation",
        "I know what happens if a closing is delayed or cancelled",
      ],
    },
    {
      id: "rental-lease",
      title: "Rental Lease",
      phase: "rentals",
      drive: "",
      summary:
        "When a property goes to rent, the lease keeps it running. Walk through the rental lease process — paperwork, signatures, and where the signed lease is stored.",
      steps: [
        "Open this module's folder in Drive and review the lease package.",
        "Watch the training video and follow the workflow.",
        "Run a practice lease start to finish — setup, signatures, filing.",
        "Log the lease in the property's record.",
      ],
      checks: [
        "I know what documents make up a full lease package",
        "I can set up a new lease with the right terms",
        "I know how the signature process works for landlord and tenant",
        "I know where signed leases are filed",
        "I know the renewal and termination process",
      ],
    },
    {
      id: "barber-station-tenants",
      title: "Barber Station Tenants",
      phase: "rentals",
      drive: "",
      summary:
        "The barber station runs its own tenant accounts and recurring tasks. Walk through the tenant file and get comfortable with the routine this account needs.",
      steps: [
        "Open this module's folder in Drive and get familiar with the tenant file.",
        "Watch the training video, following the account routine.",
        "Run through one full cycle of the standard touchpoints.",
        "Keep the tenant file up to date as you go.",
      ],
      checks: [
        "I can find every barber station tenant and their terms",
        "I know the recurring tasks for this account and when they happen",
        "I can handle rent, access and maintenance requests",
        "I've updated the tenant file with practice entries",
        "I know who to escalate to for this property",
      ],
    },
    {
      id: "parking-space-tenants",
      title: "Parking Space Tenants",
      phase: "rentals",
      drive: "",
      summary:
        "Parking space rentals are simple but steady. Walk through the tenant file and the standard touchpoints so this account never slips.",
      steps: [
        "Open this module's folder in Drive and get familiar with the tenant file.",
        "Watch the training video, following the account routine.",
        "Run through one full cycle of the standard touchpoints.",
        "Keep the tenant file current.",
      ],
      checks: [
        "I can find every parking space tenant and their space",
        "I know the recurring tasks for this account and their timing",
        "I can handle new tenants, move-outs and renewals",
        "I've updated the tenant file with practice entries",
        "I know who to escalate to for this property",
      ],
    },
  ],
};
