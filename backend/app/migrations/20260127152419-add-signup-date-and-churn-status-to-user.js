

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'signup_date', {
    type: Sequelize.DATE
  });
  await queryInterface.addColumn('Users', 'churn_status', {
    type: Sequelize.BOOLEAN
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'signup_date');
  await queryInterface.removeColumn('Users', 'churn_status');
}
