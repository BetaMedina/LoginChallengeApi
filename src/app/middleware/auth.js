import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';

export default async (req, res, next) => {
  const auth = req.headers.access_token;
  if (!auth) return res.status(401).json({ error: 'Não autorizado' });

  const [header, token] = auth.split(' ');
  if (header !== 'Bearer') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userID = decoded.id;
    req.lastLogin = decoded.date;
    return next();
  } catch (e) {
    if (e.message === 'invalid token') {
      return res.status(401).json({ error: 'Não autorizado' });
    }
    return res.status(401).json({ error: 'Sessão inválida' });
  }
};
