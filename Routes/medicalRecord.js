import express from 'express'
import chalk from 'chalk';
import medicalRecordsController from '../Controllers/medicalRecords'
const router = express.Router()


router.get('/', medicalRecordsController.getAll); //get All MedicalRecord
router.post('/',medicalRecordsController.create )//post new MedicalRecord
router.get('/:id', medicalRecordsController.getId)
// router.put('/:id', );
router.delete('/:id', medicalRecordsController.remove);
router.post('/byDate/Polyclinic', medicalRecordsController.getDateRangePolyclinic)


export default router