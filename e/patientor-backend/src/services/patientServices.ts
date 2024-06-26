import patientsData from "../../data/patients-full";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientData = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry,
    entries: [],
  };
  patients.push(newPatientData);
  return newPatientData;
};

const addEntry = (patient_id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatient(patient_id);
  if (!patient) {
    throw new Error(`No patient found with id: ${patient_id}`);
  }
  const newEntry: Entry = {
    id: uuidv4(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
