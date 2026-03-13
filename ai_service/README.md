# Incredible Karnataka — AI Service (Phase 6)

Run locally:

```bash
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

Endpoints:
- `GET /health`
- `POST /ai/recommendations`

The recommendation endpoint is a placeholder for hybrid collaborative + content-based filtering.
