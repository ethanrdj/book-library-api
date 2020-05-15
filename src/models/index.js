const Sequelize = require('sequelize');
const ReaderModel = require('./reader');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  const Reader = ReaderModel(sequelize, Sequelize);

  sequelize.sync({ alter: true });
  return {
    Reader,
  };
};

module.exports = setupDatabase();