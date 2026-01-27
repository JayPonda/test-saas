import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Refund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Refund.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Refund.belongsTo(models.SubscriptionPayment, {
        foreignKey: 'reference_subscription_payment_id',
        as: 'subscriptionPayment'
      });
    }
  }
  Refund.init({
    reference_subscription_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    transaction_meta: {
      type: DataTypes.JSON
    },
    transaction_error: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Refund',
    timestamps: true,
    paranoid: true,
  });
  return Refund;
};
