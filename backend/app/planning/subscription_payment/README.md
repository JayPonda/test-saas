# Subscription Payment Feature Planning

## Objective
To implement a new `SubscriptionPayment` model, along with its associated migration, seeder, and controller.

## Fields
- `id`: Primary Key
- `subscription_started_at`: DATE
- `subscription_id`: Foreign Key to Subscriptions
- `user_id`: Foreign Key to Users
- `targetted_date`: DATE
- `amount`: DECIMAL
- `subscription_endded_at`: DATE
- `createdAt`: DATE
- `updatedAt`: DATE
- `deletedAt`: DATE
- `transaction_meta`: JSONB

## Todo List
- [ ] Create a new migration to add the `SubscriptionPayment` table.
- [ ] Create the `SubscriptionPayment` model.
- [ ] Create a seeder for `SubscriptionPayment`.
- [ ] Create a controller for `SubscriptionPayment`.
- [ ] Add routes for `SubscriptionPayment`.
- [ ] Add associations between User, Subscription, and SubscriptionPayment.
