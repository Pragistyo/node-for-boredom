import express from 'express'
import usersController from '../Controllers/users'
import { verified, isSuperUser } from '../Helper/jwtAuth'
const router = express.Router()


router.get('/', usersController.getAll); 
router.post('/', verified, isSuperUser, usersController.addUser);
router.put('/:id',verified, isSuperUser, usersController.updateUser)
router.get('/:id', usersController.getById);
router.delete('/:id', usersController.removeUser);

router.post('/login', usersController.login)
router.get('/userDataCommon', verified, usersController.isLogin)

export default router