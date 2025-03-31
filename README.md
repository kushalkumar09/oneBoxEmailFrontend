# OneBox Email Aggregator - Frontend

## 📌 Project Overview
OneBox Email Aggregator is a feature-rich email client that provides real-time IMAP synchronization, Elasticsearch-based search, AI categorization, Slack/webhook integration, and AI-powered suggested replies. This repository contains the frontend built using React and Vite.

## 🚀 Features
- User authentication
- Email listing and categorization
- IMAP real-time email synchronization
- Advanced search with Elasticsearch
- AI-powered email categorization
- Suggested AI replies
- Responsive UI using TailwindCSS and ShadCN

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/kushalkumar09/oneBoxEmailFrontend.git
cd oneBoxEmailFrontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```
The application will be available at: [http://localhost:5173](http://localhost:5173)

### 5️⃣ Build for Production
```sh
npm run build
```

## 📂 Project Structure
```
📦 FrontendOneBox
├── 📂 public         # Static assets
├── 📂 src            # Source code
│   ├── 📂 authcomponent   # Authentication components
│   ├── 📂 components      # UI components
│   ├── 📂 constants       # API endpoints
│   ├── 📂 context        # Context API setup
│   ├── 📂 hooks          # Custom hooks
│   ├── 📂 pages          # Application pages
│   ├── 📂 services       # API service functions
│   ├── 📂 utils          # Utility functions
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## 🤝 Contributing
Feel free to fork this repository, create a new branch, and submit a pull request!

## 🛠️ Technologies Used
- React.js
- Vite
- TailwindCSS
- ShadCN/UI
- React Query
- Zustand (State Management)

## 📜 License
This project is licensed under the MIT License.
