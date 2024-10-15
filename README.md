# GeoData Application

Deployed Link -

The GeoData Application is a web-based tool built with React and the Leaflet library, designed to facilitate the interaction with geographical data in various formats. Users can upload GeoJSON and KML files, visualize them on a map, draw custom shapes, and download the created shapes for further use.

## Demo Video - https://drive.google.com/file/d/1Rkmu3jOJClvEsNMCEylnXGE9waQny9D3/view?usp=drive_link

# Project Name

## Description

This project is a full-stack web application that provides user authentication, account management, and secure access to user data. The frontend is built using **React.js** and deployed on **Vercel**, while the backend is written in **Go** and hosted on **DigitalOcean App Platform**. The application uses **Neon DB** for a cloud-based, serverless PostgreSQL database, eliminating the need for local PostgreSQL setup. The frontend communicates with the backend via RESTful APIs to manage user sessions, perform account updates, and securely handle user data.

## System Design Overview

### Architecture:

#### Frontend:

- Developed in **React.js** with **Tailwind CSS** for UI styling.
- Deployed on **Vercel**, offering seamless integration with GitHub for continuous deployment.
- Communicates with the backend using **Axios** to make API requests for login, signup, and account management.

#### Backend:

- Built using **Go** and exposes RESTful API endpoints for handling authentication (login/signup), user data retrieval, and account updates.
- Deployed on **DigitalOcean App Platform**, which allows easy scaling and management of the Go application.

#### Database:

- Hosted on **Neon**, a serverless PostgreSQL database solution that scales automatically with the needs of the application.
- The Go backend connects to **Neon DB** for persistent storage of user information and authentication data.

## Running the Project Locally

### Prerequisites

- **Node.js** for running the frontend.
- **Go** for running the backend.
- Make sure you have access to the environment variables required to connect the backend to the Neon database.

### 1. Running the Frontend

**Steps:**

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Access the frontend:
   Open your browser and go to `http://localhost:5173` to view the application.

### 2. Running the Backend

**Steps:**

1. Navigate to the backend directory:

   ```bash
   cd backend
   go mod tidy
   go run main.go
   ```

2. Configure environment variables:
   Create a `.env` file in the backend directory and add the necessary configuration:
   ```plaintext
   DB_HOST=your-neon-db-host
   DB_PORT=5432
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   JWT_SECRET=your-secret-key
   ```
