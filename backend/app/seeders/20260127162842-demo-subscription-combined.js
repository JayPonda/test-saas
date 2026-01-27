import subscriptionType from '../enums/subscriptionType.js';
import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const subscriptions = [];
  const subscriptionTypeValues = Object.values(subscriptionType);
  const subscriptionNames = new Set();

  for (let i = 0; i < 5; i++) {
    const isActive = Math.random() > 0.5;
    let activatedForm = null;
    if (isActive) {
      activatedForm = faker.date.past();
    }

    let subscription_name = faker.commerce.productName();
    while(subscriptionNames.has(subscription_name)) {
      subscription_name = faker.commerce.productName();
    }
    subscriptionNames.add(subscription_name);

    subscriptions.push({
      type: subscriptionTypeValues[Math.floor(Math.random() * subscriptionTypeValues.length)],
      isActive,
      subscription_name,
      activatedForm,
      expiredAt: isActive ? faker.date.future({ refDate: activatedForm }) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert('Subscriptions', subscriptions, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Subscriptions', null, {});
}