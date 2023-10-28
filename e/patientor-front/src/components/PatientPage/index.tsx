import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import axios from "axios";
import { Divider, List, ListItemText, Typography } from "@mui/material";

const PatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>();
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
    }
    void getPatient();
  }, [id]);

  const GenderIcon = () => {
    if (patient?.gender === Gender.Male){
      return <MaleIcon />;
    }
    return <FemaleIcon />;
  }


  return (
    <div>
      {patient && (
        <>
          <Typography variant="h4" style={{ marginTop: "1em" }}>{patient.name}{` `}{patient.gender !== Gender.Other && <GenderIcon />}</Typography>
          <Typography variant="body1" gutterBottom></Typography>
          <List dense>
            <ListItemText primary={`SSN: ` + patient.ssn} />
            <ListItemText primary={`Occupation: ` + patient.occupation} />
          </List>
          {patient.entries && <Typography variant="h5">Entries</Typography>}
          <List dense>
          {patient.entries?.map(e => (
            <>
              <ListItemText key={e.id} primary={e.date} secondary={e.description} />
              {e.diagnosisCodes && (
                <List style={{ marginTop: "0" }} dense sx={{ listStyleType: "disc", marginLeft: "1.5em" }}>
                  {e.diagnosisCodes?.map(d => (
                    <ListItemText style={{ marginTop: "0" }} key={d} primary={d} sx={{ display: "list-item" }} />
                  ))}
                </List>
              )}
              <Divider />
            </>
          ))}
          </List>
        </>
      )}
      {!patient && <Typography variant="body1" style={{ marginTop: "1em" }}>Loading</Typography>}
    </div>
  );
};

export default PatientPage;
