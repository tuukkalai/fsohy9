import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (patient: Patient, object: EntryWithoutId) => {
  const entry = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patient.id}/entries`,
    object
  );
  console.log("new entry created", entry);
  const newPatient = await getOne(patient.id);
  return newPatient;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getOne,
  getAll,
  create,
  createEntry,
};
