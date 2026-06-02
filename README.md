# Langlearn

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat&logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python_3-3776AB?style=flat&logo=python&logoColor=fff)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-000?style=flat&logo=flask&logoColor=fff)](https://flask.palletsprojects.com)
[![Groq](https://img.shields.io/badge/Groq_LLM-F55036?style=flat)](https://groq.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=fff)](https://vitejs.dev)

**Most translation tools stop at the answer. Langlearn explains why it works and gives you something to practise next.**

Take any text, voice input, or YouTube video — get back a translation plus grammar breakdown, vocabulary, cultural context, and generated exercises. The learning happens alongside the translation, not separately.

---

## What it does

| Feature | Details |
|---|---|
| 📝 **Text translation** | Translation + grammar, vocabulary, literal meaning, pronunciation tips, cultural notes |
| 🎙️ **Voice translation** | Speak → transcribe → translate → learning breakdown, all in one flow |
| 🤖 **AI tutor** | Conversational practice with contextual follow-up suggestions |
| 🏋️ **Practice centre** | AI-generated exercises by language, level, and type (fill-blanks, sentence-builder, vocab match, and more) |
| 📺 **YouTube learning** | Paste a video URL → get captions, summary, vocabulary, grammar patterns, and practice materials |
| 📊 **Progress tracking** | Achievements and history across all learning activities |

Supports **40+ languages** including Spanish, French, German, Japanese, Hindi, Arabic, and more.

---

## How it's built

**Frontend** — React, TypeScript, Vite, Tailwind CSS, Framer Motion. Browser Speech API handles voice input without any third-party dependency.

**Backend** — Python, Flask. All AI calls stay server-side; the browser never touches an API key.

**AI layer** — Groq's inference API with Llama 3.3 70B. Structured JSON prompts enforce a consistent response shape so the UI renders predictably regardless of what the model returns.

**YouTube pipeline** — `youtube_transcript_api` fetches captions, falls back to auto-generated transcripts, and translates when needed. The caption text goes straight into the same AI pipeline used for lessons and exercises.

**Stability** — Local fallback responses keep every major flow demoable when the API key is absent.

---

## Project structure

```
├── app.py                  # Flask entry point and API routes
├── services/               # Translator, chatbot, learning, practice, speech
├── src/
│   ├── pages/              # One file per screen (translation, voice, learn, practice, chatbot…)
│   ├── components/         # Shared UI + practice-specific components
│   ├── types/              # TypeScript models
│   └── utils/              # Speech and language helpers
├── scripts/                # Smoke tests
├── requirements.txt
└── package.json
```

---

## Getting started

**Prerequisites:** Node.js 16+, Python 3.8+, a [Groq API key](https://console.groq.com) (free tier works)

```bash
git clone <repo-url>
cd Langlearn-Language-Translation-and-Learning-Tool

# Backend
python -m venv .venv && .\.venv\Scripts\activate
pip install -r requirements.txt

# Frontend
npm install
```

Create `.env`:

```env
GROQ_API_KEY=your_key_here
VITE_API_URL=http://127.0.0.1:5000
```

```bash
# Two terminals
python app.py
npm run dev:frontend
```

---

## Validation

```bash
npm run lint
npm run build
python -m compileall app.py services
npm run smoke
```
