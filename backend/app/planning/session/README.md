# Session Feature Planning

## Objective
To implement a new `Session` model to track user login attempts and frequency for metrics.

## Fields
- `id`: Primary Key
- `user_id`: Foreign Key to Users
- `login_at`: DATE
- `logout_at`: DATE
- `ip_address`: STRING
- `user_agent`: STRING
- `login_successful`: BOOLEAN

## Todo List
- [ ] Create a new migration to add the `Session` table.
- [ ] Create the `Session` model.
- [ ] Add association to the `User` model.
- [ ] Create a seeder for `Session`.
- [ ] Create a controller for `Session`.
- [ ] Add routes for `Session`.
