import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import { Card, CardContent, List, ListItemText, Typography } from "@mui/material";
import HealthRatingBar from "../HealthRatingBar";

const PatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
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
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const GenderIcon: React.FC = () => {
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

  return (
    <div>
      {patient && (
        <>
          <Typography variant="h4" style={{ marginTop: "1em" }}>
            {patient.name}
            {` `}
            {patient.gender !== Gender.Other && <GenderIcon />}
          </Typography>
          <Typography variant="body1" gutterBottom></Typography>
          <List dense>
            <ListItemText primary={`SSN: ` + patient.ssn} />
            <ListItemText primary={`Occupation: ` + patient.occupation} />
          </List>
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
