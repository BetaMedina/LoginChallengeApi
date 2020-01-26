"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Contact extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: _sequelize2.default.INTEGER,
        ddd: _sequelize2.default.INTEGER,
        contact_number: _sequelize2.default.INTEGER,
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
        tableName: 'contacts'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }
}

exports. default = Contact;
