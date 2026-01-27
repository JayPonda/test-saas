'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('SubscriptionPayments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    subscription_started_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    subscription_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Subscriptions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    targetted_date: {
      type: Sequelize.DATE
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    subscription_endded_at: {
      type: Sequelize.DATE
    },
    transaction_meta: {
      type: Sequelize.JSON
    },
    transaction_error: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('SubscriptionPayments');
}