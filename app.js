import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';
import inpatientsRoutes from './Routes/inpatients'
import medicalRecordsRoutes from './Routes/medicalRecord'
import doctorRoutes from './Routes/doctors'

const app = express()
const port = 3000
require('dotenv').config();


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const DATABASE_URL = process.env.POSTGRES_URL;


app.get('/provisions/api/v1/', (req, res) => res.send('Hello Perovisions!'))
app.use('/provisions/api/v1/inpatients', inpatientsRoutes)
app.use('/provisions/api/v1/doctors', doctorRoutes)
app.use('/provisions/api/v1/medicalRecord', medicalRecordsRoutes)


app.listen(port, () => console.log(
    chalk.blue(`Example app listening on port  ${chalk.yellow(port)}!`)
))

