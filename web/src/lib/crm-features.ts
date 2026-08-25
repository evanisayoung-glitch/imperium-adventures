export const pillarKeys = ["find", "close", "grow", "win"] as const;

export type PillarKey = (typeof pillarKeys)[number];

export type FeatureDetail = {
  title: string;
  body: string;
  beat: string;
};

export type PillarPage = {
  key: PillarKey;
  title: string;
  question: string;
  eyebrow: string;
  headline: string;
  lede: string;
  body: string;
  capabilities: string[];
  features: FeatureDetail[];
  steps: Array<{ title: string; body: string }>;
  demoLabel: string;
};

export const pillars: readonly PillarPage[] = [
  {
    key: "find",
    title: "Find",
    question: "Who should I pursue?",
    eyebrow: "Pillar · Find",
    headline: "Turn a market into a ranked list worth a rep’s time.",
    lede: "Merchant intelligence that scores, explains, and prioritizes — so prospecting starts with signal, not spreadsheets.",
    body: "Turn an undifferentiated market into a ranked, scored list of merchants worth a rep’s time.",
    capabilities: [
      "Merchant Intelligence & territory analytics",
      "Finti Score with explainable breakdowns",
      "AI merchant research from a URL or name",
      "Prospecting lists and opportunity ranking",
    ],
    features: [
      {
        title: "Merchant Intelligence",
        body: "Territory maps, density heat, and fit filters that surface who belongs on this week’s route — not every name in the county.",
        beat: "Territory → shortlist",
      },
      {
        title: "Finti Score",
        body: "A 0–100 score with an explainable breakdown: volume potential, payment fit, competitive pressure, and timing signals.",
        beat: "Score with reasons",
      },
      {
        title: "AI merchant research",
        body: "Paste a URL or name. The OS drafts a merchant brief — category, footprint, talking points — ready for the first call.",
        beat: "URL → brief",
      },
      {
        title: "Prospecting lists",
        body: "Saved lists ranked by opportunity. Share with a pod, pin A+ merchants, and keep the queue honest as data updates.",
        beat: "Ranked queues",
      },
      {
        title: "Opportunity ranking",
        body: "Composite ranking that blends score, stage proximity, and recent activity so reps open the book with a clear first move.",
        beat: "Who next?",
      },
    ],
    steps: [
      {
        title: "Define the territory",
        body: "Import or draw the market you cover. The OS normalizes merchants into a living book.",
      },
      {
        title: "Score & explain",
        body: "Finti Score ranks fit. Every number opens into the factors that drove it.",
      },
      {
        title: "Ship the shortlist",
        body: "Reps leave with a prioritized list and research briefs — not a raw dump of leads.",
      },
    ],
    demoLabel: "Live scoring preview",
  },
  {
    key: "close",
    title: "Close",
    question: "How do I win this merchant?",
    eyebrow: "Pillar · Close",
    headline: "Pipeline clarity from first contact to signed.",
    lede: "Kanban that mirrors your sales journey, AI call prep wired to the merchant, and follow-ups that refuse to slip.",
    body: "Move deals from first contact to signed with pipeline clarity and conversation prep.",
    capabilities: [
      "Kanban pipeline across the full sales journey",
      "AI Call Prep — openings, objections, next steps",
      "Follow-ups that don’t slip through the cracks",
      "Global search so every merchant stays reachable",
    ],
    features: [
      {
        title: "Kanban pipeline",
        body: "Stages shaped to your process — Prospect, Research, Demo, Negotiation, Signed — with drag, counts, and stage SLAs.",
        beat: "Journey on a board",
      },
      {
        title: "AI Call Prep",
        body: "Openings, likely objections, and next-step scripts grounded in the merchant brief and your playbook.",
        beat: "Walk in prepared",
      },
      {
        title: "Follow-up discipline",
        body: "Tasks tied to deals, not floating notes. Overdue glows. Completed clears the path for the next move.",
        beat: "Nothing slips",
      },
      {
        title: "Global search",
        body: "One field finds merchants, deals, notes, and people — so the phone ring never ends in “I’ll look it up later.”",
        beat: "Instant recall",
      },
      {
        title: "Deal timeline",
        body: "Every touch, note, and stage change in one scroll — the story a manager can coach from without a status meeting.",
        beat: "Full history",
      },
    ],
    steps: [
      {
        title: "Park the merchant",
        body: "Drop them into the right stage the moment contact starts.",
      },
      {
        title: "Prep the conversation",
        body: "AI Call Prep loads talking points and objections before the call starts.",
      },
      {
        title: "Advance or revive",
        body: "Move the card, schedule the follow-up, keep the timeline clean.",
      },
    ],
    demoLabel: "Pipeline in motion",
  },
  {
    key: "grow",
    title: "Grow",
    question: "How do I grow this merchant?",
    eyebrow: "Pillar · Grow",
    headline: "Signing is the beginning — production is the job.",
    lede: "Portfolio health, monthly production as system of record, and AI coaching that points at the next growth lever.",
    body: "Signing is the beginning. Track production, health, and coaching after the ink dries.",
    capabilities: [
      "Live merchant portfolio",
      "Explainable Merchant Health (0–100)",
      "Monthly production as the system of record",
      "Growth opportunities + AI coaching",
    ],
    features: [
      {
        title: "Live portfolio",
        body: "Every signed merchant in one view — volume, trend, owner, and health — ready for a morning scan.",
        beat: "Book at a glance",
      },
      {
        title: "Merchant Health",
        body: "A 0–100 health index with explainable drivers: utilization, payment consistency, support load, and expansion signals.",
        beat: "Explainable 0–100",
      },
      {
        title: "Production ledger",
        body: "Monthly production as the system of record — imported, reconciled, and trusted for commission math.",
        beat: "Truthful volumes",
      },
      {
        title: "Growth opportunities",
        body: "Surfaced upsells and adjacent products ranked by likelihood, not wishful thinking.",
        beat: "Next product",
      },
      {
        title: "AI coaching",
        body: "Talk tracks for at-risk and high-potential merchants — what to say this week, not a generic tip of the day.",
        beat: "Coach in context",
      },
    ],
    steps: [
      {
        title: "Ingest production",
        body: "Monthly volumes land and reconcile against the signed book.",
      },
      {
        title: "Read the health",
        body: "Health scores flag who needs attention and who is ready to expand.",
      },
      {
        title: "Act on coaching",
        body: "Reps take the suggested conversation into the field with a clear lever.",
      },
    ],
    demoLabel: "Health pulse",
  },
  {
    key: "win",
    title: "Win",
    question: "How do I make more recurring commission?",
    eyebrow: "Pillar · Win",
    headline: "Income clarity that drives the day.",
    lede: "Separate earned from projected. Provenance on every KPI. Forecasts leadership can trust at multi-rep scale.",
    body: "Separate what is earned from what is projected — so income clarity drives the day.",
    capabilities: [
      "Actual / projected / pipeline commission forecasts",
      "Provenance-badged KPIs (Verified, Estimated, Signed)",
      "Revenue scenarios and goal tracking",
      "Leadership-ready rollups designed for scale",
    ],
    features: [
      {
        title: "Commission forecast",
        body: "Actual, projected, and pipeline layers — so a rep knows what hit the bank versus what’s still in motion.",
        beat: "Earned vs ahead",
      },
      {
        title: "Provenance badges",
        body: "Every KPI wears Verified, Estimated, or Signed. No fabricated filler dressed up as fact.",
        beat: "Honest numbers",
      },
      {
        title: "Revenue scenarios",
        body: "What-if paths for closing rates and mix — useful for planning without turning the dashboard into fiction.",
        beat: "Plan the path",
      },
      {
        title: "Goal tracking",
        body: "Personal and team targets with progress that updates from the live book, not a weekly spreadsheet paste.",
        beat: "Targets that move",
      },
      {
        title: "Leadership rollups",
        body: "Pod and region views built for hundreds of reps and thousands of merchants — ownership intact.",
        beat: "Scale without fog",
      },
    ],
    steps: [
      {
        title: "Badge the source",
        body: "Every figure declares how it was computed and how confident it is.",
      },
      {
        title: "Layer the forecast",
        body: "Actual, projected, and pipeline stack into one income picture.",
      },
      {
        title: "Steer the week",
        body: "Goals and scenarios show where effort compounds into recurring commission.",
      },
    ],
    demoLabel: "Forecast stack",
  },
] as const;

