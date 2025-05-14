
module.exports = (sequelize, DataTypes) => {
  const Patrimonio = sequelize.define('Patrimonio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    numero_patrimonio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    setor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_patrimonio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Patrimonio;
};