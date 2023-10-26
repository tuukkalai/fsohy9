import patientsData from '../../data/patients-full';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: []
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientData = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry,
    entries: []
  };
  patients.push(newPatientData);
  return newPatientData;
};

export default {
  getPatients,
  getPatient,
  addPatient
};