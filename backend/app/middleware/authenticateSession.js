import db from '../models/index.js';
const { Session, User } = db;

export const authenticateSession = async (req, res, next) => {
  const sessionId = req.headers['x-session-id'];

  if (!sessionId) {
    return res.status(401).json({ error: 'Session ID is required' });
  }

  try {
    const session = await Session.findByPk(sessionId, {
      include: [{ model: User, as: 'user' }]
    });

    if (!session || !session.login_successful || session.logout_at) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    req.session = session;
    req.user = session.user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
