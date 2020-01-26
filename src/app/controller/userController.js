import jwt from 'jsonwebtoken';
import User from '../models/User';
import Contact from '../models/Contact';
import authConfig from '../../config/authConfig';

class UserController {
  async store(req, res) {
    const { nome, email, senha, telefones } = req.body;
    try {
      const user = await User.create({
        name: nome,
        email,
        password: senha
      });
      await telefones.map(tel =>
        Contact.create({
          ddd: tel.ddd,
          contact_number: tel.numero,
          user_id: user.id
        })
      );

      return res.json({
        token: jwt.sign({ id: user.id, date: new Date() }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        }),
        id: user.id,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: user.createdAt
      });
    } catch (e) {
      return res.status(400).json({ err: e.errors.map(err => err.message) });
    }
  }

  async read(req, res) {
    const { id } = req.params;
    const { userID } = req;
    if (userID !== Number(id)) {
      return res.status(401).json({ err: 'Não autorizado' });
    }
    try {
      const user = await User.findByPk(id, {
        include: {
          model: Contact,
          as: 'contact',
          attributes: ['ddd', 'contact_number']
        }
      });
      return res.json(user);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }
}

export default new UserController();
