from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import os
import io

app = FastAPI(title="FactoryShield Predictive Maintenance API")

# -----------------------------
# CORS (React frontend)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Models
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

stage1_model = joblib.load(os.path.join(BASE_DIR, "models/stage1_binary_model.pkl"))
stage2_model = joblib.load(os.path.join(BASE_DIR, "models/stage2_multiclass_model.pkl"))
label_encoder = joblib.load(os.path.join(BASE_DIR, "models/stage2_label_encoder.pkl"))

# ============================================================
# SINGLE MACHINE PREDICTION
# ============================================================

class MachineInput(BaseModel):
    Air_temperature_K: float
    Process_temperature_K: float
    Rotational_speed_rpm: float
    Torque_Nm: float
    Tool_wear_min: float
    Type: str
    Temp_Diff: float
    Torque_Speed: float


@app.post("/predict")
def predict(input_data: MachineInput):

    df_input = pd.DataFrame([{
        "Air temperature [K]": input_data.Air_temperature_K,
        "Process temperature [K]": input_data.Process_temperature_K,
        "Rotational speed [rpm]": input_data.Rotational_speed_rpm,
        "Torque [Nm]": input_data.Torque_Nm,
        "Tool wear [min]": input_data.Tool_wear_min,
        "Type": input_data.Type,
        "Temp_Diff": input_data.Temp_Diff,
        "Torque_Speed": input_data.Torque_Speed,
    }])

    # Stage 1
    stage1_proba = stage1_model.predict_proba(df_input)[:, 1]
    threshold = 0.35
    stage1_pred = (stage1_proba > threshold).astype(int)

    if stage1_pred[0] == 0:
        return {
            "failure_detected": False,
            "failure_type": "No Failure",
            "failure_probability": float(stage1_proba[0]),
        }

    # Stage 2
    stage2_pred_enc = stage2_model.predict(df_input)
    stage2_pred = label_encoder.inverse_transform(stage2_pred_enc)

    return {
        "failure_detected": True,
        "failure_type": stage2_pred[0],
        "failure_probability": float(stage1_proba[0]),
    }


# ============================================================
# BULK CSV PREDICTION (JSON RETURN — NO AUTO DOWNLOAD)
# ============================================================

@app.post("/predict-bulk")
async def predict_bulk(file: UploadFile = File(...)):

    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    results = []

    for _, row in df.iterrows():

        df_input = pd.DataFrame([{
            "Air temperature [K]": row["Air temperature [K]"],
            "Process temperature [K]": row["Process temperature [K]"],
            "Rotational speed [rpm]": row["Rotational speed [rpm]"],
            "Torque [Nm]": row["Torque [Nm]"],
            "Tool wear [min]": row["Tool wear [min]"],
            "Type": row["Type"],
            "Temp_Diff": row["Temp_Diff"],
            "Torque_Speed": row["Torque_Speed"],
        }])

        # Stage 1
        stage1_proba = stage1_model.predict_proba(df_input)[:, 1]
        threshold = 0.35
        stage1_pred = (stage1_proba > threshold).astype(int)

        if stage1_pred[0] == 0:
            results.append({
                **row.to_dict(),
                "failure_detected": False,
                "failure_type": "No Failure",
                "failure_probability": float(stage1_proba[0])
            })
        else:
            stage2_pred_enc = stage2_model.predict(df_input)
            stage2_pred = label_encoder.inverse_transform(stage2_pred_enc)

            results.append({
                **row.to_dict(),
                "failure_detected": True,
                "failure_type": stage2_pred[0],
                "failure_probability": float(stage1_proba[0])
            })

    return {
        "total_records": len(results),
        "results": results
    }
