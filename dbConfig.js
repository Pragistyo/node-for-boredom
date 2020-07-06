require('dotenv').config()
const config = {
    user: process.env.USER, 
    database: process.env.DATABASE, 
    password: process.env.PASSWORD, 
    host: process.env.HOST, 
    max: 10,
    port:process.env.PORT, 
};

module.exports = config

