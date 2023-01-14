import patientsData from '../../data/patients.json';
import { NonSensitivePatient } from '../types';

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

export default {
  getPatients
};