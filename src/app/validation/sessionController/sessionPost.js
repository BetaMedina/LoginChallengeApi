import * as Yup from 'yup';

module.exports = {
  async validate(req, res, next) {
    try {
      const schema = Yup.object().shape({
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

  async isExist(dbPerson, password_person) {
    if (!dbPerson) return { error: 'User not exists' };

    if (!(await dbPerson.checkPassword(password_person))) return false;

    return true;
  }
};
