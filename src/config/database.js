const { Sequelize } = require('sequelize');

// Instantiate new Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    // Add additional options here if needed
});

module.exports = {
    database: 'your_database_name',
    username: 'your_username',
    password: 'your_password',
    options: {
        host: 'your_host',
        dialect: 'postgres',  // or mysql, sqlite, mariadb
        // logging: false,  // You can optionally include this to disable logging SQL statements to the console
    }
};
