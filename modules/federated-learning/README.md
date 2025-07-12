# 🏥 Federated Healthcare Kiosk

A real-time federated learning system that connects patient data entry with decentralized AI model training and real-time dashboard monitoring.

---

## 🚀 Overview

This project simulates a healthcare kiosk environment where multiple decentralized clients (kiosks) train on local health data using Federated Learning (FL) and sync model updates with a central server. The system:

* Captures patient vitals
* Predicts medications using ML
* Monitors kiosk health and federated metrics
* Detects critical patients and issues alerts
* Stores and visualizes data via Supabase + Streamlit

---

## 📁 Project Structure

```
federated-kiosk-final/
├── Home.py                     # Clean, interactive landing page
├── streamlit_app.py             # (Deprecated) legacy entrypoint
├── client.py                    # Flower client for federated learning
├── server.py                    # Flower server to coordinate FL
├── med_model.pkl                # Trained medication prediction model
├── med_labelizer.pkl            # Label encoder for medication classes
├── synthetic_vitals_100k.csv    # Synthetic dataset for training
├── train_med_model.py           # Script to train medication model
├── upload_to_supabase.py        # Upload synthetic data to Supabase
├── test_insert.py               # Insert one training log into Supabase
├── test_insert_user_data.py     # Test vitals insertion
├── test_insert_training_logs.py # Test training log insertion
├── requirements.txt             # Python dependencies
├── pages/
│   ├── 1_Enter_Vitals.py        # Vitals entry + PDF + prediction + alerts
│   └── 2_Training_Logs.py       # Federated learning dashboard
└── venv/                        # Python virtual environment
```

---

## ⚙️ Features

### Vitals Entry (`pages/1_Enter_Vitals.py`)

* Collects vitals: height, weight, BP, oxygen, fat %, temperature, health label
* Predicts medications using `med_model.pkl`
* Detects critical conditions with real-time alerts
* Calculates and displays BMI category
* Saves data into Supabase `user_data` table
* Generates PDF reports

### Training Logs (`pages/2_Training_Logs.py`)

* Visualizes accuracy, loss, validation trends
* Kiosk-wise performance overview
* Health indicators (green/yellow/red)
* Data fetched from `training_logs` table

### ML Model (`train_med_model.py`)

* Trains a medication recommender model on `synthetic_vitals_100k.csv`
* Outputs:

  * `med_model.pkl` : scikit-learn classifier
  * `med_labelizer.pkl` : LabelEncoder

### Federated Learning

* Uses Flower framework for federated server (`server.py`) and clients (`client.py`)
* Clients train local CNN models on partitioned MNIST
* Logs metrics to Supabase after each round

### Supabase Integration

* PostgreSQL tables:

  * `user_data` : vitals, predictions, alerts
  * `training_logs` : FL metrics
* Uses SQLAlchemy or Supabase Python client

---

## 🛠️ Setup Instructions

1. **Clone and Setup**

```bash
git clone https://github.com/shodan2004/federated-kiosk-final.git
cd federated-kiosk-final
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. **Train Medication Model**

```bash
python train_med_model.py
```

3. **Run Streamlit App**

```bash
streamlit run Home.py
```

4. **Start Federated Learning (Terminal 1 = server, Terminal 2+ = clients)**

```bash
python server.py
python client.py --client_id 1
python client.py --client_id 2
```

---

## 🧪 Testing Tools

| Script                         | Purpose                                       |
| :----------------------------- | :-------------------------------------------- |
| `test_insert.py`               | Inserts one FL log to `training_logs`         |
| `upload_to_supabase.py`        | Uploads synthetic vitals to `user_data`       |
| `test_insert_user_data.py`     | Tests vitals insertion into Supabase          |
| `test_insert_training_logs.py` | Tests FL training log insertion into Supabase |

---

## 📊 Supabase Schema

### `user_data` Table

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

### `training_logs` Table

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

```bash
pip install -r requirements.txt
```

Includes:

* streamlit
* pandas
* sqlalchemy
* supabase
* joblib
* flower
* scikit-learn
* fpdf
* psycopg2-binary

---

## 🔮 Future Enhancements

* Add login system with Supabase Auth
* Deploy Streamlit app on HTTPS
* Model versioning for FL clients
* Integrate WebSocket-based real-time updates
* Dashboard filtering for each kiosk
* Patient trends analytics

---

## 👥 Credits
This Federated Learning system was originally developed by Shodhan Vemulapalli.

* GitHub: [@shodan2004](https://github.com/shodan2004)
* Streamlit App: [Federated Kiosk](https://federated-kiosk-final.streamlit.app/)

It has been integrated and extended as part of the Brainy Bunch Intel Unnati Healthcare Kiosk project for the Intel Unnati Hackathon initiative.
