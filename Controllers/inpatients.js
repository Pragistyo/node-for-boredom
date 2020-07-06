console.log('controllers inpatients')
import dbConfig from '../dbConfig'
import {Pool, Client} from'pg'
import chalk from 'chalk'
import to from '../helper/to'
import queryPool from './query'


exports.getAll = async (req, res)=>{
    const pool = new Pool(dbConfig)
    const queryString = 'select * from inpatient ORDER BY inpatient_id ASC';
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [resultAllInpatients, resultAllInpatientsErr] = await to(conn.query(queryString))
        if(resultAllInpatientsErr) throw resultAllInpatientsErr.toString()

        let response = { status: 200, message:'success', queryName:"All Inpatients", data: resultAllInpatients.rows}
        res.status(200).json(response)

    }catch(e){
        console.error(chalk.red('error getAll: ', e))
        return res.status(400).json({msg:'error getAll', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
};







exports.create = async (req,res)=>{
    const pool = new Pool(dbConfig)
    let conn;
    
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")

        let [createInpatient, createInpatientErr] = await to(conn.query(queryPool.insertInpatiens(req.body)))
        if(createInpatientErr) throw createInpatientErr.toString()
        
        let response = { status: 201 , message:'success', queryName:"insert Inpatient", created: createInpatient}
        res.status(201).json( response)

    } catch (e){
        console.error('error create Inpatient: ', e)
        return res.status(400).json( {status:400, msg: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}




exports.updateInpatientById = async(req,res)=>{
    const pool = new Pool(dbConfig)
        let conn;
        
        try{
            let connErr;
            [conn, connErr] = await to(pool.connect())
            if(connErr)  throw new Error("Error Connection Pool")

            let [updateInpatient, updateInpatientErr] = await to(conn.query(queryPool.updateInpatient(req.body)))
            if(updateInpatientErr) throw updateInpatientErr.toString()
            
            let response = { status: 201 , message:'success', queryName:"update Inpatient", updated: updateInpatient}
            res.status(201).json( response)

        } catch (e){
            console.error('error update Inpatient: ', e)
            return res.status(400).json( {status:400, msg: e, errMsg: e.toString()})
        } finally {
            try{
                if (conn) await to(conn.end()); 
                console.log('Connection closed');
    
            }catch(e){ console.log('Error close conn: ',e) }
        }
}



exports.getId = async(req,res)=>{
    const pool = new Pool(dbConfig)
    const queryString = `select * from inpatient where inpatient_id = ${req.params.id}`;

    let conn;
    
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [singleInpatient, singleInpatientErr] = await to(conn.query(queryString))
        console.log(singleInpatient)
        if(singleInpatientErr) throw singleInpatientErr

        if (singleInpatient.rows.length === 0 ) return res.status(404).json({msg: 'data not found'})
        let response = { status: 200, message:'success', queryName:"InpatientbyId", data: singleInpatient.rows[0]}
        res.status(200).json( response)

    } catch (e){
        console.error(chalk.red('error getById Inpatient: ', e))
        return res.status(400).json( {msg:'error getById Inpatient', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}


exports.remove = async(req,res)=>{
    const pool = new Pool(dbConfig)
    const queryString = `delete from inpatient where inpatient_id = ${req.params.id}`;
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [deleteInpatient, deleteInpatientErr] = await to(conn.query(queryString))
        if(deleteInpatientErr) throw deleteInpatientErr

        let response = { status: 200, queryName:"deleteInpatient", data: deleteInpatient}
        res.status(200).json(response)
        // res.send(queryString)

    }catch(e){
        console.error(chalk.red('error deleteInpatient: ', e))
        res.json ({msg:'error deleteInpatient', error: e, errMsg: e.toString()})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}