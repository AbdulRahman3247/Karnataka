from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import numpy as np

app = FastAPI(title="Incredible Karnataka AI Service")

# Allow local dev clients (Expo/web) to call the AI service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    user_id: str
    lat: float
    lng: float
    saved_place_ids: List[str] = []
    ratings: List[float] = []
    categories: List[str] = []

class RecommendationResponse(BaseModel):
    recommended_place_ids: List[str]

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment_score: float
    label: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ai/recommendations", response_model=RecommendationResponse)
def recommend(req: RecommendationRequest):
    # Placeholder hybrid recommendation logic
    candidate_ids = ["p1", "p2", "p3", "p4", "p5", "p6"]
    scores = np.random.rand(len(candidate_ids))
    ranked = [x for _, x in sorted(zip(scores, candidate_ids), reverse=True)]
    return {"recommended_place_ids": ranked[:5]}

@app.post("/ai/sentiment", response_model=SentimentResponse)
def sentiment(req: SentimentRequest):
    # Placeholder sentiment scoring
    score = float(np.random.random())
    if score > 0.66:
        label = "Positive"
    elif score > 0.33:
        label = "Neutral"
    else:
        label = "Negative"
    return {"sentiment_score": score, "label": label}
