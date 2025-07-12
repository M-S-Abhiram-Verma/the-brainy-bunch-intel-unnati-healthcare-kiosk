# Healthcare Kiosk - Face Recognition Module

This is a **prototype module** for a smart healthcare kiosk that enables **face recognition authentication** for patients.

### 📌 What It Does
- 📸 **Register**: Patients can register by uploading their face image.
- 🔐 **Login**: Patients can log in later by scanning their face. The system compares the new scan with the stored face encodings.
- 💾 **Storage**: Stores face encodings locally using `pickle` (for prototype testing). Can be extended to store securely in a real database.

### ⚙️ Tech Stack
- Python
- `face_recognition` (built on dlib)
- OpenCV
- Google Colab friendly!
