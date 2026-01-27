'use strict';
import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(
    `SELECT id from Users;`
  );
  const subscriptionPayments = await queryInterface.sequelize.query(
    `SELECT id from SubscriptionPayments;`
  );

  const userRows = users[0];
  const subscriptionPaymentRows = subscriptionPayments[0];

  if(userRows.length === 0 || subscriptionPaymentRows.length === 0) {
    return;
  }

  const refunds = [];
  for(let i=0; i<5; i++) {
    const user = userRows[Math.floor(Math.random() * userRows.length)];
    const subscriptionPayment = subscriptionPaymentRows[Math.floor(Math.random() * subscriptionPaymentRows.length)];
    const hasError = Math.random() > 0.8;

    refunds.push({
      reference_subscription_payment_id: subscriptionPayment.id,
      user_id: user.id,
      amount: faker.finance.amount(),
      transaction_meta: JSON.stringify({
        transaction_started_at: faker.date.past(),
        ended_at: faker.date.recent(),
        status: hasError ? 'failed' : 'completed',
        error_message: hasError ? 'Refund failed' : null,
        source_account_meta: {
          type: 'bank_transfer',
          bank_name: 'Example Bank'
        },
        transaction_type: 'bank payment'
      }),
      transaction_error: hasError ? 'Refund failed' : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert('Refunds', refunds, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Refunds', null, {});
}