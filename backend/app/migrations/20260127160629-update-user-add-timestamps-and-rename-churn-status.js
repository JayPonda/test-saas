import churn from '../enums/churn.js';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'deletedAt', {
    type: Sequelize.DATE,
  });
  await queryInterface.removeColumn('Users', 'signup_date');
  await queryInterface.renameColumn('Users', 'churn_status', 'status');
  await queryInterface.changeColumn('Users', 'status', {
    type: Sequelize.ENUM(Object.values(churn)),
    defaultValue: churn.ACTIVE,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'deletedAt');
  await queryInterface.addColumn('Users', 'signup_date', {
    type: Sequelize.DATE,
  });
  await queryInterface.renameColumn('Users', 'status', 'churn_status');
  await queryInterface.changeColumn('Users', 'churn_status', {
    type: Sequelize.BOOLEAN,
  });
}