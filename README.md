# FactoryShield – AI-Powered Predictive Maintenance System

FactoryShield is an end-to-end machine learning system that predicts industrial machine failures using sensor data.
It combines **machine learning models, a FastAPI backend, and a React dashboard** to deliver real-time failure predictions and bulk analysis for factory environments.

The system helps reduce downtime, detect potential failures early, and provide actionable maintenance insights.

---

## 🚀 Features

* Real-time machine failure prediction
* Bulk CSV analysis for multiple machines
* Interactive dashboard UI
* Two-stage machine learning architecture
* Failure probability scoring
* Failure type classification
* CSV download of bulk predictions
* Authentication support (Supabase)
* API-driven architecture

---

## 🧠 Machine Learning Architecture

FactoryShield uses a **two-stage ML pipeline**:

### Stage 1 – Failure Detection

Binary classification model predicting:

* `0 → No Failure`
* `1 → Failure Detected`

Model Used:

* Random Forest / XGBoost

### Stage 2 – Failure Classification

If failure is detected, the second model predicts the failure type:

* Heat Dissipation Failure
* Power Failure
* Overstrain Failure
* Tool Wear Failure
* Random Failure

---

## ⚙️ Feature Engineering

Two additional features were engineered to improve model performance.

**Temperature Difference**

```
Temp_Diff = Process Temperature − Air Temperature
```

Used to detect abnormal thermal conditions.

**Mechanical Stress Indicator**

```
Torque_Speed = Torque × Rotational Speed
```

Captures mechanical load on the machine.

---

## 📊 Handling Class Imbalance

The dataset contains far fewer failure samples than normal samples.

To handle this imbalance, the training pipeline uses **SMOTE (Synthetic Minority Oversampling Technique)** which generates synthetic failure samples during training.

This significantly improves failure detection recall.

---

## 🧪 Model Performance

Binary Failure Detection Model:

| Metric                 | Score |
| ---------------------- | ----- |
| Accuracy               | ~97%  |
| Recall (Failure Class) | ~91%  |
| F1 Score               | ~0.82 |

Multiclass Failure Classification:

| Failure Type     | F1 Score |
| ---------------- | -------- |
| Heat Dissipation | ~0.98    |
| Power Failure    | ~0.97    |
| Overstrain       | ~0.90    |
| Tool Wear        | ~0.95    |
| Random Failure   | ~0.75    |

---

## 🖥️ System Architecture

```
Machine Sensor Data
        │
        ▼
React Dashboard (Frontend)
        │
        ▼
FastAPI Backend API
        │
        ▼
ML Prediction Pipeline
        │
        ├── Stage 1: Failure Detection
        │
        └── Stage 2: Failure Classification
        │
        ▼
Prediction Response
        │
        ▼
Dashboard Visualization / CSV Export
```

---

## 🏗️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Framer Motion
* Lucide Icons

### Backend

* FastAPI
* Python
* Uvicorn
* Pandas
* Joblib

### Machine Learning

* Scikit-learn
* XGBoost
* SMOTE (Imbalanced-Learn)

### Database & Auth

* Supabase
* PostgreSQL

---

## 📂 Project Structure

```
factoryshield
│
├── api
│   └── main.py
│
├── models
│   ├── stage1_binary_model.pkl
│   ├── stage2_multiclass_model.pkl
│   └── stage2_label_encoder.pkl
│
├── data
│   └── dataset.csv
│
├── notebooks
│   └── eda.ipynb
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.tsx
│
└── README.md
```

---

## 📦 Installation

Clone the repository:

```
git clone https://github.com/yourusername/factoryshield.git
cd factoryshield
```

---

## 🔧 Backend Setup

Create virtual environment:

```
python -m venv venv
source venv/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the API:

```
uvicorn api.main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 💻 Frontend Setup

Navigate to frontend directory:

```
npm install
```

Run development server:

```
npm run dev
```

Dashboard runs on:

```
http://localhost:3000
```

---

## 📁 Bulk CSV Prediction

Users can upload a CSV file containing machine sensor data.

Example CSV structure:

```
Air temperature [K],Process temperature [K],Rotational speed [rpm],Torque [Nm],Tool wear [min],Type,Temp_Diff,Torque_Speed
298.1,308.6,1551,42.8,0,L,10.5,66322.8
300.0,310.2,1400,40.0,5,M,10.2,56000
```

After upload, the dashboard will:

* Run predictions
* Display results
* Allow downloading prediction CSV

---

## 🔐 Authentication

Authentication is implemented using Supabase.

Features include:

* Email/password login
* Secure session handling
* Database integration
* Role-based access control (optional)

---

## 📈 Future Improvements

* Real-time IoT sensor streaming
* Model explainability using SHAP
* Failure trend analytics dashboard
* Predictive maintenance scheduling
* Cloud deployment

---

## 👨‍💻 Author

Aditya Chauhan
B.Tech Computer Science and Engineering
Bennett University

---

## 📄 License

This project is open source and available under the MIT License.
