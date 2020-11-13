import  {verify } from 'jsonwebtoken'
// require('dotenv').config()

exports.isLogin = async (req , res, next ) => {
    try {
        console.log("\n ===== trying to verify if the user IS login ==== \n");
        let [verified, verifiedErr] =  await to ( verify( req.headers.token, process.env.SECRET_KEY))
        if (verifiedErr) throw new Error (verifiedErr)

        req.role = verified.role
        return next()
        
    } catch (error) {
        console.log(chalk.red( `Error occured: ${error}`))
        return res.status(400).json({
            status: 400,
            message:'Error user verification'
        })
    }
}
//   function isLogin(req,res,next){
//     console.log('ISLOGIN ==============')
//     jwt.verify(req.headers.token, process.env.SECRET_KEY,(err,decoded)=>{
//       if(!err){
//         req.role = decoded.role
//         next()
//       }
//       else{
//         res.send(err)
//       }
//     })
//   }
exports.isAdmin = (req, res, next) =>{
    console.log(`\n ===== checking if USER is ADMIN ==== \n`);
    if(req.role === 'admin') return next()
    return res.status(401).json({
        status:401,
        message:' User NOT an ADMIN'
    })
}

exports.isDoctor = (req,res,next) =>{
    console.log(`\n ===== checking if USER is DOCTOR ==== \n`);
    if(req.role === 'admin') return next()
    return res.status(401).json({
        status:401,
        message:' User NOT a DOCTOR'
    })
}

exports.isSuperUser = (req,res, next =>{
    if(req.role === 'super_user') return next()
    return res.status(401).json({
        status:401,
        message:' User DOES NOT have SUPER_USER authority '
    })
})
