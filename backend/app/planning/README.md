# Backend API Server Setup

## Goal
Create a new backend API server at `backend/app` with a structure similar to `backend/express-sequelize-mvc-boilerplate`, but using updated dependencies, `sqlite3` for the database, and focusing solely on API endpoints (no views).

## Plan

### Phase 1: Initial Setup
- [x] Create basic directory structure (`backend/app`, `config`, `models`, `migrations`, `routes`, `controllers`).
- [x] Initialize `package.json` using `pnpm init`.
- [x] Install dependencies: `express`, `sequelize`, `sqlite3` (production), `nodemon`, `sequelize-cli` (development).
- [x] Create `.sequelizerc` to configure `sequelize-cli`.
- [x] Initialize sequelize with `npx sequelize-cli init` to create `config/config.json`.
- [x] Modify `config/config.json` to use `sqlite3`.
- [x] Create a basic `app.js` file for the Express server.
- [x] Remove the `bin` directory as it's not needed.
- [x] Update `package.json` scripts (`start`, `dev`) to run `app.js` with `nodemon`.
- [x] Create `.gitignore` file.
- [x] Create `nodemon.json` file.
- [x] Resolve `sqlite3` native module build issues (`npm rebuild sqlite3`).

### Phase 2: User Module Implementation
- [x] Create `controllers` directory.
- [x] Generate `User` model and migration using `sequelize-cli`.
- [x] Run `db:migrate` to create the `Users` table.
- [x] Add new migration for `signup_date` and `churn_status` to `User` table.
- [x] Run `db:migrate` to apply the changes.
- [x] Create `UserController.js` with `findAll` and `findOne` operations for User.
- [x] Create `routes/users.js` with `GET` endpoints for User.
- [x] Add user routes to `app.js`.
- [x] Generate `demo-user` seeder using `sequelize-cli`.
- [x] Populate `demo-user` seeder with sample data.
- [x] Run `db:seed:all` to seed the database.

### Phase 3: ESM Conversion
- [x] Update `package.json` to include `"type": "module"`.
- [x] Convert `app.js` to ESM syntax.
- [x] Convert `routes/users.js` to ESM syntax.
- [x] Convert `controllers/UserController.js` to ESM syntax.
- [x] Convert `models/index.js` to ESM syntax.
- [x] Convert `models/user.js` to ESM syntax.
- [x] Rename `.sequelizerc` to `.sequelizerc.js` and convert to ESM syntax.
- [x] Rename `config/config.json` to `config/config.js` and convert to ESM syntax.
- [x] Convert migration files to ESM syntax (already done by sequelize-cli).
- [x] Convert seeder files to ESM syntax.

### Phase 4: Testing (Manual Verification)
- [ ] Start the server using `pnpm dev` in `backend/app`.
- [ ] Verify the root endpoint (`/`) returns the welcome message.
- [ ] Test User GET endpoints using a tool like Postman or curl:
    - [ ] GET `/api/users` to retrieve all users.
    - [ ] GET `/api/users/:id` to retrieve a specific user.

### Phase 5: Finalization
- [ ] Review code for adherence to conventions and best practices.
- [ ] Add comments where necessary.
- [ ] Clean up any temporary files or unnecessary code.
