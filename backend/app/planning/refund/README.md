# Refund Feature Planning

## Objective
To implement a new `Refund` model, along with its associated migration and seeder. No controller is required as per user's request.

## Fields
- `id`: Primary Key
- `reference_subscription_payment_id`: Foreign Key to SubscriptionPayments
- `user_id`: Foreign Key to Users
- `amount`: DECIMAL
- `createdAt`: DATE
- `updatedAt`: DATE
- `deletedAt`: DATE
- `transaction_meta`: JSONB
- `transaction_error`: STRING

## Todo List
- [ ] Create a new migration to add the `Refund` table.
- [ ] Create the `Refund` model.
- [ ] Add association to `User` and `SubscriptionPayment` models.
- [ ] Create a seeder for `Refund`.
