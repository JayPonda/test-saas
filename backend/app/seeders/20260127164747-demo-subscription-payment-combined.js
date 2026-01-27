'use strict';
import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(
    `SELECT id from Users;`
  );
  const subscriptions = await queryInterface.sequelize.query(
    `SELECT id from Subscriptions;`
  );

  const userRows = users[0];
  const subscriptionRows = subscriptions[0];

  if(userRows.length === 0 || subscriptionRows.length === 0) {
    return;
  }

  const payments = [];
  for(let i=0; i<5; i++) {
    const user = userRows[Math.floor(Math.random() * userRows.length)];
    const subscription = subscriptionRows[Math.floor(Math.random() * subscriptionRows.length)];
    const subscription_started_at = faker.date.past();
    const hasError = Math.random() > 0.8;
    const isCancelled = Math.random() > 0.7; // 30% chance of being cancelled

    payments.push({
      subscription_started_at,
      subscription_id: subscription.id,
      user_id: user.id,
      targetted_date: faker.date.future(),
      amount: faker.finance.amount(),
      subscription_endded_at: faker.date.future({ refDate: subscription_started_at }),
      transaction_meta: JSON.stringify({
        transaction_started_at: faker.date.past(),
        ended_at: faker.date.recent(),
        status: hasError ? 'failed' : (isCancelled ? 'cancelled' : 'completed'),
        error_message: hasError ? 'Insufficient funds' : null,
        source_account_meta: {
          type: 'credit_card',
          last4: '1234'
        },
        transaction_type: 'credit/debit card'
      }),
      transaction_error: hasError ? 'Insufficient funds' : null,
      cancelledAt: isCancelled ? faker.date.recent() : null,
      cancellation_reason: isCancelled ? faker.lorem.sentence() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert('SubscriptionPayments', payments, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('SubscriptionPayments', null, {});
}