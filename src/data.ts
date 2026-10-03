// ─────────────────────────────────────────────────────────────
//  All portfolio content lives in this file.
//  Edit the values below — no need to touch the components.
//
//  Rich text: wrap words in **double stars** to highlight them in
//  white, or __double underscores__ to highlight them in purple.
// ─────────────────────────────────────────────────────────────

export const profile = {
  // Each entry is rendered on its own line in the hero heading
  nameLines: ['Umesh', 'Sharma'],
  fullName: 'Umesh Sharma',
  initials: 'US',
  year: '2026',
  openToWork: true,

  // Typed out one after another in the hero
  roles: ['AI/ML Engineer', 'Applied AI Developer', 'GenAI & RAG Builder', 'FastAPI Developer'],

  heroIntro: [
    'AI/ML-focused **Data Science undergraduate** at IIT Madras, skilled in **Python, Machine Learning, and LLM-based systems.** Currently building Applied AI systems as an AI/ML Intern at **PW LeapX**.',
    'Experienced in building end-to-end AI applications — __RAG pipelines__, automation workflows, and scalable backend systems — with a strong interest in __Applied AI and GenAI__.',
  ],

  stats: [
    { value: '4', label: 'AI projects built' },
    { value: '1', label: 'AI/ML internship' },
    { value: '2', label: 'Certifications' },
    { value: 'IITM', label: 'B.S. DS & AI' },
  ],

  // Terminal card on the right side of the hero
  terminal: {
    prompt: 'umesh@portfolio ~ applied_ai',
    // Questions are typed out, then answers stream in word by word, on a loop
    chat: [
      {
        q: 'what do you build?',
        a: 'LLM-powered apps, RAG pipelines and AI automations — from prototype to production FastAPI backend.',
      },
      {
        q: 'where do you work?',
        a: 'AI/ML Intern at PW LeapX, Bangalore — integrating AI models into real production workflows.',
      },
      {
        q: 'favourite stack?',
        a: 'Python · FastAPI · Qdrant · Ollama · Whisper · n8n · Docker',
      },
      {
        q: 'open to opportunities?',
        a: 'Yes — Applied AI and GenAI roles. Scroll down and say hi ↓',
      },
    ],
    facts: [
      { k: 'specialisation', v: 'Applied AI · LLMs · RAG' },
      { k: 'currently', v: 'AI/ML Intern @ PW LeapX' },
      { k: 'education', v: 'B.S. Data Science & AI — IIT Madras' },
    ],
    tags: ['Python', 'FastAPI', 'RAG', 'LLMs', 'Qdrant', 'Docker'],
  },
}

export const links = {
  email: 'sharmaumesh8383@gmail.com',
  phone: '', // leave empty to hide the phone row on the contact section
  github: 'https://github.com/UmeshGit125',
  linkedin: 'https://www.linkedin.com/in/umesh-sharma--/',
  // File in the /public folder — replace it there when your resume changes
  resume: '/Umesh_Sharma_Resume.pdf',
}

