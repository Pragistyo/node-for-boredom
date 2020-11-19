const {Pool, Client} = require('pg')
const chalk = require('chalk')
const to = require('./Helper/to')
const {dbConfig} = require ('./dbConfig')

// console.log('DBconfig: ', dbConfig)
const pool = new Pool(dbConfig);


const queryCreateTableInpatients = `CREATE TABLE IF NOT EXISTS inpatient(
    inpatient_id SERIAL PRIMARY KEY, 
    firstname VARCHAR(100),
    middlename VARCHAR(100),
    lastname VARCHAR(100),
    mobilenumber VARCHAR(25),
    gender VARCHAR(25),
    address1 VARCHAR(100),
    address2 VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    zipcode VARCHAR(100),
    birthplace VARCHAR(100),
    birthday DATE, 
    bloodtype VARCHAR(2)
)`;
const queryCreateTableDoctors= `CREATE TABLE IF NOT EXISTS doctor(
    doctor_id SERIAL PRIMARY KEY, 
    firstname VARCHAR(100),
    middlename VARCHAR(100),
    lastname VARCHAR(100),
    mobilenumber VARCHAR(25),
    gender VARCHAR(25),
    address1 VARCHAR(100),
    address2 VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    zipcode VARCHAR(100),
    birthplace VARCHAR(100),
    birthday DATE , 
    nik VARCHAR(100),
    specialization VARCHAR(100),
    certificate VARCHAR(100),
    datecertification DATE,
    countpatientnumber INTEGER
)`;

const queryCreateTablemedicalRecords= ` CREATE TABLE IF NOT EXISTS medicalrecord(
    medicalrecord_id SERIAL PRIMARY KEY,
    inpatient_id integer REFERENCES inpatient (inpatient_id),
    doctor_id integer REFERENCES doctor (doctor_id),
    consultdate DATE NOT NULL,
    bloodpressure INTEGER,
    bpmnumber INTEGER,
    pupil VARCHAR (100),
    temperature DECIMAL(4,2),
    polyclinic VARCHAR(100)
)`


const initCreateDB = async ()=>{
  let conn;

  try{
    [conn, connErr] = await to(pool.connect())
    if(connErr) throw new Error('Error open connection')

    let now;
    [now, nowErr] = await to(conn.query('SELECT NOW()'));
    if (nowErr) throw Error ('Error NOW')
    console.log(now.rows)

    let createTableInpatients;
    [createTableInpatients, createTableInpatientsError] = await to(conn.query(queryCreateTableInpatients))
    if(createTableInpatientsError) throw new Error('Error create Table Inpatients')
    console.log(chalk.green('createTableUsers: ', createTableInpatients.command))

    let createTableDoctors;
    [createTableDoctors,createTableDoctorsError]= await to(conn.query(queryCreateTableDoctors))
    if(createTableDoctorsError) throw new Error('Error Create Table Doctors')
    console.log(chalk.green('createTableDoctors: ', createTableDoctors.command))

    let createMedicalRecords;
    [createMedicalRecords,createMedicalRecordsError]= await to(conn.query(queryCreateTablemedicalRecords))
    if(createMedicalRecordsError) throw new Error('Error Create Table MedicalRecords')
    console.log(chalk.green('createTableMedicalRecords: ', createMedicalRecords.command))

  }catch(err){
    console.error('ERROR CONNECT POOL: ', err)
  }finally{
    try{
      if(conn) await pool.end()
      console.log('Connection closed');
      
    }catch(e){ console.log('Error close conn: ',e); }
  }

}

 initCreateDB();