const sequelize = require('./db')
const {DataTypes} = require('sequelize');

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "guest", allowNull: false},
    image: {type: DataTypes.STRING}
})

const Teg = sequelize.define("teg", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Project = sequelize.define("project", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    images: {type: DataTypes.ARRAY(DataTypes.STRING)},
    link: {type: DataTypes.STRING}
})

const Portfolio = sequelize.define("protfolio", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }, allowNull: false},
    salary: {type: DataTypes.INTEGER},
    tegs_id: { 
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        references: {
            model: Teg,
            key: 'id'
        }
    },
    projects_id: { 
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        references: {
            model: Project,
            key: 'id'
        }
    },
    description: {type: DataTypes.TEXT},
})

Portfolio.belongsTo(User, { foreignKey: 'userId' });
Portfolio.belongsToMany(Teg, { foreignKey: 'tegId' });
Portfolio.belongsToMany(Project, { foreignKey: 'projectId' });

module.exports = {
    User,
    Teg,
    Project,
    Portfolio,
}
