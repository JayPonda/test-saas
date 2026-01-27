import { Model } from 'sequelize';
import subscriptionType from '../../enums/subscriptionType.js';

export default (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.hasMany(models.SubscriptionPayment, {
        foreignKey: 'subscription_id',
        as: 'subscriptionPayments'
      });
    }
  }
  Subscription.init({
    type: {
      type: DataTypes.ENUM(Object.values(subscriptionType)),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    subscription_name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    activatedForm: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: true,
    paranoid: true,
    validate: {
      activatedFormRequired() {
        if (this.isActive && !this.activatedForm) {
          throw new Error('activatedForm is required when isActive is true');
        }
      }
    }
  });
  return Subscription;
};