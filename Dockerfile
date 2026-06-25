# syntax=docker/dockerfile:1

# ---- Stage 1: build the React/Vite frontend ----
FROM node:20-slim AS frontend
WORKDIR /build

# Install deps first for better layer caching.
COPY package.json package-lock.json ./
RUN npm ci || npm install

# Build. .env.production sets VITE_API_URL="" so the SPA calls /api on its
# own origin (Flask serves both the app and the API from one URL).
COPY . .
ENV VITE_API_URL=""
RUN npm run build

# ---- Stage 2: Python runtime (Flask + gunicorn) ----
FROM python:3.11-slim

# Hugging Face Spaces run containers as UID 1000. Create that user and set
# its workdir BEFORE copying so files are owned correctly (per HF docs).
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PORT=7860
WORKDIR $HOME/app

# Python dependencies.
COPY --chown=user requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Backend source (app.py + services/). .dockerignore keeps node_modules,
# the .mp4, .venv, etc. out of the build context.
COPY --chown=user . ./

# Compiled frontend from stage 1 -> dist/, which Flask serves as static files.
COPY --chown=user --from=frontend /build/dist ./dist

EXPOSE 7860

# 2 workers, long timeout because AI calls (Groq) can take 20-40s.
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "120", "app:app"]
