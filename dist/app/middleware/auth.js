"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _authConfig = require('../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);

exports. default = async (req, res, next) => {
  const auth = req.headers.access_token;
  if (!auth) return res.status(401).json({ error: 'Não autorizado' });

  const [header, token] = auth.split(' ');
  if (header !== 'Bearer') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _authConfig2.default.secret);
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
