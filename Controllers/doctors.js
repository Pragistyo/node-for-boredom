console.log('controllers doctors')
import dbConfig from '../dbConfig'
import {Pool, Client} from'pg'
import chalk from 'chalk'
import to from '../Helper/to'
import queryPool from './query'

exports.getAll = async (req, res)=>{
    const pool = new Pool(dbConfig)
    const queryString = 'select * from doctor ORDER BY doctor_id ASC';
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [resultAllDoctors, resultAllDoctorsErr] = await to(conn.query(queryString))
        if(resultAllDoctorsErr) throw resultAllDoctorsErr

        let response = { status: 200, message:'success', queryName:"All Doctors", data: resultAllDoctors.rows}
        res.status(200).json(response)

    }catch(e){
        console.error(chalk.red('error getAll: ', e))
        return res.status(400).json({msg:'error getAllDoctors', error: e})
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
    
            let [createDoctor, createDoctorErr] = await to(conn.query(queryPool.insertInpatiens(req.body)))
            if(createDoctorErr) throw createDoctorErr
            
            let response = { status: 201 , message:'success', queryName:"insert Doctor", created: createDoctor}
            res.status(201).json( response)
    
        } catch (e){
            console.error('error create Doctor: ', e)
            return res.status(400).json( {status:400, msg: e})
        } finally {
            try{
                if (conn) await to(conn.end()); 
                console.log('Connection closed');
    
            }catch(e){ console.log('Error close conn: ',e) }
        }
}



exports.updateDoctorById = async(req,res)=>{
    const pool = new Pool(dbConfig)
        let conn;
        
        try{
            let connErr;
            [conn, connErr] = await to(pool.connect())
            if(connErr)  throw new Error("Error Connection Pool")

            let [updateDoctor, updateDoctorErr] = await to(conn.query(queryPool.updateDoctor(req.body, req.params.id)))
            if(updateDoctorErr) throw updateDoctorErr
            
            let response = { status: 201 , message:'success', queryName:"update Doctor", updated: updateDoctor}
            res.status(201).json( response)

        } catch (e){
            console.error('error update Doctor: ', e)
            return res.status(400).json( {status:400, msg: e})
        } finally {
            try{
                if (conn) await to(conn.end()); 
                console.log('Connection closed');
    
            }catch(e){ console.log('Error close conn: ',e) }
        }
}









exports.getId = async (req,res)=>{
    const pool = new Pool(dbConfig)
    const queryString = `select * from doctor where doctor_id = ${req.params.id}`;

    let conn;
    
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [singleDoctor, singleDoctorErr] = await to(conn.query(queryString))
        if(singleDoctorErr) throw singleDoctorErr

        if (singleDoctor.rows.length === 0 ) return res.status(404).json({msg: 'data not found'})
        let response = { status: 200, message:'success', queryName:"DoctorbyId", data: singleDoctor.rows[0]}
        res.status(200).json(response)

    } catch (e){
        console.error(chalk.red('error getById Doctor: ', e))
        return res.status(400).json( {msg:'error getById Doctor', error: e})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}


exports.remove = async(req,res)=>{
    const pool = new Pool(dbConfig)
    const queryString = `delete from doctor where doctor_id = ${req.params.id}`;
    let conn;
    try{
        let connErr;
        [conn, connErr] = await to(pool.connect())
        if(connErr)  throw new Error("Error Connection Pool")
        
        let [deleteDoctor, deleteDoctorErr] = await to(conn.query(queryString))
        if(deleteDoctorErr) throw deleteDoctorErr

        let response = { status: 200, queryName:"deleteDoctor", data: deleteDoctor}
        res.status(200).json(response)

    }catch(e){
        console.error(chalk.red('error deleteDoctor: ', e))
        return res.status(400).json({msg:'error deleteDoctor', error: e})
    } finally {
        try{
            if (conn) await to(conn.end()); 
            console.log('Connection closed');

        }catch(e){ console.log('Error close conn: ',e) }
    }
}