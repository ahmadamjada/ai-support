
---

## ⚡ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/ai-support-assistant.git
cd ai-support-assistant
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill in your secrets (MongoDB URI, API keys, etc.)
npm start
```

### 3. Admin Dashboard (Frontend) Setup

```bash
cd ../admin-dashboard
npm install
npm start
```

### 4. Dialogflow Agent

- Import the agent in `dialogflow-agent/` into your Dialogflow console.
- Set the webhook URL to your backend `/webhook` endpoint.

---

## 🔑 Environment Variables

See `backend/.env.example` for all required variables:

```env
PORT=5000
MONGODB_URI=your-mongodb-uri-here
JWT_SECRET=your-jwt-secret-here
DIALOGFLOW_PROJECT_ID=your-dialogflow-project-id
GEMINI_API_KEY=your-gemini-api-key
WHATSAPP_TOKEN=your-whatsapp-token
INSTAGRAM_TOKEN=your-instagram-token
FB_PAGE_TOKEN=your-facebook-page-token
```

---

## 📡 API Endpoints

| Method | Endpoint                        | Description                        |
|--------|---------------------------------|------------------------------------|
| GET    | `/api/orders/stats`             | Order stats by month               |
| GET    | `/api/orders/product-distribution` | Product-wise order distribution |
| GET    | `/api/orders/recent`            | Fetch recent orders                |
| POST   | `/api/auth/login`               | Admin login                        |
| ...    | (see routes for more)           |                                    |

---

## 📝 Future Improvements

- Add more analytics (per channel, per intent)
- Export reports (CSV/PDF)
- Integrate with ticketing systems (e.g., Zendesk)
- More social channels

---

## 👨‍💻 Author

Built with 💙 by Muhammad Ahmad  
Saylani AI Hackathon Project

---

## 🧑‍🏫 For Reviewers

- **Backend:** See `backend/` for Express server, MongoDB models, and API routes.
- **Frontend:** See `admin-dashboard/` for React dashboard.
- **Dialogflow Agent:** See `dialogflow-agent/` for sample agent and webhook setup.
- **Environment:** Copy `.env.example` to `.env` and fill in your own credentials.
- **Run backend and frontend separately.**  
- **All code is documented and modular for easy review.**

---
