require('dotenv').config()
// const config = {
//     user: process.env.USER, 
//     database: process.env.DATABASE, 
//     password: process.env.PASSWORD, 
//     host: process.env.HOST, 
//     max: 10,
//     port:process.env.DB_PORT, 
// };

exports.config = {
    user: process.env.USER_LOCAL, 
    database: process.env.DATABASE_LOCAL, 
    password: process.env.PASSWORD_LOCAL, 
    host: process.env.HOST_LOCAL, 
    max: 10,
    port:process.env.DB_PORT_LOCAL, 
};

exports.configMongo ={
    uri:process.env.MONGO_URI
}


