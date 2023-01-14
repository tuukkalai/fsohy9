import patientsData from '../../data/patients.json';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<NonSensitivePatient> = patientsData as Array<NonSensitivePatient>;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientData = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatientData);
  return newPatientData;
};

export default {
  getPatients,
  addPatient
};