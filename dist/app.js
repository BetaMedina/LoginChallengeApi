"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _index = require('./routes/index'); var _index2 = _interopRequireDefault(_index);
require('dotenv/config');
require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(_express2.default.json());
    this.server.use(_cors2.default.call(void 0, ));
  }

  routes() {
    this.server.use(_index2.default);
  }
}

exports. default = new App().server;
