
import { Model } from 'sequelize';
import churn from '../../enums/churn.js';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.SubscriptionPayment, {
        foreignKey: 'user_id',
        as: 'subscriptionPayments'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM(Object.values(churn)),
      defaultValue: churn.ACTIVE,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
  });
  return User;
};