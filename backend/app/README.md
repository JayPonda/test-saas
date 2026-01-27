# Backend Application

## Description
This is a backend application built with Node.js, Express, and Sequelize. It manages user sessions, subscriptions, payments, refunds, and provides analysis functionalities.

## Features
This backend application provides the following functionalities:
-   **User Management:** Handles user creation, authentication, and general user data.
-   **Session Management:** Manages user login sessions.
-   **Subscription Management:** Manles user subscriptions, including creation, updates, and cancellations.
-   **Subscription Payments:** Processes and tracks payments for subscriptions.
-   **Refunds:** Manages refund requests and processes.
-   **Analysis:** Provides analytical endpoints, likely for subscription and user data.

## Prerequisites
- Node.js (v18 or higher recommended)
- pnpm

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd app
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

## Database Setup

This project uses Sequelize for ORM and SQLite as the database.

1.  **Run migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```
2.  **Seed the database (optional, for demo data):**
    ```bash
    npx sequelize-cli db:seed:all
    ```

## Running the Application

1.  **Development mode (with nodemon for auto-restart):**
    ```bash
    pnpm dev
    ```
    or
    ```bash
    pnpm start
    ```

## Project Structure

-   `app.js`: Main application entry point.
-   `config/`: Configuration files for the application.
-   `controllers/`: Contains the business logic for handling requests and interacting with models.
-   `enums/`: Defines enumerations used across the application.
-   `middleware/`: Express middleware functions for request processing (e.g., authentication).
-   `migrations/`: Sequelize migration files for database schema changes.
-   `models/`: Sequelize model definitions and their associations.
-   `routes/`: Defines API routes and links them to controller functions.
-   `seeders/`: Sequelize seeder files for populating the database with initial data.
