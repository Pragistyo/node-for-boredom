import express from 'express'
import usersController from '../Controllers/users'
import { isLogin, isSuperUser } from '../Helper/jwtAuth'
const router = express.Router()


router.get('/', usersController.getAll); 
router.post('/', isLogin, isSuperUser, usersController.addUser);
router.put('/:id',isLogin, isSuperUser, usersController.updateUser)
router.get('/:id', usersController.getById);
router.delete('/:id', usersController.removeUser);

router.post('/login', usersController.login)

export default router