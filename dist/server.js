function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const _app = require('./app');

const _app2 = _interopRequireDefault(_app);

console.log(`Server ouvindo a porta -> ${process.env.PORT}`);
_app2.default.listen(process.env.PORT || process.env.APP_PORT);
