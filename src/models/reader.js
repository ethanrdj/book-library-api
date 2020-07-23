module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  const Reader = sequelize.define('Reader', schema);
  return Reader;
};
