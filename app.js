import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import inpatientsRoutes from './Routes/inpatients'
import medicalRecordsRoutes from './Routes/medicalRecord'
import doctorRoutes from './Routes/doctors'
import usersRoutes from './Routes/users'
import { configMongo } from './dbConfig'
import mongoose from 'mongoose'
import to from './Helper/to'

const app = express()
const port = process.env.PORT || 3000
require('dotenv').config();

const mongo_connect = async () =>{
    try {
        let [mongoConnect, mongoConnectErr] = await to (mongoose.connect(configMongo.uri, { useNewUrlParser: true }, { useUnifiedTopology: true }) );
        if (mongoConnectErr) throw mongoConnectErr
        if (mongoConnect) console.log(chalk.green(`\n ==== mongo connected ====\n`));
    } catch (error) {
        console.log(chalk.red(`Error: ${error}`))
    }
}


mongo_connect()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get('/provisions/api/v1/', (req, res) => res.send('Hello Perovisions!'))
app.use('/provisions/api/v1/inpatients', inpatientsRoutes)
app.use('/provisions/api/v1/doctors', doctorRoutes)
app.use('/provisions/api/v1/medicalRecord', medicalRecordsRoutes)
app.use('/provisions/api/v1/users', usersRoutes)



app.listen(port, () => console.log(
    chalk.blue(`Example app listening on port  ${chalk.yellow(port)}!`),
    
))

module.exports = app

