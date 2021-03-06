"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

module.exports = {
  async postValidate(req, res, next) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        senha_pessoa: Yup.string()
          .required()
          .min(6)
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Validation fail', message: err.inner });
    }
  },
  async passwordValid(dbPerson, password_person) {
    if (!dbPerson) return { error: 'Password does not match' };

    if (!(await dbPerson.checkPassword(password_person))) return false;

    return true;
  }
};
