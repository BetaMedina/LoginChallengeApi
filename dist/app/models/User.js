"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: {
          type: _sequelize2.default.STRING,
          unique: {
            msg: 'E-mail já existente'
          }
        },

        password_hash: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        last_login: _sequelize2.default.DATE,
        createdAt: {
          field: 'created_at',
          type: _sequelize2.default.DATE
        },
        updatedAt: {
          field: 'updated_at',
          type: _sequelize2.default.DATE
        }
      },
      {
        sequelize,
        tableName: 'users'
      }
    );
    this.addHook('beforeSave', async user => {
      console.log(user.name);
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Contact, {
      foreignKey: 'user_id',
      as: 'contact'
    });
  }

  async checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
