const sequelize = require('./db')
const {DataTypes} = require('sequelize');

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "guest"},
})

module.exports = {
    User
}
