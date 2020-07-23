module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
  };

  const Book = sequelize.define('Book', schema);
  return Book;
};
