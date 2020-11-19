import  {verify } from 'jsonwebtoken'
import chalk from 'chalk'
import to from '../Helper/to'
// require('dotenv').config()

exports.verified = async (req , res, next ) => {
    try {
        console.log("\n ===== trying to verify if the user IS login ==== \n");
        let isVerified = await verify(req.headers.token, process.env.SECRET_KEY)
        req.verified = isVerified
        console.log(`==== user verified ====`);
        return next()
        
    } catch (error) {
        console.log(chalk.red( `Error isLogin occured: ${error}`))
        return res.status(401).json({
            status: 401,
            message:`Error user verification: ${error.toString()}`
        })
    }
}

exports.isAdmin = (req, res, next) =>{
    console.log(`\n ===== checking if USER is ADMIN ==== \n`);
    if(req.verified.role === 'admin') return next()
    return res.status(401).json({
        status:401,
        message:' User NOT an ADMIN'
    })
}

exports.isDoctor = (req,res,next) =>{
    console.log(`\n ===== checking if USER is DOCTOR ==== \n`);
    if(req.verified.role === 'admin') return next()
    return res.status(401).json({
        status:401,
        message:' User NOT a DOCTOR'
    })
}

exports.isSuperUser = (req,res, next) =>{
    if(req.verified.role === 'super_user') return next()
    return res.status(401).json({
        status:401,
        message:' User DOES NOT have SUPER_USER authority '
    })
}
