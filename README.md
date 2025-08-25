# PRODIGY_BD_03

# Task 03 - JWT-Based Authentication & Authorization

This project is part of my internship at **Prodigy Infotech**.  
The goal of this task is to **implement authentication and authorization** using **JSON Web Tokens (JWT)** in a Node.js + Express + MongoDB environment.

---

## 📌 Features

- ✅ User **Registration** with hashed passwords (`bcrypt`)  
- ✅ User **Login** with JWT token generation  
- ✅ **Protected routes** (accessible only with valid JWT)  
- ✅ **Role-based access control** (Admin, User, Owner, etc.)  
- ✅ MongoDB integration with Mongoose  
- ✅ Environment variables managed via `.env`  
- ✅ API tested using **Postman**

---

## 📂 Project Structure

├── models
│ └── User.js # User schema with password & role
├── routes
│ ├── authRoutes.js # Register & login
│ └── userRoutes.js # Protected routes
├── middleware
│ ├── auth.js # JWT authentication
├── app.js # Main app entry(#MongoDB connection)
├── package.json # Dependencies
├── .env.example # Sample environment variables
└── Task03.postman_collection.json # Postman collection


---

## ⚙️ Installation & Setup

### 1. Clone the repository
bash
git clone https://github.com/<your-username>/Task-03-JWT-Auth.git
cd Task-03-JWT-Auth

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the root with the following:

PORT=3000
MONGO_URI=mongodb://localhost:27017/task03db
JWT_SECRET=your_jwt_secret_key

4. Start the server
npm start


Server runs on: http://localhost:3000

🚀 API Endpoints
🔹 Auth Routes

POST /api/auth/register → Register a new user

{ "name": "Aastha", "email": "aastha@example.com", "password": "123456" }


POST /api/auth/login → Login & get JWT token

{ "email": "aastha@example.com", "password": "123456" }

🔹 Protected Routes

GET /api/users/profile → Accessible only with valid JWT

Add header: Authorization: Bearer <token>

🔹 Role-Based Routes

Example:

GET /api/users/admin → Only accessible by Admin role

📬 Postman Collection

A ready-to-use Postman collection is included:
➡️ Task03.postman_collection.json

You can directly import this collection into Postman and test all endpoints.

📖 Learning & Skills Gained

-> Through this task, I gained hands-on experience in:

-> JWT authentication in Node.js

-> Implementing role-based access control (RBAC)

-> Securing API routes

-> Password hashing with bcrypt

-> Using Postman for API testing

-> Structuring a Node.js + MongoDB project professionally

🤝 Contribution

Feel free to fork this repo, raise issues, and submit PRs. 🚀

🏷️ Acknowledgement

This project is part of my internship at Prodigy Infotech.
Special thanks to the team for providing real-world tasks to strengthen backend development skills.
