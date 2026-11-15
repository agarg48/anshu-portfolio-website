/* ==========================================================================
   SITE CONTENT & SETTINGS
   --------------------------------------------------------------------------
   This is the ONE file to edit for day-to-day content changes:
     1. SITE      → WhatsApp number, prefilled message, form endpoint
     2. SKILLS    → the 6 modules shown in the interactive Skills dial
     3. PROJECTS  → the project cards in the Projects carousel
   Search for "PLACEHOLDER" to find everything that still needs real content.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. SITE SETTINGS
   -------------------------------------------------------------------------- */
window.SITE = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes)
  whatsappNumber: "919910520685",

  // Text that is pre-filled when a visitor opens WhatsApp from the site
  whatsappMessage:
    "Hi Anshumali, I found your portfolio and would like to discuss an AI agent / agentic workflow for my team.",

  // PLACEHOLDER: "Book a call" form endpoint.
  // GitHub Pages cannot run server code, so form submissions need a form service.
  //   • Create a free form at https://formspree.io and paste its URL here,
  //     e.g. "https://formspree.io/f/abcdwxyz"
  //   • While this is empty, submitting the form opens WhatsApp with the
  //     visitor's details pre-filled, so no enquiry is lost.
  formEndpoint: ""
};

/* --------------------------------------------------------------------------
   2. SKILLS (interactive dial)
   --------------------------------------------------------------------------
   Each skill:
     icon    → one of: "agentic", "spec", "bank", "sparkles", "workflow", "automation"
     slug    → short id shown in the panel's "path" bar
     title   → module title
     lead    → small label above the chips
     chips   → keywords that fade in one by one
     outcome → (optional) closing line that fades in word by word
   -------------------------------------------------------------------------- */
window.SKILLS = [
  {
    icon: "agentic",
    slug: "agentic-ai",
    title: "Agentic AI for Business",
    lead: "Actively developing expertise in",
    chips: [
      "Agentic AI",
      "AI-powered workflow orchestration",
      "Multi-agent systems",
      "Large Language Models (LLMs)",
      "Prompt engineering",
      "Intelligent automation"
    ],
    outcomeLabel: "Aimed at",
    outcome:
      "Identifying opportunities for streamlining business processes, enhancing operational efficiency, and transforming traditional banking operations."
  },
  {
    icon: "spec",
    slug: "requirements",
    title: "Requirements & Solution Design",
    lead: "Skilled in",
    chips: [
      "Requirement engineering",
      "Functional specification development",
      "Stakeholder management",
      "API analysis",
      "Workflow optimization"
    ],
    outcomeLabel: "Outcome",
    outcome: "Translating complex banking requirements into scalable technology solutions."
  },
  {
    icon: "bank",
    slug: "banking",
    title: "Banking & Digital Transformation",
    lead: "Experienced in",
    chips: [
      "Banking Business Analysis",
      "Core Banking Operations",
      "Mainframe Technology",
      "Digital Transformation"
    ],
    outcomeLabel: "Direction",
    outcome: "With a growing focus on Generative AI and Agentic AI capabilities."
  },
  {
    icon: "sparkles",
    slug: "gen-ai",
    title: "Generative AI & LLMs",
    lead: "Focus areas",
    chips: [
      "Generative AI",
      "Large Language Models (LLMs)",
      "Prompt Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "AI-Assisted Documentation"
    ]
  },
  {
    icon: "workflow",
    slug: "ai-agents",
    title: "AI Agents & Orchestration",
    lead: "Focus areas",
    chips: [
      "Agentic AI Concepts",
      "AI Agents",
      "Multi-Agent Systems",
      "AI Workflow Orchestration",
      "Autonomous Workflows",
      "AI-Driven Process Automation"
    ]
  },
  {
    icon: "automation",
    slug: "automation",
    title: "Intelligent Automation & Testing",
    lead: "Focus areas",
    chips: [
      "Intelligent Automation",
      "AI-Based Requirement Analysis",
      "AI-Powered Testing",
      "Process Optimization",
      "Human-in-the-Loop Workflows"
    ]
  }
];

/* --------------------------------------------------------------------------
   3. PROJECTS (carousel)
   --------------------------------------------------------------------------
   To add a project: copy one { ... } block, paste it at the end, edit it.
   The carousel, dots and counter update automatically.
     name        → project name
     description → one-line description
     stack       → list of tools / tech used
     link        → URL of the live project, demo video or repo
     image       → path to a screenshot, e.g. "assets/images/projects/project-01.png"
                   (leave "" to show the styled placeholder)
     placeholder → set to false once the card has real content
                   (removes the "Placeholder" badge)
   -------------------------------------------------------------------------- */
window.PROJECTS = [
  // PLACEHOLDER: Project 01
  {
    name: "Project Name 01",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 02
  {
    name: "Project Name 02",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 03
  {
    name: "Project Name 03",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 04
  {
    name: "Project Name 04",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 05
  {
    name: "Project Name 05",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 06
  {
    name: "Project Name 06",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 07
  {
    name: "Project Name 07",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  },
  // PLACEHOLDER: Project 08
  {
    name: "Project Name 08",
    description: "PLACEHOLDER — one-line description of what this agent / workflow does for the business.",
    stack: ["Tech 1", "Tech 2", "Tech 3"],
    link: "#",
    image: "",
    placeholder: true
  }
];
