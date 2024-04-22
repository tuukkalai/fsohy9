import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientServices.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientServices.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientServices.addPatient(newPatient);

  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const entryIn = toNewEntry(req.body);
    const newEntry = patientServices.addEntry(req.params.id, entryIn);
    res.json(newEntry);
  } catch (e: unknown) {
    let errorMsg = "Something went wrong.";
    if (e instanceof Error) {
      errorMsg += " Error: " + e.message;
    }
    res.status(500).send(errorMsg);
  }
});

export default router;
