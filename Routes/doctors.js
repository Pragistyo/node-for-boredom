import express from 'express'
import chalk from 'chalk';
import doctroController from '../Controllers/doctors'
const router = express.Router()


router.get('/', doctroController.getAll); 
router.post('/', doctroController.create);
router.patch('/:id', doctroController.updateDoctorById)
router.get('/:id', doctroController.getId);
router.delete('/:id', doctroController.remove);

export default router