'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('SubscriptionPayments', 'cancelledAt', {
    type: Sequelize.DATE,
    allowNull: true
  });
  await queryInterface.addColumn('SubscriptionPayments', 'cancellation_reason', {
    type: Sequelize.STRING,
    allowNull: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('SubscriptionPayments', 'cancelledAt');
  await queryInterface.removeColumn('SubscriptionPayments', 'cancellation_reason');
}