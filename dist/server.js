"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

console.log(`Server ouvindo a porta -> ${process.env.APP_PORT}`);
_app2.default.listen(process.env.APP_PORT);
