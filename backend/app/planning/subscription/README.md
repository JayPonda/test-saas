# Subscription Feature Planning

## Objective
To implement a new `Subscription` model, along with its associated migration, enum for subscription types, seeder, and controller.

## Fields
- `id`: Primary Key, auto-increment
- `type`: Enum ['monthly', 'onetime']
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- `deletedAt`: Timestamp (for soft deletes)
- `isActive`: Boolean

## Todo List
- [ ] Create `subscriptionType` enum (monthly/onetime).
- [ ] Create a new migration to add the `Subscription` table.
- [ ] Create the `Subscription` model.
- [ ] Create a seeder for `Subscription`.
- [ ] Create a controller for `Subscription`.
- [ ] Add routes for `Subscription`.
