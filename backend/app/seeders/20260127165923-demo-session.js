'use strict';
import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(
    `SELECT id from Users;`
  );

  const userRows = users[0];

  if(userRows.length === 0) {
    return;
  }

  const sessions = [];
  for(let i=0; i<10; i++) {
    const user = userRows[Math.floor(Math.random() * userRows.length)];
    const login_at = faker.date.past();
    const login_successful = Math.random() > 0.1; // 90% success rate

    sessions.push({
      user_id: user.id,
      login_at,
      logout_at: login_successful && Math.random() > 0.5 ? faker.date.future({ refDate: login_at }) : null,
      ip_address: faker.internet.ip(),
      user_agent: faker.internet.userAgent(),
      login_successful,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert('Sessions', sessions, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Sessions', null, {});
}