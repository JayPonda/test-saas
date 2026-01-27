import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SubscriptionPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubscriptionPayment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      SubscriptionPayment.belongsTo(models.Subscription, {
        foreignKey: 'subscription_id',
        as: 'subscription'
      });
      SubscriptionPayment.hasMany(models.Refund, {
        foreignKey: 'reference_subscription_payment_id',
        as: 'refunds'
      });
    }
  }
  SubscriptionPayment.init({
    subscription_started_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    subscription_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    targetted_date: {
      type: DataTypes.DATE
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    subscription_endded_at: {
      type: DataTypes.DATE
    },
    transaction_meta: {
      type: DataTypes.JSON
    },
    transaction_error: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancellation_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'SubscriptionPayment',
    timestamps: true,
    paranoid: true,
  });
  return SubscriptionPayment;
};
