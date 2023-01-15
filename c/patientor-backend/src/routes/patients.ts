import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatient from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientServices.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientServices.addPatient(newPatient);

  res.json(addedPatient);
});

export default router;