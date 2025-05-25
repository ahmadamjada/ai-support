# 🧠 AI-Powered Customer Support Assistant Dashboard

This project is a full-stack AI-powered customer support assistant designed for multi-channel businesses. It helps businesses automate customer queries, provide intelligent responses, and visualize customer data and order trends through an admin dashboard.

---

## 🚀 Features

- 🤖 **AI Chatbot** powered by Dialogflow & Gemini LLM
- 🌐 **Multi-Channel Support** for WhatsApp, Facebook Messenger, and Instagram
- 📊 **Admin Dashboard** built in React & Chart.js to visualize:
  - Orders over time
  - Product distribution
  - Recent orders
- 📥 **MongoDB Backend** to store order data
- 📤 **REST API** for fetching order statistics and distribution

---

## 🏗️ Tech Stack

| Frontend       | Backend             | Database | AI Services         | Deployment |
|----------------|---------------------|----------|---------------------|------------|
| React.js       | Node.js + Express   | MongoDB  | Dialogflow + Gemini | Render     |
| Chart.js       | Axios               | Mongoose |                     |            |

---

## 📁 Project Structure

root/
│
├── backend/
│ ├── models/
│ │ └── Order.js
│ ├── routes/
│ │ └── admin.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── OrdersChart.js
│ │ │ ├── ProductPieChart.js
│ │ │ └── OrdersTable.js
│ │ └── App.js
│ └── package.json
│
└── README.md




Backend Setup
cd backend
npm install


Environment Variables
Create a .env file:
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/supportDB

Run backend server
npm start

3. Frontend Setup
cd ../frontend
npm install
npm start

 API Endpoints
Method	Endpoint	Description
GET	/api/orders/stats	Order stats by month
GET	/api/orders/product-distribution	Product wise order distribution
GET	/api/orders/recent	Fetch recent orders



 Future Improvements
Add login/auth for admin dashboard

Include response analytics per channel

Export reports (CSV/PDF)

Connect to a ticketing system like Zendesk


👨‍💻 Author
Built with 💙 by Muhammad Ahmad

