import db from '../models/index.js';
const { Session, User } = db;

export const createSession = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const session = await Session.create({
      user_id,
      login_at: new Date(),
      ip_address: req.ip,
      user_agent: req.headers['user-agent'],
      login_successful: true,
    });

    res.status(201).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.logout_at = new Date();
    await session.save();

    res.status(200).json({ message: 'Session logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};