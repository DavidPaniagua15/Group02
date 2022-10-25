const { Model, DataTypes, UUID } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        tasklist_id: {
            type: DataTypes.UUID,
            references: {
                model: 'tasklist',
                key: 'id',
                unique: false,
                underscored: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;