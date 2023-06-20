const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Platform', {

        id: {

            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        nombre: {

            type: DataTypes.STRING, 
            allowNull: false,

        }

    }, {freezeTableName: true, timestamps: false});

}