const { Model, DataTypes, UUID } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Tasklist extends Model {}

Tasklist.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tasklist',
    }
);

module.exports = Tasklist;