export function getPillar(key: string): PillarPage | undefined {
  return pillars.find((pillar) => pillar.key === key);
}

export const showcaseHighlights = [
  {
    title: "Sales Command Dashboard",
    body: "KPIs computed from real book data — never hard-coded — with calculation transparency on every figure.",
  },
  {
    title: "Merchant Intake that scales",
    body: "Manual add, AI research, and CSV/XLSX import with column mapping, validation, and one-tap rollback.",
  },
  {
    title: "Field-ready responsive shell",
    body: "Desktop command center, tablet workspace, and phone field companion — verified across foldables too.",
  },
  {
    title: "Built for multi-rep reality",
    body: "Ownership, sharing, and permission models designed for hundreds of reps and thousands of merchants.",
  },
  {
    title: "Explainable scoring everywhere",
    body: "Finti Score and Merchant Health open into the factors behind the number — coaches coach, reps trust.",
  },
  {
    title: "AI wired to the playbook",
    body: "Research briefs and call prep grounded in your process — not a generic chatbot bolted on the side.",
  },
] as const;

export const platformCapabilities = [
  {
    title: "Provenance-first KPIs",
    body: "Verified, Estimated, and Signed badges travel with every figure on the command surface.",
  },
  {
    title: "Import with rollback",
    body: "CSV and XLSX pipelines with mapping, validation, and a one-tap undo when a file goes sideways.",
  },
  {
    title: "Permissioned sharing",
    body: "Ownership models that keep pods collaborative without leaking someone else’s book.",
  },
  {
    title: "Search that remembers",
    body: "Global search across merchants, deals, notes, and people — field-speed recall on every device.",
  },
  {
    title: "Audit-ready timelines",
    body: "Stage changes, touches, and coaching notes compose a history managers can coach from.",
  },
  {
    title: "Modern delivery stack",
    body: "Built to last, with room to grow as the sales team scales.",
  },
] as const;
