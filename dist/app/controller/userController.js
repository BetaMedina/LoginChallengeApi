"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Contact = require('../models/Contact'); var _Contact2 = _interopRequireDefault(_Contact);
var _authConfig = require('../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);

class UserController {
  async store(req, res) {
    const { nome, email, senha, telefones } = req.body;
    try {
      const user = await _User2.default.create({
        name: nome,
        email,
        password: senha
      });
      await telefones.map(tel =>
        _Contact2.default.create({
          ddd: tel.ddd,
          contact_number: tel.numero,
          user_id: user.id
        })
      );

      return res.json({
        token: _jsonwebtoken2.default.sign({ id: user.id, date: new Date() }, _authConfig2.default.secret, {
          expiresIn: _authConfig2.default.expiresIn
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
      const user = await _User2.default.findByPk(id, {
        include: {
          model: _Contact2.default,
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

exports. default = new UserController();
