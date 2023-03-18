module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define("attendance", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    memberId: {
      type: DataTypes.INTEGER,
    },

    orgId: {
      type: DataTypes.INTEGER,
    },

    attended: {
      type: DataTypes.BOOLEAN,
    },

    attendanceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    day: {
      type: DataTypes.STRING,
    },

    monthYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    month: {
      type: DataTypes.INTEGER,
    },

    year: {
      type: DataTypes.INTEGER,
    },
  });

  return attendance;
};
