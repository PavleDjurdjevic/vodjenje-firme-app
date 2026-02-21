Company Management Web Application

Full-stack web application for managing company data such as employees, departments, job positions, absences, and system users.

This project was developed as a final project for the ITAcademy JavaScript Development course.

The application is built using a separated frontend and backend architecture with a MySQL database.

Tech Stack

Frontend

Vue.js 3

Vue Router

Axios

HTML5

CSS3

Backend

Node.js

Express.js

REST API

MySQL

CORS

Database

MySQL

MySQL Workbench

Features

User authentication and login system

Role-based authorization (admin and user roles)

Employee management

Department management

Job position management

Absence tracking

Admin panel for managing system users

User Roles

Admin can:

Create, edit, and delete employees

Manage departments and job positions

Add and manage absences

Create and manage system users

Regular user can:

View employees

View absences

Guest (not logged in):

Can only access the login page

Project Structure
vodjenje-firme-app/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── db.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── api.js
│   └── package.json
│
├── database/
│   └── baza.sql
│
└── README.md
How to Run the Project Locally
1. Import Database

Open MySQL Workbench

Create a new schema:

vodjenje_firme

Import the file:

database/baza.sql
2. Backend Setup

Open terminal and go to backend folder:

cd backend

Install dependencies:

npm install

Create .env file inside backend folder:

PORT=3000
DB_HOST=localhost
DB_USER=YOUR_MYSQL_USER
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=vodjenje_firme

Start backend server:

npm start

Backend will run on:

http://localhost:3000
3. Frontend Setup

Open terminal and go to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend:

npm run dev

Frontend will run on:

http://localhost:5173
Demo Login Credentials

After importing the database, you can log in using:

Admin account:

Email: admin@firma.com
Password: admin123

User account:

Email: milan@firma.com
Password: 1234

Admin can create additional users from the application.

API Configuration

Frontend communicates with backend using Axios instance configured to:

http://localhost:3000
Purpose of the Project

This project demonstrates full-stack development skills including:

REST API development

Frontend and backend integration

Database design and relationships

Authentication and authorization

CRUD operations

GitHub Repository

Put your GitHub link here, for example:

https://github.com/PavleDjurdjevic/vodjenje-firme-app
Author

Pavle Djurdjevic

Final project – ITAcademy JavaScript Development Course
