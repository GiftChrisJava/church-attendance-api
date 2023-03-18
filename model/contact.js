module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define("contact", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    memberId: {
      type: DataTypes.INTEGER,
    },

    phone1: {
      type: DataTypes.STRING,
      unique: true,
    },

    phone2: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  return contact;
};
