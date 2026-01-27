import db from '../models/index.js';
const { SubscriptionPayment } = db;

export const getAllSubscriptionPayments = async (req, res) => {
  try {
    const subscriptionPayments = await SubscriptionPayment.findAll();
    res.status(200).json(subscriptionPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubscriptionPaymentById = async (req, res) => {
  try {
    const subscriptionPayment = await SubscriptionPayment.findByPk(req.params.id);
    if (subscriptionPayment) {
      res.status(200).json(subscriptionPayment);
    } else {
      res.status(404).json({ error: 'SubscriptionPayment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubscriptionPayment = async (req, res) => {
  try {
    const subscriptionPayment = await SubscriptionPayment.create(req.body);
    res.status(201).json(subscriptionPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
