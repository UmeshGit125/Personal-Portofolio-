// Deep-dive notes on each portfolio project, written from reading the actual
// GitHub repositories. Only the notes relevant to the visitor's question are
// sent to the model (see pickKnowledge in chat.ts), keeping requests small.
//
// Keep these factual: describe what the code does, not more.

export type ProjectNote = {
  project: string
  keywords: string[]
  notes: string
}

export const projectKnowledge: ProjectNote[] = [
  {
    project: 'Souli — AI-Powered Inner Wellness Voice Companion',
    keywords: ['souli', 'sauli', 'wellness', 'voice companion', 'energy node', 'counsel', 'qdrant', 'ollama', 'whisper', 'emotional', 'emotion', 'livekit', 'state machine'],
    notes: `
Repos: github.com/UmeshGit125/Sauli_streamlit- (main system) and github.com/UmeshGit125/Souli_RAG (an earlier LangChain prototype).

WHAT IT IS: A culturally aware, counselor-style wellness companion (aimed mainly at Indian women). It figures out which of 5 "energy nodes" a user is in — blocked, depleted, scattered, out-of-control, or normal — retrieves matching teachings from a counselor's content, and replies warmly using a local LLM. When the user wants help, it offers practices for that node. Privacy-first: core inference runs locally (Ollama, sentence-transformers, Qdrant).

TWO HALVES:
1) Offline data pipeline (souli_pipeline/youtube, souli_pipeline/energy):
- Downloads a counselor's YouTube captions (English/Hindi) with yt-dlp; if captions are missing, transcribes the audio with faster-whisper (medium model, VAD filter).
- Cleans and chunks transcripts (≤55s / 220 words, split on pauses >1.3s, 20-word overlap, filler-word removal).
- Rule-based classification of chunks into problem / teaching / noise, plus meaning and junk scoring to filter low-quality text.
- Tags each kept chunk with an energy node using a small LLM (qwen2.5:1.5b via Ollama, JSON mode, with a keyword fallback).
- Normalizes an Excel "Inner Energy Framework" with fuzzy matching (rapidfuzz) and quality gates into a "gold" dataset.
- Embeds chunks with sentence-transformers all-MiniLM-L6-v2 (384-dim, cosine) and stores them in a Qdrant collection with node/source/timestamp metadata.

2) Conversation engine (souli_pipeline/conversation/engine.py):
- A 5-phase state machine: intake → deepening → intent check → venting OR solution.
- Diagnosis: the user's accumulated text is compared by embedding similarity to the framework's problem statements (nearest match above a 0.3 threshold), with a keyword fallback; re-diagnosed each turn.
- Short answers trigger node-specific follow-up questions; a regex intent classifier decides whether the user wants to vent or wants solutions.
- RAG: Qdrant search FILTERED BY THE DIAGNOSED NODE (top 3, score ≥0.25), so retrieved teachings match the user's emotional state; injected into the prompt for llama3.1 (8B) via Ollama, with streaming.
- Safety-focused system prompt (no diagnosis, no medical advice) and hardcoded per-node fallback replies if the LLM is down.

VOICE: speech-to-text with faster-whisper (per utterance, after end-of-speech detection) or Deepgram; text-to-speech with Edge TTS (Indian English voice) or Piper. A LiveKit real-time voice agent exists as a work-in-progress.

INTERFACES: Streamlit app (health status for Ollama/Qdrant, streaming replies, debug view of node/phase/intent) and a Typer CLI ("souli run / ingest / chat / voice / health").

DEPLOYMENT: Docker + docker-compose for GCP (Ollama with NVIDIA GPU, Qdrant with persistent volume, the app, optional self-hosted LiveKit); shell scripts to create a GCE VM with a T4 GPU, install CUDA/Docker, and deploy; YAML config with env-var overrides; GitHub Actions CI running ruff lint/format.

ENGINEERING HIGHLIGHTS: graceful degradation everywhere (captions→Whisper, LLM→keyword rules, embeddings→keywords); small model for offline tagging vs larger model for chat; node-filtered retrieval; Pydantic-validated config.

THE PROTOTYPE (Souli_RAG): LangChain + Chroma + HuggingFace MiniLM embeddings + Groq llama-3.1-8b-instant, with a LiveKit voice agent using Silero VAD and Deepgram STT.`,
  },
  {
    project: 'CallAudit — AI-Based Call Quality Analysis System',
    keywords: ['callaudit', 'call audit', 'call-audit', 'call quality', 'audit', 'auditor', 'transcript', 'azure', 'elevenlabs', 'qc', 'quality check', 'counsellor', 'compliance'],
    notes: `
Repo: github.com/UmeshGit125/backend ("CallAudit Backend"). This is a team codebase (built in a professional context); if asked about Umesh's exact individual contribution, say it was a team project and suggest asking Umesh directly.

WHAT IT IS: A quality-control backend for an EdTech sales/counselling call centre that replaces manual call listening. Calls are transcribed, scored against a 100-point sales rubric, checked for compliance violations, flagged (NORMAL / CONCERN / FATAL), and given AI-written coaching feedback. Human auditors then review and approve, and managers see team analytics.

PIPELINE:
1) Ingestion: bulk CSV upload (stored in AWS S3, processed in throttled batches of 10 with a fresh DB session per row) or single audio upload; processing runs in a background thread.
2) Audio download with retries.
3) Transcription with ElevenLabs Scribe (speech-to-text with speaker diarization); speakers are labelled Advisor vs Learner using a keyword-scoring heuristic (falls back to the most talkative speaker).
4) Scoring — a deliberate HYBRID design:
   - Deterministic, auditable rule-based analyzers score 7 sections totalling 100 points: Intro (10), Rapport (15), Need Generation (15), Product/Pricing (20), Closing & Objection handling (20), Engagement (10, using talk-ratio and open-question checks), Diagnostic (10).
   - A compliance checker detects FATAL issues (e.g. job-guarantee promises, fake internships, false claims, abusive language) and concerning ones, with negation handling, working across English, Hinglish and Hindi (Devanagari).
   - Course detection with weighted pattern matching.
5) LLM step: Azure OpenAI (GPT-4o deployment) turns each section's computed score, strengths and weaknesses into professional Hinglish coaching feedback ("Strengths, Areas of Improvement, Key Insights, Auditor's Coaching"). All 7 sections are generated in parallel (asyncio), with trimmed payloads, capped tokens and skipped calls for empty sections to control cost.
6) Storage in PostgreSQL: transcript, coaching summary, anomalies, scores, flag.

WHY HYBRID: rules make scores consistent, explainable and cheap; the LLM is used where it shines — writing natural coaching language.

API & ROLES: FastAPI with JWT auth in httpOnly cookies and bcrypt passwords. Role hierarchy Manager → Auditor → Counsellor, with role-specific endpoints: managers (dashboard, flagged audits, user management), auditors (call lists with filters, approve/unflag audits, CSV upload, presigned S3 audio links), counsellors (upload audio). Analysis also distinguishes speaker roles (Advisor vs Learner).

DATA MODEL: managers, auditors, counsellors, calls, call_analysis, audit_reports (SQLAlchemy 2 + Alembic migrations).

STACK & DEPLOYMENT: Python 3.11, FastAPI, SQLAlchemy, PostgreSQL 16, Alembic, Pydantic Settings, Azure OpenAI SDK, ElevenLabs, AWS S3 (boto3), Docker + docker-compose, Gunicorn with Uvicorn workers, nginx config suggesting AWS Elastic Beanstalk, Sphinx docs.

NOTE: transcripts are not scored by the LLM directly — scoring is rule-based and the LLM writes the feedback. Describe it that way.`,
  },
  {
    project: 'AI Personal Assistant using LLM Agents',
    keywords: ['personal assistant', 'assistant', 'agent', 'agents', 'tool calling', 'tool-calling', 'groq', 'llama 4', 'llama-4', 'n8n', 'calendar', 'gmail', 'google', 'tasks', 'streamlit'],
    notes: `
Repo: github.com/UmeshGit125/Personal-Assistant (the Streamlit front end; the agent itself runs as an n8n workflow that is not included in the repo).

WHAT IT IS: A chat-based personal assistant that takes real actions in Google Workspace — send and read Gmail, create Google Calendar events, add/complete/delete Google Tasks, update notes in Google Docs, and track expenses in Google Sheets (e.g. "Add expense 500 in travel for taxi ride").

ARCHITECTURE:
- Streamlit chat UI (app.py) keeps chat history in session state and sends each message to an n8n webhook (URL from environment config).
- n8n workflow: an AI Agent node powered by Groq's LLaMA 4 Scout (meta-llama/llama-4-scout-17b) at temperature 0, connected via Google OAuth2 to Gmail, Calendar, Tasks, Docs and Sheets tools. All actions happen through structured tool calls inside n8n; temperature 0 keeps behaviour deterministic.
- The UI handles both list and object response shapes from n8n and has separate friendly error handling for timeouts, connection errors, bad status codes and invalid JSON.
- Dev container for one-click setup (Python 3.11, Streamlit on port 8501); managed with uv.

DETAILS: the specific prompts and tool schemas live in the n8n workflow, which isn't public in the repo — if asked for those internals, say they aren't in the public repo and suggest asking Umesh.`,
  },
  {
    project: 'AI-Powered Email Assistant Workflow',
    keywords: ['email assistant', 'email workflow', 'email', 'gpt-4.1', 'gpt 4.1', 'inbox', 'mail'],
    notes: `
No public code for this project (it is an n8n workflow). Known facts only: built with n8n and OpenAI GPT-4.1-mini; classifies incoming emails, uses the LLM to extract sender information and semantically categorize content, and uses conditional logic to generate personalized replies based on the extracted context. Do NOT invent example categories, node names, prompts or reply templates — none are public. For deeper implementation details, suggest asking Umesh directly.`,
  },
]
