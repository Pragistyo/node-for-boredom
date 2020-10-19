const {Pool} = require('pg');
const dbConfig = require('./dbConfig')
const to = require('./Helper/to')
const chalk = require('chalk')

const pool = new Pool(dbConfig);

const seedData = require('./seedData') // bentuknya obj of array seed
const seedInpatients = seedData.inpatients
const seedDoctors = seedData.doctors
console.log('seedInpatientsArr: ', seedInpatients.length)
console.log('\n ================================================================================ \n')
console.log('seedDoctors: ', seedDoctors.length)
const seedInpatientsDataCount = seedInpatients.length

const queryInsertInpatiens = (param)=>{
    return `
    INSERT INTO inpatient
    (inpatient_id, firstname,middlename,lastname,mobilenumber, gender ,address1, address2, state, city, zipcode, birthplace, birthday, bloodtype)
    VALUES 
    (DEFAULT, '${param.firstname}','${param.middlename}','${param.lastname}','${param.mobilenumber}','${param.gender}','${param.address1}','${param.address2}',
        '${param.state}','${param.city}', '${param.zipcode}', '${param.birthplace}', '${param.birthday}','${param.bloodtype}');`
}

const queryInsertDoctors = (param)=>{
    return `
    INSERT INTO doctor
    (doctor_id, firstname,middlename,lastname,mobilenumber, gender ,address1, address2, state, city, zipcode, birthplace, birthday, 
        nik, specialization ,certificate, datecertification, countpatientnumber)
    VALUES 
    (DEFAULT, '${param.firstname}','${param.middlename}','${param.lastname}','${param.mobilenumber}','${param.gender}','${param.address1}','${param.address2}',
        '${param.state}','${param.city}', '${param.zipcode}', '${param.birthplace}', '${param.birthday}',
        '${param.nik}', '${param.specialization}','${param.certificate}','${param.datecertification}', '${param.countpatientnumber}');`
}


const initSeedDB = async () => {
    let conn;
    try{
        [conn, connError] = await to(pool.connect())
        if (connError) throw new Error ('open connection')

        let now;
        [now, nowErr] = await to(conn.query('SELECT NOW()'));
        if (nowErr) throw nowErr.toString()
        console.log(now.rows)

        console.log('insert inpatien: \n: ', queryInsertInpatiens(seedInpatients[0]))
        console.log('insert doctors: \n: ', queryInsertDoctors(seedDoctors[0]))

        // note to using pg-promise to multiple insert with nodejs-postgre. 
        // featured sqlinjection-prevention
        // featured transaction-like insert, if 1 fail, any other set fail to insert


        // below manually insert
        let [seedDbInPatients, seedDbInPatientsErr] = await to(conn.query( queryInsertInpatiens(seedInpatients[0]) ))
        if (seedDbInPatientsErr) throw seedDbInPatientsErr.toString()
        console.log(seedDbInPatients)
        // let [seedDbDoctors, seedDbDoctorsErr] = await to(conn.query( queryInsertDoctors(seedDoctors[2]) ))
        // if (seedDbDoctorsErr) throw seedDbDoctorsErr.toString()
        // console.log(seedDbDoctors)

    }catch(err){
        console.error('error seeding users: ', err)
    }finally{
        try{
          if(conn) await pool.end()
          console.log('Connection closed');
          
        }catch(e){ console.log('Error close conn: ',e); }
      }
}

initSeedDB()
