import User from '../ModelMongo/User'
import bcrypt, { genSalt } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import to from '../Helper/to'
import chalk from 'chalk'


exports.getAll = async ( req,res )=> {
    try {
        let [Users, UsersErr]= await to( User.find( {}, {password:0}).lean().exec() )
        
        if (UsersErr) throw UsersErr

        return res.status(200).json({message:'success_retrieve_user', data: Users})
    } catch (error) {
        console.log( chalk.red( `\n ==== Error Get All Users: ${error} ====\n` ));
        return res.status(400).json({
            message:'Error Get All Users',
            error: error.toString()
        })
    }
}

exports.getById = async(req, res) => {
    try {
        let [oneUser, oneUserErr] = await to ( User.findOne ( {_id:req.params.id},{password:0} ).lean().exec() )
        if (oneUserErr) throw new Error ('User not Found')

        return res.status(200).json({ message: `success_retrieve_one_user_id : ${req.params.id}`, data: oneUser} )
        
    } catch (error) {
        console.log(chalk.red ( `\n ==== Error Get One User ${error} ==== \n` ));
        return res.status(404).json({message:'Error get One user', error: error.toString()})
    }
}

exports.addUser = async (req,res) => {
    try {
        let saltRounds = 10
        let[genSalt,genSaltErr] = await to ( bcrypt.genSalt(saltRounds) )
        if (genSaltErr) throw new Error ('Error generate salt')

        let [hash, hashErr] = await to ( bcrypt.hash( req.body.password, genSalt) )
        if (hashErr) throw hashErr
        req.body.password = hash

        let [newUser, newUserErr] = await to ( User.create( req.body) )
        if (newUserErr) throw newUserErr

        return res.status(201).json({message:'successfully created', data: newUser})
    } catch (error) {
        console.log( chalk.red ( `\n ==== Error Add User : ${error} ==== \n`));
        return res.status(400).json({message: 'Error add User', error:error.toString()})
    }
}

exports.updateUser = async (req, res) => {
    try {
        if(!req.body.password|| req.body.password == '') throw new Error ('Password not filled')

        let saltRounds = 10
        let[genSalt,genSaltErr] = await to ( bcrypt.genSalt(saltRounds) )
        if (genSaltErr) throw new Error ('Error generate salt')
        let [hash, hashErr] = await to ( bcrypt.hash( req.body.password, genSalt) )
        if (hashErr) throw hashErr
        req.body.password = hash 

        let condition = {_id:req.params.id}
        let updatedUser = req.body
        let updateOption = {useFindAndModify:false}

        let [newUser, newUserErr] = await to ( User.findOneAndUpdate( condition, {$set:updatedUser}, updateOption).exec() )
        if (newUserErr) throw newUserErr
        
        return res.status(200).json({message:'successfully updated', data: newUser})
    } catch (error) {
        console.log( chalk.red ( `\n ==== Error Update User : ${error} ==== \n`));
        return res.status(400).json({message: 'Error update User', error:error.toString()})
    }
}

exports.removeUser = async (req, res) => {
    try {
        let [removedUser, removedUserErr] =  await to ( User.remove ( { _id: req.params.id}).exec() )
        if (removedUserErr) throw new Error ('User not Found')

        return res.status(204).json({message:'successfully removed user', data: removedUser})
        
    } catch (error) {
        console.log(chalk.red ( `\n ==== Error Remove User ${error} ==== \n` ));
        return res.status(404).json({message:'Error Remove user', error: error.toString()})
    }
}

exports.login = async(req, res) =>{
    console.log(`\n ===== USER LOGIN ==== \n`);
    try {
        // monggose modes.method().lean() 
        // lean() size about 1x smaller than without lean()
        // downside: check the doc
        let [userLogin, userLoginErr] = await to( User.findOne ({username:req.body.username}).lean().exec() )
        if (userLoginErr) throw userLoginErr

        let [passwordTrue, passwordErr] = await to ( bcrypt.compare(req.body.password, userLogin.password) )
        if (passwordErr) {
            return res.status(400).json({
                message: 'wrong password'
            })

        } else if(passwordTrue){
            let token = sign({
                id       : userLogin._id,
                username : userLogin.username,
                email    : userLogin.email,
                role     : userLogin.role
            }, process.env.SECRET_KEY)
            return res.status(200).json({
                message:'login success',
                token: token
            })
        }
    } catch (error) {
        console.log(
            chalk.red(`\n ===== THERE IS ERROR LOGIN ==== \n `, error)
        )        
        return res.status(404).json({
            message: error.toString(),
        })
    }
}