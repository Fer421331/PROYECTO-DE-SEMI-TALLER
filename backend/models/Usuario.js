const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define(
    'Usuario',
    {
        usercod: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        useremail: {
            type: DataTypes.STRING(80),
            allowNull: false
        },

        username: {
            type: DataTypes.STRING(80),
            allowNull: false
        },

        userpswd: {
            type: DataTypes.STRING(128),
            allowNull: false
        },

        userfching: {
            type: DataTypes.DATE,
            allowNull: false
        },

        userpswdest: {
            type: DataTypes.CHAR(3),
            allowNull: false
        },

        userpswdexp: {
            type: DataTypes.DATE,
            allowNull: true
        },

        userest: {
            type: DataTypes.CHAR(3),
            allowNull: false
        },

        useractcod: {
            type: DataTypes.STRING(128),
            allowNull: true
        },

        userpswdchg: {
            type: DataTypes.STRING(128),
            allowNull: true
        },

        usertipo: {
            type: DataTypes.CHAR(3),
            allowNull: false
        }
    },
    {
        tableName: 'usuario',
        timestamps: false
    }
);

module.exports = Usuario;