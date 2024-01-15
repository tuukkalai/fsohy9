import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Diagnosis, Gender, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import axios from "axios";
import { Divider, List, ListItemText, Typography } from "@mui/material";

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

  const ListEntries: React.FC = () => {
    if (patient?.entries?.length === 0)
      return <Typography variant="h5">No entries</Typography>;

    return (
      <>
        {patient?.entries && <Typography variant="h5">Entries</Typography>}
        <List dense>
          {patient?.entries?.map((e) => (
            <React.Fragment key={e.id}>
              <ListItemText primary={e.date} secondary={e.description} />
              {e.diagnosisCodes && (
                <List
                  style={{ marginTop: "0" }}
                  dense
                  sx={{ listStyleType: "disc", marginLeft: "1.5em" }}
                >
                  {e.diagnosisCodes?.map((d) => {
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
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </>
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
          <Typography variant="body1" gutterBottom></Typography>
          <List dense>
            <ListItemText primary={`SSN: ` + patient.ssn} />
            <ListItemText primary={`Occupation: ` + patient.occupation} />
          </List>
          <ListEntries />
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
