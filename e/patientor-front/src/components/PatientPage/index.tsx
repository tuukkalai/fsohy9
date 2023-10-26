import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import axios from "axios";

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
          <h1>{patient.name}{` `}{patient.gender !== Gender.Other && <GenderIcon />}</h1>
          <p>SSN: {patient.ssn}<br />Occupation: {patient.occupation}</p>
        </>
      )}
      {!patient && <p>Loading</p>}
    </div>
  );
};

export default PatientPage;
