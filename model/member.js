module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define("member", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    yearOfStudy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
    },

    hometown: {
      type: DataTypes.STRING,
    },

    program: {
      type: DataTypes.STRING,
    },

    orgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return member;
};
