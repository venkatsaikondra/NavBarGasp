# ml-service/app.py
from fastapi import FastAPI
import numpy as np

app = FastAPI()

@app.post("/predict")
def predict(event: dict):
    payload = event.get("payload", {})

    # Example feature vector
    features = np.array([
        payload.get("cpu_load", 0),
        payload.get("response_time", 0),
    ])

    # Dummy anomaly score (replace with real model)
    anomaly_score = float(features.sum())

    return {
        "anomaly_score": anomaly_score,
        "is_anomaly": anomaly_score > 5
    }
