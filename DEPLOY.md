# Deploying Langlearn to Hugging Face Spaces (free Docker)

This app deploys as **one free container**: Flask serves both the REST API and the
compiled React frontend from a single URL. No second service, no CORS config.

## What was set up for you

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node builds the frontend → Python serves it via gunicorn on port 7860 |
| `.dockerignore` | Keeps `node_modules`, the 46 MB `.mp4`, `.venv`, secrets out of the image |
| `.env.production` | Makes the frontend call `/api/...` on its own origin (same-origin) |
| `README.md` frontmatter | `sdk: docker` + `app_port: 7860` so HF knows how to run it |
| `app.py` | Now serves `dist/` + SPA fallback for React Router routes |

## One-time deploy steps

### 1. Get a Hugging Face write token
- Go to https://huggingface.co/settings/tokens
- Create a token with **Write** role. Copy it.

### 2. Create the Space
- Go to https://huggingface.co/new-space
- **Owner:** your account · **Space name:** `langlearn`
- **SDK:** select **Docker** → **Blank**
- **Hardware:** **CPU basic (free)**
- Visibility: Public (free) or Private
- Click **Create Space**. Your app URL will be:
  `https://<username>-langlearn.hf.space`

### 3. Add your Groq API key as a secret
In the Space → **Settings** → **Variables and secrets** → **New secret**:
- Name: `GROQ_API_KEY`
- Value: your Groq key (from https://console.groq.com)

(The app reads it at runtime via `os.getenv("GROQ_API_KEY")`. Without it, the app
still runs in local-fallback mode.)

### 4. Push the project to the Space

Clone the **empty Space repo** into a separate folder and copy the project in
(this avoids pushing git history / large files):

```bash
# Clone the Space repo (separate from your GitHub clone)
git clone https://huggingface.co/spaces/<username>/langlearn hf-langlearn
cd hf-langlearn

# Copy project files in (Windows PowerShell example):
#   robocopy "D:\Projects\Langlearn-Language-Translation-and-Learning-Tool" . /E /XD node_modules .venv dist temp __pycache__ .git /XF *.mp4 .env
# macOS/Linux:
#   rsync -av --exclude node_modules --exclude .venv --exclude dist \
#         --exclude temp --exclude __pycache__ --exclude '.git' \
#         --exclude '*.mp4' --exclude '.env' \
#         /path/to/Langlearn-Language-Translation-and-Learning-Tool/ .

git add .
git commit -m "Deploy Langlearn to HF Spaces"
git push
# Username: your HF username · Password: paste the WRITE TOKEN (not your password)
```

### 5. Watch it build
- The Space page shows **Building** then **Running** (first build ~3-5 min).
- Open `https://<username>-langlearn.hf.space` — the React app loads and talks to
  the API on the same origin.

## Updating later
Re-copy changed files into the `hf-langlearn` folder, then:
```bash
git add . && git commit -m "Update" && git push
```
The Space rebuilds automatically.

## Local sanity check before deploying (optional)
```bash
npm run build                          # builds dist/
python -m compileall app.py services   # backend syntax
python app.py                          # serves app on http://127.0.0.1:5000
```
</content>
