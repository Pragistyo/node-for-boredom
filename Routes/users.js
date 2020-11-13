import express from 'express'
import usersController from '../Controllers/users'
const router = express.Router()


router.get('/', usersController.getAll); 
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser)
router.get('/:id', usersController.getById);
router.delete('/:id', usersController.removeUser);

router.post('/login', usersController.login)

export default router