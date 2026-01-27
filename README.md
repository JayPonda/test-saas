# SaaS Project

This is a SaaS project with a Node.js backend and a React frontend.

# Backend and Frontend Documentation with Setup Instructions

This document outlines the setup and running instructions for both the backend and frontend components of the application.

## Table of Contents
- [Backend Setup](#backend-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Backend](#running-the-backend)
- [Frontend Setup](#frontend-setup)
  - [Prerequisites](#frontend-prerequisites-1)
  - [Installation](#installation-1)
  - [Running the Frontend](#running-the-frontend-1)
## Backend Setup
This section details how to set up and run the backend server.

### Prerequisites
- Node.js (version 18 or higher recommended)
- pnpm (as the package manager)

### Installation
1. Navigate to the backend application directory:
   ```bash
   cd backend/app
   ```
2. Install the dependencies using pnpm:
   ```bash
   pnpm install
   ```

### Database Setup
The backend uses Sequelize for ORM and `sqlite3` as the database.
1. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
2. Seed the database with initial data (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Running the Backend
To start the backend server:
```bash
pnpm start
```
The server should now be running, typically on `http://localhost:3000` (or as configured).
## Frontend Setup
This section details how to set up and run the frontend application.

### Prerequisites
- Node.js (version 18 or higher recommended)
- pnpm (as the package manager)

### Installation
1. Navigate to the frontend application directory:
   ```bash
   cd frontend/app/demo-app
   ```
2. Install the dependencies using pnpm:
   ```bash
   pnpm install
   ```

### Running the Frontend
To start the frontend development server:
```bash
pnpm dev
```
The application should now be running, typically on `http://localhost:5173` (or as configured by Vite).
