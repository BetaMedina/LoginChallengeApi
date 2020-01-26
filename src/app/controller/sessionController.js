import jwt from 'jsonwebtoken';
import User from '../models/User';
import AuthConfig from '../../config/authConfig';
import sessionValidation from '../validation/sessionController/sessionPost';

class SessionController {
  async store(req, res) {
    const { senha, email } = req.body;
    try {
      const personDb = await User.findOne({ where: { email } });
      if (!personDb) {
        return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });
      }

      const isValid = await sessionValidation.isExist(personDb, senha);

      if (!isValid) {
        return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });
      }

      if (isValid === true) {
        await personDb.update({ last_login: new Date() });

        return res.json({
          id: personDb.id,
          data_criacao: personDb.createdAt,
          data_atualizacao: personDb.updatedAt,
          ultimo_login: personDb.updatedAt,
          token: jwt.sign(
            { id: personDb.id, date: new Date() },
            AuthConfig.secret,
            {
              expiresIn: AuthConfig.expiresIn
            }
          )
        });
      }
      throw Error;
    } catch (e) {
      return res.status(400).json({ err: e.errors.map(err => err.message) });
    }
  }
}
export default new SessionController();
