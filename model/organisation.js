module.exports = (sequelize, DataTypes) => {
  const organisation = sequelize.define("organisation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    college: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orgName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return organisation;
};
