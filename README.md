# 📝 ToDo List Project - Backend

🚀 **RESTful API for managing tasks in a to-do list.**
This project allows CRUD (Create, Read, Update, Delete) operations on a user's tasks. The backend is built with **Node.js** and **Express**, and data is stored using **MongoDB**.

---

## 📌 Technologies Used

🔹 **Backend**: Node.js + Express
🔹 **Database**: MongoDB + Mongoose
🔹 **Language**: TypeScript
🔹 **Authentication**: JWT (JSON Web Tokens)
🔹 **Dependency Management**: npm

---

## 📋 Prerequisites

Before you begin, ensure that you have the following installed on your machine:

-   🟢 **Node.js** (v14 or higher) → [Download](https://nodejs.org/)
-   🗄️ **MongoDB** (local or hosted via MongoDB Atlas) → [Download](https://www.mongodb.com/)

---

## ⚙️ Installation

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/ThiagoMilanca/ToDo-List-Project-Backend.git
cd ToDo-List-Project-Backend
```

2. Install the required dependencies:

```bash
npm install
```

## 🔧 Configuration

Create a .env file at the root of the project with the following configuration:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-list
JWT_SECRET=your_secret_key
```

Explanation:

-   PORT: The port where the server will run.
-   MONGODB_URI: MongoDB connection URL.
-   JWT_SECRET: Secret key for JWT authentication.

## 🚀 Running the Server

To start the server in development mode with nodemon:

```bash
npm run dev
```

To run in production:

```bash
npm start
```

The API will be available at: http://localhost:3000

## 📡 Available Endpoints

| Method | Endpoint   | Description               |
| ------ | ---------- | ------------------------- |
| GET    | /tasks     | 📥 Get all tasks          |
| GET    | /tasks/:id | 🔍 Get a specific task    |
| POST   | /tasks     | ✍️ Create a new task      |
| PUT    | /tasks/:id | ✏️ Update a specific task |
| DELETE | /tasks/:id | 🗑️ Delete a specific task |

## 🧪 Tests

To run the tests for this project, make sure to have Mocha and Chai installed, then run:

```bash
npm test
```

## 🤝 Contributing

-Fork the repository.
-Create a new branch (git checkout -b feature-branch).
-Make your changes and commit (git commit -am 'Add new feature').
-Push to your branch (git push origin feature-branch).
-Create a pull request.

## 👨‍💻 Author

Thiago Milanca

GitHub: https://github.com/ThiagoMilanca
LinkedIn: https://www.linkedin.com/in/thiago-milanca/
