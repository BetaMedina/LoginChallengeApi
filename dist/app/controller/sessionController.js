"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _authConfig = require('../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);
var _sessionPost = require('../validation/sessionController/sessionPost'); var _sessionPost2 = _interopRequireDefault(_sessionPost);

class SessionController {
  async store(req, res) {
    const { senha, email } = req.body;
    try {
      const personDb = await _User2.default.findOne({ where: { email } });
      if (!personDb) {
        return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });
      }

      const isValid = await _sessionPost2.default.isExist(personDb, senha);

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
          token: _jsonwebtoken2.default.sign(
            { id: personDb.id, date: new Date() },
            _authConfig2.default.secret,
            {
              expiresIn: _authConfig2.default.expiresIn
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
exports. default = new SessionController();
