"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _userController = require('../app/controller/userController'); var _userController2 = _interopRequireDefault(_userController);
var _sessionController = require('../app/controller/sessionController'); var _sessionController2 = _interopRequireDefault(_sessionController);
var _auth = require('../app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);
/** Controllers */
const routes = new (0, _express.Router)();

routes.get('/api', (req, res) => {
  res.send('Api rodando');
});

routes.post('/signup', _userController2.default.store);
routes.post('/signin', _sessionController2.default.store);
routes.get('/perfil/:id', _auth2.default, _userController2.default.read);

exports. default = routes;
