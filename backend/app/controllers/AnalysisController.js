import db from '../models/index.js';
import { Op, Sequelize } from 'sequelize';

const { User, Subscription, SubscriptionPayment, Refund } = db;

const parseQueryParams = (req, modelName) => {
  const { startDate, endDate, userIds, subscriptionTypes } = req.query;

  const whereClause = {};
  if (startDate && endDate) {
    whereClause.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  if (userIds) {
    whereClause.user_id = {
      [Op.in]: userIds.split(',').map(id => parseInt(id.trim())),
    };
  }

  const includeClause = [];
  const subscriptionWhere = {};
  if (subscriptionTypes) {
    subscriptionWhere.type = { [Op.in]: subscriptionTypes.split(',').map(type => type.trim()) };
  }

  if (modelName === 'SubscriptionPayment') {
    includeClause.push({
      model: Subscription,
      as: 'subscription',
      attributes: [],
      where: subscriptionWhere,
      required: Object.keys(subscriptionWhere).length > 0
    });
    includeClause.push({
      model: User,
      as: 'user',
      attributes: [],
      where: userIds ? { id: { [Op.in]: userIds.split(',').map(id => parseInt(id.trim())) } } : {},
      required: !!userIds
    });
  } else if (modelName === 'Refund') {
    includeClause.push({
      model: SubscriptionPayment,
      as: 'subscriptionPayment',
      attributes: [],
      include: [{
        model: Subscription,
        as: 'subscription',
        attributes: [],
        where: subscriptionWhere,
        required: Object.keys(subscriptionWhere).length > 0
      }],
      required: Object.keys(subscriptionWhere).length > 0 || !!userIds
    });
    includeClause.push({
      model: User,
      as: 'user',
      attributes: [],
      where: userIds ? { id: { [Op.in]: userIds.split(',').map(id => parseInt(id.trim())) } } : {},
      required: !!userIds
    });
  }

  return { whereClause, includeClause };
};

export const monthlyRecurringRevenue = async (req, res) => {
  try {
    const { whereClause, includeClause } = parseQueryParams(req, 'SubscriptionPayment');

    const monthlyPayments = await SubscriptionPayment.findAll({
      where: {
        ...whereClause,
        '$subscription.type$': {
          [Op.notIn]: ['onetime'],
        },
        cancelledAt: null,
      },
      include: includeClause,
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('SubscriptionPayment.amount')), 'totalRevenue']
      ],
      raw: true,
    });

    res.status(200).json({ monthlyRecurringRevenue: monthlyPayments[0].totalRevenue || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const oneTimePaymentRevenue = async (req, res) => {
  try {
    const { whereClause, includeClause } = parseQueryParams(req, 'SubscriptionPayment');

    const oneTimePayments = await SubscriptionPayment.findAll({
      where: {
        ...whereClause,
        '$subscription.type$': {
          [Op.in]: ['onetime'],
        },
        cancelledAt: null,
      },
      include: includeClause,
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('SubscriptionPayment.amount')), 'totalRevenue']
      ],
      raw: true,
    });

    res.status(200).json({ oneTimePaymentRevenue: oneTimePayments[0].totalRevenue || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refunds = async (req, res) => {
  try {
    const { whereClause, includeClause } = parseQueryParams(req, 'Refund');

    const totalRefunds = await Refund.findAll({
      where: {
        ...whereClause,
      },
      include: includeClause,
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('Refund.amount')), 'totalRefundAmount']
      ],
      raw: true,
    });

    res.status(200).json({ totalRefunds: totalRefunds[0].totalRefundAmount || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const funnel = async (req, res) => {
  try {
    const { startDate, endDate, userIds } = req.query;

    const userWhere = {};
    if (startDate && endDate) {
      userWhere.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }
    if (userIds) {
      userWhere.id = { [Op.in]: userIds.split(',').map(id => parseInt(id.trim())) };
    }

    // Step 1: Total Users Registered
    const totalUsersRegistered = await User.count({
      where: userWhere
    });

    const subscriptionPaymentWhere = {};
    if (startDate && endDate) {
      subscriptionPaymentWhere.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }
    if (userIds) {
      subscriptionPaymentWhere.user_id = { [Op.in]: userIds.split(',').map(id => parseInt(id.trim())) };
    }


    // Step 2: Users who bought a subscription (excluding cancelled)
    const usersWhoBoughtSubscription = await SubscriptionPayment.count({
      where: {
        ...subscriptionPaymentWhere,
        cancelledAt: null,
      },
      distinct: true,
      col: 'user_id'
    });

    // Step 3: Users who cancelled a subscription
    const usersWhoCancelledSubscription = await SubscriptionPayment.count({
      where: {
        ...subscriptionPaymentWhere,
        cancelledAt: { [Op.not]: null },
      },
      distinct: true,
      col: 'user_id'
    });

    res.status(200).json({
      totalUsersRegistered,
      usersWhoBoughtSubscription,
      usersWhoCancelledSubscription,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
