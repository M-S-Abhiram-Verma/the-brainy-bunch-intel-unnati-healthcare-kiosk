# 🏥 Federated Healthcare Kiosk

A real-time federated learning system that connects patient data entry with decentralized AI model training and real-time dashboard monitoring.

---

## 🚀 Overview

This project simulates a healthcare kiosk environment where multiple decentralized clients (kiosks) train on local health data using Federated Learning (FL) and sync model updates with a central server. The system:

- Captures patient vitals
- Predicts medications using ML
- Monitors kiosk health and federated metrics
- Detects critical patients and issues alerts
- Stores and visualizes all data via Supabase + Streamlit

---

## 📁 Project Structure

```

federated-kiosk-final/
├── Home.py                      # Clean, interactive landing page
├── streamlit\_app.py             # (Deprecated) legacy entrypoint
├── client.py                    # Flower client for federated learning
├── server.py                    # Flower server to coordinate FL
├── med\_model.pkl                # Trained medication prediction model
├── med\_labelizer.pkl            # Label encoder for medication classes
├── synthetic\_vitals\_100k.csv    # Synthetic dataset for training
├── train\_med\_model.py           # Script to train medication model
├── upload\_to\_supabase.py        # Upload synthetic data to Supabase
├── test\_insert.py               # Insert one training log into Supabase
├── test\_insert\_user\_data.py     # Test vitals insertion
├── test\_insert\_training\_logs.py # Test training logs insertion
├── requirements.txt             # Python dependencies
├── pages/
│   ├── 1\_Enter\_Vitals.py        # Vitals entry + PDF + prediction + alerts
│   └── 2\_Training\_Logs.py       # Federated learning dashboard
└── venv/                        # Python virtual environment

````

---

## ⚙️ Features

### 🧑‍⚕️ Vitals Entry (`pages/1_Enter_Vitals.py`)

- Collects patient vitals: height, weight, BP, oxygen, fat %, temperature, health label.
- Predicts medications using ML (`med_model.pkl`).
- Detects and alerts on critical conditions.
- Calculates and displays BMI category.
- Saves data into Supabase `user_data` table.
- Generates PDF reports with vitals and predictions.

### 📊 Training Logs (`pages/2_Training_Logs.py`)

- Visualizes accuracy, loss, and validation trends over time.
- Displays kiosk-wise performance.
- Health indicators (green/yellow/red) for kiosks.
- Pulls data from the `training_logs` table in Supabase.

### 🧠 ML Model (`train_med_model.py`)

- Trains a medication recommender model on `synthetic_vitals_100k.csv`.
- Outputs:
  - `med_model.pkl` (Scikit-learn classifier)
  - `med_labelizer.pkl` (Label encoder for medications)

### 🌸 Federated Learning (Flower Framework)

- `server.py` and `client.py` for federated learning workflow.
- Clients train local CNN models on partitioned MNIST.
- Logs metrics to Supabase after each round.

### ☁️ Supabase Integration

- Supabase PostgreSQL used for:
  - `user_data`: vitals, predictions, alerts.
  - `training_logs`: FL metrics.
- Uses SQLAlchemy and Supabase Python client.

---

## 🛠️ Setup Instructions

### 1️⃣ Clone and Setup

```bash
git clone https://github.com/shodan2004/federated-kiosk-final.git
cd federated-kiosk-final
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
````

### 2️⃣ Train Medication Model

```bash
python train_med_model.py
```

### 3️⃣ Run Streamlit App

```bash
streamlit run Home.py
```

### 4️⃣ Start Federated Learning (in separate terminals)

* **Terminal 1 (Server)**:

  ```bash
  python server.py
  ```

* **Terminal 2 (Client 1)**:

  ```bash
  python client.py --client_id 1
  ```

* **Terminal 3 (Client 2)**:

  ```bash
  python client.py --client_id 2
  ```

---

## 🧪 Testing Utilities

| Script                         | Purpose                                 |
| :----------------------------- | :-------------------------------------- |
| `test_insert.py`               | Inserts one FL log into `training_logs` |
| `upload_to_supabase.py`        | Uploads synthetic vitals to `user_data` |
| `test_insert_user_data.py`     | Tests vitals Supabase insertion         |
| `test_insert_training_logs.py` | Tests FL training log insertion         |

---

## 🗄️ Supabase Schema

### 📄 Table: `user_data`

| Column             | Type        |
| :----------------- | :---------- |
| name               | text        |
| height             | float       |
| weight             | float       |
| temperature        | float       |
| blood\_pressure    | float       |
| blood\_oxygen      | float       |
| body\_fat\_percent | float       |
| bmi                | float       |
| label              | integer     |
| medications        | text        |
| timestamp          | timestamptz |

### 📄 Table: `training_logs`

| Column        | Type        |
| :------------ | :---------- |
| round         | int         |
| client\_id    | int         |
| loss          | float       |
| val\_loss     | float       |
| accuracy      | float       |
| val\_accuracy | float       |
| kiosk\_id     | text        |
| timestamp     | timestamptz |

---

## 📦 Dependencies

Install all dependencies with:

```bash
pip install -r requirements.txt
```

Includes:

* `streamlit`
* `pandas`
* `sqlalchemy`
* `supabase`
* `joblib`
* `flower`
* `scikit-learn`
* `fpdf`
* `psycopg2-binary`

---

## 📈 Future Enhancements

* Add login functionality with Supabase Auth.
* Deploy Streamlit app over secure HTTPS.
* Add model versioning for FL clients.
* Integrate WebSocket-based real-time updates.
* Create separate dashboards for each kiosk.
* Add analytics and trends on patient vitals and predictions.

---

## 👥 Credits

This Federated Learning system was originally developed by **Shodhan Vemulapalli**.

* GitHub: [@shodan2004](https://github.com/shodan2004)
* Streamlit App: [Federated Kiosk Demo](https://federated-kiosk.streamlit.app)

It has been integrated and extended as part of **The Brainy Bunch Intel Unnati Healthcare Kiosk** project for the Intel Unnati Industrial Training initiative.

