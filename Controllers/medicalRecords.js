import dbConfig from '../dbConfig'
import {Pool, Client} from'pg'
import chalk from 'chalk'
import to from '../Helper/to'
import queryPool from './query'


exports.getAll = async (req, res)=>{
    const pool = new Pool(dbConfig)
    const queryString = 'select * from medicalrecord ORDER BY medicalrecord_id ASC';
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [resultAllMedicalRecord, resultAllMedicalRecordErr] = await to(conn.query(queryString))
        if(resultAllMedicalRecordErr) throw resultAllMedicalRecordErr

        let response = { status: 200, message:'success', queryName:"All MedicalRecord", data: resultAllMedicalRecord.rows}
        res.status(200).json(response)

    }catch(e){
        console.error(chalk.red('error getAll: ', e))
        return res.status(400).json({msg:'error getAlld', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
};


exports.create = async(req,res)=>{
    const pool = new Pool(dbConfig)
    // const queryString = ``;
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")

        let [createMedicalRecord, createMedicalRecordErr] = await to(
            conn.query(
                queryPool.insertMedicalRecord,
                queryPool.insertMedicalRecordValue(req.body)
                )
            )
        if(createMedicalRecordErr) throw createMedicalRecordErr
        
        let rawData  = createMedicalRecord.rows[0]
        let doctorName = `${rawData.firstname} ${rawData.middlename} ${rawData.lastname}`
        let currentCountpatientnumber = rawData.countpatientnumber
        let arrDataInserted = rawData.i.slice(1,-1).split(',') //["3", "1", "1", "2018-03-19", "110", "100", "normal", "36", "GI"]
        let dataResponse = {
            doctorname : doctorName,
            currentCountpatientnumber : currentCountpatientnumber,
            consultDate: arrDataInserted[3],
            bloodPressure: arrDataInserted[4],
            bpmNumber: arrDataInserted[5],
            pupil: arrDataInserted[6],
            temperature: arrDataInserted[7],
            polyclinic: arrDataInserted[8]
        }
        let response = { status: 201 , message:'success', queryName:"insert MedicalRecord", postData:{dataResponse},
        data: createMedicalRecord}
        res.status(201).json( response)

    }catch(e){
        console.error(chalk.red('error createMedicalRecord: ', e))
        return res.status(400).json({msg:'error createMedicalRecord', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}


exports.getId = async (req,res)=>{
    const pool = new Pool(dbConfig)
    const queryString = `select * from medicalrecord where medicalrecord_id = $1`;
    const queryValue = [req.params.id]
    console.log('query: ', queryString)
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [singleMedicalRecord, singleMedicalRecordErr] = await to(
            conn.query(
                queryString, queryValue
                )
            )
        if(singleMedicalRecordErr) throw singleMedicalRecordErr

        if (singleMedicalRecord.rows.length === 0) return res.status(404).json({msg: 'medical record not found'}) 
        let response = { status: 200, message:'success', queryName:"MedicalRecordbyId", data: singleMedicalRecord.rows[0]}
        return res.status(200).json(response)
        // res.send(req.params.id)

    } catch (e){
        console.error(chalk.red('error MedicalRecord getById: ', e))
        return res.status(400).json( {msg:'error MedicalRecord getById', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}


exports.remove = async(req,res)=>{
    const pool = new Pool(dbConfig)
    // const queryString = `delete from doctor where medicalrecord_id = ${req.params.id}`;
    const medicalRecordId = req.params.id
    const queryString = queryPool.removeMedicalRecords
    const queryValue = [medicalRecordId,medicalRecordId]
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [deleteMedicalRecord, deleteMedicalRecordErr] = await to(
            conn.query(
                queryString,queryValue
                )
                )
        if(deleteMedicalRecordErr) throw deleteMedicalRecordErr

        let response = { status: 201, queryName:"deleteMedicalRecord", data: deleteMedicalRecord}
        res.status(201).json(response)

    }catch(e){
        console.error(chalk.red('error deleteMedicalRecord: ', e.toString()))
        return res.status(400).json({msg:'error deleteMedicalRecord', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}




exports.getDateRangePolyclinic = async(req,res) =>{
    // let objValueMedicalRecordDataRange ={dateFrom:req.body.dateFrom, dateTo:req.body.dateTo}
    // let objValueMedicalRecordDataRangePolyclinic = {polyclinic: req.body.polyclinic, dateFrom: req.body.dateFrom, dateTo:req.body.dateTo}
    let arrValueMedicalRecordDataRange =[req.body.dateFrom, req.body.dateTo]
    let arrValueMedicalRecordDataRangePolyclinic = [req.body.polyclinic, req.body.dateFrom, req.body.dateTo]
    const pool = new Pool(dbConfig)
    // const queryString = `delete from doctor where medicalrecord_id = ${req.params.id}`;
    let conn;
    console.log("ini req.body: ", req.body)
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr) throw connErr
        // console.log('conn: ', conn)
        console.log(arrValueMedicalRecordDataRangePolyclinic)
        let queryString;
        let queryValue;

        if (!req.body.polyclinic || req.body.polyclinic === ""){
            queryString = queryPool.queryMedicalRecordDateRange
            queryValue = queryPool.queryMedicalRecordDateRangeValue(req.body) 
        } else{
            queryString = queryPool.queryMedicalRecordDateRangePolyclinic
            queryValue = queryPool.queryMedicalRecordDateRangePolyclinicValue(req.body) 
        }

        console.log('queryString: ', queryString)
        console.log('=============================================')
        console.log('queryValue: ', arrValueMedicalRecordDataRangePolyclinic)

        let getDateRangePolyclinic,getDateRangePolyclinicErr;
        [getDateRangePolyclinic, getDateRangePolyclinicErr] = await to(
            conn.query(
                queryString, 
                queryValue
                )
            )
        if (getDateRangePolyclinicErr) throw getDateRangePolyclinicErr
 
        let arrPolycinic = new Array()
        getDateRangePolyclinic.rows.forEach( (e, i, a) =>{
            // console.log('element: ', e.polyclinic)
            arrPolycinic.push(e.polyclinic)
        })
        let objResponse = {
            polyclinic: (req.body.polyclinic)? req.body.polyclinic: arrPolycinic,
            consult_total: `${getDateRangePolyclinic.rows[0].count} times`,
            ab_bloodtype : `${getDateRangePolyclinic.rows[0].bloodtype_ab} times`,
            a_bloodtype : `${getDateRangePolyclinic.rows[0].bloodtype_a} times`,
            b_bloodtype : `${getDateRangePolyclinic.rows[0].bloodtype_b} times`,
            o_bloodtype : `${getDateRangePolyclinic.rows[0].bloodtype_o} times`
        }
        let response = {status: 201, msg: 'success get data based data and/or polyclinic', data: objResponse}
        return res.status(201).json(response)

    }catch(e){
        console.error(chalk.red('error get data based data and/or polyclinic: ', e.toString()))
        return res.status(400).json({msg:'error get data based data and/or polyclinic', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}

