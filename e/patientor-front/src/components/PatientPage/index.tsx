import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from "../../types";

import HealthRatingBar from "../HealthRatingBar";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Add from "@mui/icons-material/Add";

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  List,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const PatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [newEntryModal, setNewEntryModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(-1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("This one should run only when patient id changes");
    const getPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getOne(id);
          setPatient(patient);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            console.error(e.response.data);
          }
        }
      }
    };
    void getPatient();
  }, [id]);

  useEffect(() => {
    console.log("This one should run only once");
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const GenderIcon: React.FC = () => {
    // TODO: Gender selection missing "Other"
    if (patient?.gender === Gender.Male) {
      return <MaleIcon />;
    }
    return <FemaleIcon />;
  };

  const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if ("discharge" in entry) {
      return (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {entry.date}
              {` `}
              <LocalHospitalIcon />
            </Typography>
            <Typography variant="h5" component="div">
              {entry.description}
            </Typography>
            <Typography variant="body1">
              {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
            {entry.diagnosisCodes && (
              <List
                style={{ marginTop: "0" }}
                dense
                sx={{ listStyleType: "disc", marginLeft: "1.5em" }}
              >
                {entry.diagnosisCodes?.map((d) => {
                  const diagnosis = diagnoses.find(
                    (diagnosis) => diagnosis.code === d
                  )?.name;
                  return (
                    <ListItemText
                      style={{ marginTop: "0" }}
                      key={d}
                      primary={d}
                      secondary={diagnosis}
                      sx={{ display: "list-item" }}
                    />
                  );
                })}
              </List>
            )}
            <Typography variant="body1">Diagnosed by: {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if ("employerName" in entry) {
      return (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {entry.date}
              {` `}
              <WorkIcon />
              {` `}
              {entry.employerName}
            </Typography>
            <Typography variant="h5" component="div">
              {entry.description}
            </Typography>
            {entry.diagnosisCodes && (
              <List
                style={{ marginTop: "0" }}
                dense
                sx={{ listStyleType: "disc", marginLeft: "1.5em" }}
              >
                {entry.diagnosisCodes?.map((d) => {
                  const diagnosis = diagnoses.find(
                    (diagnosis) => diagnosis.code === d
                  )?.name;
                  return (
                    <ListItemText
                      style={{ marginTop: "0" }}
                      key={d}
                      primary={d}
                      secondary={diagnosis}
                      sx={{ display: "list-item" }}
                    />
                  );
                })}
              </List>
            )}
            <Typography variant="body1">Diagnosed by: {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if ("healthCheckRating" in entry) {
      return (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              {entry.date}
              {` `}
              <AccessTimeIcon />
            </Typography>
            <Typography variant="h5" component="div">
              {entry.description}
            </Typography>
            {entry.diagnosisCodes && (
              <List
                style={{ marginTop: "0" }}
                dense
                sx={{ listStyleType: "disc", marginLeft: "1.5em" }}
              >
                {entry.diagnosisCodes?.map((d) => {
                  const diagnosis = diagnoses.find(
                    (diagnosis) => diagnosis.code === d
                  )?.name;
                  return (
                    <ListItemText
                      style={{ marginTop: "0" }}
                      key={d}
                      primary={d}
                      secondary={diagnosis}
                      sx={{ display: "list-item" }}
                    />
                  );
                })}
              </List>
            )}
            <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
            <Typography variant="body1">Diagnosed by: {entry.specialist}</Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  };

  const ListEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const NewEntryModal = () => {
    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newEntry: EntryWithoutId = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating,
      };
      console.log(newEntry);
      const en = patientService.createEntry(newEntry);
      console.log(en);
    };

    return (
      <div style={{ border: "1px dashed #666", padding: "20px", margin: "10px 0" }}>
        <Typography variant="h5">New HealthCheck entry</Typography>
        <form onSubmit={handleFormSubmit}>
          <FormControl margin="normal" fullWidth>
            <TextField
              margin="normal"
              variant="outlined"
              id="description"
              name="description"
              label="Description"
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="date"
              name="date"
              label="Date"
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="specialist"
              name="specialist"
              label="Specialist"
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="diagnosiscodes"
              name="diagnosiscodes"
              label="Diagnosis Codes"
              onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="healthcheckrating"
              name="healthcheckrating"
              label="Health Check Rating"
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            />
          </FormControl>
          <ButtonGroup variant="contained">
            <Button type="submit" startIcon={<Add />} color="primary">
              Add
            </Button>
            <Button color="error" onClick={() => console.log("Cancel pressed")}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    );
  };

  return (
    <div>
      {patient && (
        <>
          <Typography variant="h4" style={{ marginTop: "1em" }}>
            {patient.name}
            {` `}
            {patient.gender !== Gender.Other && <GenderIcon />}
          </Typography>
          <List dense>
            <ListItemText primary={`SSN: ` + patient.ssn} />
            <ListItemText primary={`Occupation: ` + patient.occupation} />
          </List>
          <Button variant="contained" onClick={() => setNewEntryModal(!newEntryModal)}>
            Add new entry
          </Button>
          {newEntryModal && <NewEntryModal />}
          {patient.entries?.length === 0 ? (
            <Typography variant="h5">No entries</Typography>
          ) : (
            <>
              <Typography variant="h5">Entries</Typography>
              <List dense>
                {patient.entries?.map((e) => (
                  <ListEntry key={e.id} entry={e} />
                ))}
              </List>
            </>
          )}
        </>
      )}
      {!patient && (
        <Typography variant="body1" style={{ marginTop: "1em" }}>
          Loading
        </Typography>
      )}
    </div>
  );
};

export default PatientPage;

function assertNever(entry: never): never {
  throw new Error("Invalid entry detail.");
}
