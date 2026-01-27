
import { faker } from '@faker-js/faker';
import churn from '../enums/churn.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = [];
  const churnValues = Object.values(churn);
  for (let i = 0; i < 10; i++) { // Generate 10 fake users
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      status: churnValues[Math.floor(Math.random() * churnValues.length)],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  await queryInterface.bulkInsert('Users', users, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}
