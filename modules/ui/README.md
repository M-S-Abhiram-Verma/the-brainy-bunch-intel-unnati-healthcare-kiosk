# Healthcare Kiosk - UI Module

This is the **User Interface (UI)** module for the **Brainy Bunch Intel Unnati Healthcare Kiosk** project. It provides a clean and responsive frontend for users to interact with the kiosk services such as patient registration, report uploads, video-based awareness content, and more.

## 📁 Folder Structure

```
modules/ui/
├── public/
│   └── videos/
│       └── <uploaded awareness and demo videos>
├── src/
│   └── components/
│   └── pages/
│   └── ...
├── package.json
├── vite.config.ts
└── README.md
```

## 🛠️ Tech Stack

* **React** (with Vite)
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Node.js** (for development server)

## 🚀 How to Run Locally

1. Make sure you have [Node.js and npm](https://nodejs.org/en/download) installed.

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 🎥 Video Content

* Awareness and health education videos can be placed inside:

```
modules/ui/public/videos/
```

These can be accessed and rendered from within the UI components as needed.

## 📦 Build for Production

```bash
npm run build
```

The production-ready build will be generated in the `dist/` folder.

## 📑 Notes

* This module integrates with other services like **Face Detection** and **Federated Learning** modules.
* Deployment can be done through **Lovable.dev** or any preferred frontend hosting platform.

