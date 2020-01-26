module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdated: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      },
      contact_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('contacts');
  }
};