// Scrolling tech strip under the hero. `icon` is a Simple Icons slug
// (https://simpleicons.org) — leave it empty to show the name only.
export const stack = [
  { name: 'Python', icon: 'python' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Qdrant', icon: 'qdrant' },
  { name: 'Ollama', icon: 'ollama' },
  { name: 'Whisper', icon: '' },
  { name: 'Azure OpenAI', icon: '' },
  { name: 'Scikit-learn', icon: 'scikitlearn' },
  { name: 'Pandas', icon: 'pandas' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'Streamlit', icon: 'streamlit' },
  { name: 'n8n', icon: 'n8n' },
  { name: 'Docker', icon: 'docker' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Google Cloud', icon: 'googlecloud' },
  { name: 'AWS S3', icon: '' },
  { name: 'Git', icon: 'git' },
]

export const about = {
  // Put your photo in /public (e.g. /umesh.jpg) and point this at it
  photo: '/profile-placeholder.svg',
  photoCaption: 'umesh.jpg — Bangalore, IN',
  heading: ['Turning LLMs', 'into working products'],
  paragraphs: [
    "I'm **Umesh Sharma**, a Data Science & AI undergraduate at the Indian Institute of Technology Madras, also pursuing a UG in Computer Science at PW Institute of Innovation. I'm based in Bangalore, India.",
    "As an **AI/ML Intern at PW LeapX**, I develop LLM-powered applications and end-to-end ML pipelines, and build scalable backend services with FastAPI — integrating AI models into real production workflows.",
    "Outside work I build things like voice companions with RAG, LLM-based call auditing, and agentic automation with n8n. I'm most interested in __Applied AI, GenAI, and real-world problem solving__.",
  ],
  facts: [
    { label: 'Degree', value: 'B.S. (Hons) Data\nScience & AI' },
    { label: 'University', value: 'IIT Madras' },
    { label: 'Location', value: 'Bangalore, India' },
    { label: 'Contact', value: 'sharmaumesh8383\n@gmail.com' },
  ],
  coreSkills: [
    'Retrieval-Augmented Generation (RAG)',
    'LLM Integration',
    'Prompt Engineering',
    'Supervised & Unsupervised Learning',
    'NLP',
    'Backend APIs',
    'Workflow Automation',
  ],
  secondaryTitle: 'Tools & Stack',
  secondarySkills: [
    'FastAPI',
    'Streamlit',
    'n8n',
    'Docker',
    'Qdrant',
    'Ollama',
    'Whisper',
    'PostgreSQL',
    'GCP',
    'AWS S3',
  ],
  // level is 0–100 and drives the animated bar width.
  // These are estimates based on the resume — adjust them to your own judgement.
  skillGroups: [
    {
      category: 'Programming',
      skills: [
        { name: 'Python', level: 88 },
        { name: 'SQL', level: 75 },
        { name: 'C (basic)', level: 40 },
      ],
    },
    {
      category: 'AI / ML & GenAI',
      skills: [
        { name: 'RAG & LLM Integration', level: 85 },
        { name: 'Prompt Engineering', level: 82 },
        { name: 'Machine Learning (Regression, Classification)', level: 78 },
        { name: 'NLP (NLTK, embeddings)', level: 72 },
      ],
    },
    {
      category: 'Libraries & Frameworks',
      skills: [
        { name: 'NumPy / Pandas', level: 82 },
        { name: 'Scikit-learn', level: 76 },
        { name: 'FastAPI', level: 80 },
        { name: 'Streamlit', level: 72 },
      ],
    },
    {
      category: 'Tools, Cloud & Databases',
      skills: [
        { name: 'n8n', level: 80 },
        { name: 'Git', level: 78 },
        { name: 'PostgreSQL', level: 72 },
        { name: 'Docker', level: 68 },
        { name: 'GCP / AWS S3', level: 60 },
      ],
    },
  ],
}

export const education = {
  sectionLabel: 'Experience & Education',
  heading: ['Experience &', 'education'],
  intro:
    'Building production AI systems at work while studying Data Science & AI at IIT Madras and Computer Science at PW Institute of Innovation.',
  listTitle: 'Focus Areas',
  list: [
    'Applied AI',
    'LLM-powered applications',
    'RAG pipelines',
    'Natural Language Processing',
    'Automation workflows',
    'Scalable backend systems',
  ],
  // Timeline entries, newest first. `details` and `tags` can be empty.
  timeline: [
    {
      title: 'AI/ML Intern',
      org: 'PW LeapX',
      location: 'Bangalore, India',
      period: 'Dec 2025 — Present',
      badge: 'Current',
      details: [
        'Developing Applied AI systems including LLM-powered applications and end-to-end ML pipelines.',
        'Building scalable backend services using FastAPI with modular architecture, REST APIs, and authentication.',
        'Working on real-world NLP and automation use cases, integrating AI models into production workflows.',
        'Collaborating to design, test, and optimize production-ready AI solutions.',
      ],
      tags: ['LLMs', 'FastAPI', 'NLP', 'ML Pipelines', 'REST APIs'],
    },
    {
      title: 'B.S. (Honours) in Data Science & Artificial Intelligence',
      org: 'Indian Institute of Technology Madras',
      location: '',
      period: '2024 — 2028',
      badge: '',
      details: [],
      tags: [],
    },
    {
      title: 'UG in Computer Science',
      org: 'PW Institute of Innovation',
      location: '',
      period: '2023 — 2027',
      badge: '',
      details: [],
      tags: [],
    },
  ],
  // `year` and `desc` are optional — leave as '' to hide them
  certifications: [
    {
      title: 'Machine Learning Bootcamp',
      issuer: 'Udemy',
      year: '',
      accent: true,
      desc: '',
      tags: ['Machine Learning'],
    },
    {
      title: 'SQL Certification',
      issuer: 'Simplilearn',
      year: '',
      accent: false,
      desc: '',
      tags: ['SQL'],
    },
  ],
}

// Pipeline step types — each gets its own color in the project diagrams
export type FlowKind = 'io' | 'ai' | 'data' | 'logic'
type FlowStep = { label: string; kind: FlowKind }

type Project = {
  title: string
  category: string
  year: string
  accent: boolean
  link: string
  // Optional screenshot in /public (e.g. '/souli.png'); replaces the pipeline diagram
  image?: string
  description: string
  tags: string[]
  flow: FlowStep[]
  bullets: string[]
}

export const projects: { heading: string[]; items: Project[] } = {
  heading: ['AI systems', 'built end to end'],
  // `year` and `link` are optional — leave as '' to hide them
  items: [
    {
      title: 'Souli — AI-Powered Inner Wellness Voice Companion',
      category: 'GenAI · Voice',
      year: '',
      accent: true,
      link: 'https://github.com/UmeshGit125',
      description:
        'An emotionally aware voice companion that listens, understands how the user feels, and responds with guidance grounded in counseling data — using RAG, embeddings, and real-time speech.',
      tags: ['Python', 'Qdrant', 'Ollama', 'Whisper', 'sentence-transformers', 'RAG'],
      flow: [
        { label: 'Voice input', kind: 'io' },
        { label: 'Whisper STT', kind: 'ai' },
        { label: 'Emotion embeddings', kind: 'ai' },
        { label: 'State machine', kind: 'logic' },
        { label: 'Qdrant retrieval', kind: 'data' },
        { label: 'LLM · Ollama', kind: 'ai' },
        { label: 'Empathetic reply', kind: 'io' },
      ],
      bullets: [
        'Built an emotionally aware conversational AI system using a multi-phase state machine for structured dialogue flow.',
        'Designed a Retrieval-Augmented Generation (RAG) pipeline using Qdrant and sentence-transformers for semantic retrieval from counseling data.',
        'Implemented embedding-based classification to map user inputs into predefined emotional states (energy nodes).',
        'Developed a real-time speech understanding pipeline using Whisper for transcription and LLM-based response generation.',
      ],
    },
    {
      title: 'CallAudit — AI-Based Call Quality Analysis System',
      category: 'LLM · NLP',
      year: '',
      accent: false,
      link: 'https://github.com/UmeshGit125',
      description:
        'An LLM-powered system that audits transcribed calls automatically and produces structured quality evaluations, replacing manual call review.',
      tags: ['Python', 'FastAPI', 'Azure OpenAI', 'PostgreSQL', 'NLP'],
      flow: [
        { label: 'Call transcript', kind: 'io' },
        { label: 'FastAPI', kind: 'logic' },
        { label: 'NLP preprocessing', kind: 'logic' },
        { label: 'Azure OpenAI', kind: 'ai' },
        { label: 'Role-based scoring', kind: 'logic' },
        { label: 'PostgreSQL', kind: 'data' },
        { label: 'Quality report', kind: 'io' },
      ],
      bullets: [
        'Built an LLM-powered system for automated call auditing and quality evaluation from transcribed conversations.',
        'Integrated Azure OpenAI to analyze call transcripts and generate structured quality insights.',
        'Designed pipelines for processing and analyzing conversational data using NLP techniques.',
        'Implemented role-based analysis logic to support different evaluation perspectives.',
      ],
    },
    {
      title: 'AI-Powered Email Assistant Workflow',
      category: 'Automation',
      year: '',
      accent: false,
      link: 'https://github.com/UmeshGit125',
      description:
        'An automated email workflow that reads incoming mail, understands who it is from and what it is about, and drafts a personalized reply.',
      tags: ['n8n', 'OpenAI', 'GPT-4.1-mini', 'LLMs'],
      flow: [
        { label: 'Incoming email', kind: 'io' },
        { label: 'n8n trigger', kind: 'logic' },
        { label: 'GPT-4.1-mini classify', kind: 'ai' },
        { label: 'Extract sender & intent', kind: 'ai' },
        { label: 'Conditional routing', kind: 'logic' },
        { label: 'Personalized reply', kind: 'io' },
      ],
      bullets: [
        'Developed an AI-driven email processing system for automated classification and response generation.',
        'Used LLMs to extract sender information and perform semantic categorization of email content.',
        'Implemented conditional logic for personalized response generation based on extracted context.',
      ],
    },
    {
      title: 'AI Personal Assistant using LLM Agents',
      category: 'LLM Agents',
      year: '',
      accent: false,
      link: 'https://github.com/UmeshGit125',
      description:
        'An agentic personal assistant that turns natural-language requests into multi-step actions through structured tool-calling.',
      tags: ['n8n', 'Groq', 'LLaMA 4', 'Tool Calling', 'Prompt Engineering'],
      flow: [
        { label: 'User request', kind: 'io' },
        { label: 'LLaMA 4 · Groq', kind: 'ai' },
        { label: 'Intent parsing', kind: 'ai' },
        { label: 'Tool calling', kind: 'logic' },
        { label: 'Deterministic executor', kind: 'logic' },
        { label: 'Task completed', kind: 'io' },
      ],
      bullets: [
        'Built an LLM-based personal assistant capable of automating multi-step tasks using structured tool-calling.',
        'Designed prompt engineering strategies for reliable task execution and intent handling.',
        'Implemented deterministic execution logic to reduce ambiguity and improve automation accuracy.',
      ],
    },
  ],
}

// Set `show: true` and add posts to bring back the Writing section
export const blog = {
  show: false,
  heading: ['Notes on', 'applied AI'],
  allPostsUrl: '#',
  posts: [] as {
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    url: string
    tags: string[]
  }[],
}

export const contact = {
  heading: ["Let's connect", 'and build'],
  intro:
    "I'm interested in Applied AI, GenAI, and ML engineering opportunities. If you're building something with LLMs or just want to talk AI, I'd love to hear from you.",
  availability:
    'Currently an AI/ML Intern at PW LeapX, Bangalore. Open to Applied AI and GenAI opportunities and collaborations.',
  // Optional: paste a Formspree endpoint (https://formspree.io/f/xxxx) to receive
  // form messages by email. Left empty, the form opens the visitor's mail app.
  formEndpoint: '',
}
