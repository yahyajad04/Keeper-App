# Keeper App

A simple note-taking web application built with **React**, **Node.js**, and **MongoDB**. Users can create an account, log in, and manage their personal notes. Each user's notes are stored securely in the database and are only accessible after authentication.

## Features

* User registration and login
* Secure authentication
* Create new notes
* Delete existing notes
* Notes are stored in a database
* Each user can only access their own notes

## Technologies Used

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies

Since the `node_modules` folders are not included in the repository, install the dependencies for both the backend and frontend.

**Backend**

```bash
cd Keeper-App-Backend
npm install
```

**Frontend**

```bash
cd ../Keeper-App-Frontend
npm install
```

### 3. Change Database Info

1. Go to the index.js file in the backend.
2. Change the db constant values to the values of your local database to work correctly.

### 4. Start the backend

```bash
node index.js
```

### 5. Start the frontend

Open another terminal:

```bash
cd Keeper-App-Frontend
npm run dev
```

### 6. Open the application

Open your browser and navigate to the URL shown by Vite (typically `http://localhost:5173`).

## How to Use

1. Create a new account using the **Sign Up** page.
2. Log in with your credentials.
3. Add new notes using the note editor.
4. Delete notes you no longer need.
5. Your notes are automatically saved to the database and will be available the next time you log in.

## Project Structure

```
Keeper-App/
├── Keeper-App-Backend/
└── Keeper-App-Frontend/
```

## License

This project was created for learning purposes.
