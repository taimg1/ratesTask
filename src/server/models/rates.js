// models/rates.js
const { Model, DataTypes } = require('sequelize');

class ExchangeRate extends Model {}

module.exports = (sequelize) => {
  ExchangeRate.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    currency: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      validate: {
        isIn: [['USD', 'EUR']],
      },
    },
    rate: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ExchangeRate',
    tableName: 'rates',
    timestamps: false,
    indexes: [{
      unique: true,
      fields: ['rate_date', 'currency']
    }]
  });

  return ExchangeRate;
};