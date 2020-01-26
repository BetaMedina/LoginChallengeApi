import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: {
          type: Sequelize.STRING,
          unique: {
            msg: 'E-mail já existente'
          }
        },

        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        last_login: Sequelize.DATE,
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE
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
        user.password_hash = await bcrypt.hash(user.password, 8);
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
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
