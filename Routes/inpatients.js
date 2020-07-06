import express from 'express'
import chalk from 'chalk';
import inpatientsController from '../Controllers/inpatients'
const router = express.Router()


router.get('/', inpatientsController.getAll
); //get inpatients
router.post('/', inpatientsController.create )//post new inpatients
router.get('/:id', inpatientsController.getId)
router.delete('/:id', inpatientsController.remove);
router.put('/:id', inpatientsController.updateInpatientById);

export default router