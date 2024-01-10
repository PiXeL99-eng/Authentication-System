const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    `${process.env.DATABASE_NAME}`, 
    `${process.env.DATABASE_USERNAME}`, 
    `${process.env.DATABASE_PASSWORD}`, 
    {
        host: `${process.env.DATABASE_HOST}`,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Users = require('./Users')(sequelize, DataTypes)

db.sequelize.sync({force: false}).then(() => {
    console.log('Table(s) created successfully!');
}).catch((error) => {
    console.error('Unable to create the table(s): ', error);
});

module.exports = db;