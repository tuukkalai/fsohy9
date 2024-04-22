import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import {
  Alert,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props {
  onCancel: () => void;
  onSubmit: (patient: Patient, values: EntryWithoutId) => void;
  error?: string;
  patient: Patient;
}

const AddEntryForm = ({ onCancel, onSubmit, error, patient }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(-1);
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    switch (entryType) {
      case "HealthCheck":
        const healthCheckEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "HealthCheck" as "HealthCheck",
          healthCheckRating,
        };
        onSubmit(patient, healthCheckEntry);
        break;
      case "OccupationalHealthcare":
        const occupationalHealthcareEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare" as "OccupationalHealthcare",
          employerName,
          startDate,
          endDate,
        };
        onSubmit(patient, occupationalHealthcareEntry);
        break;
      case "Hospital":
        const hospitalEntry = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type: "Hospital" as "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        onSubmit(patient, hospitalEntry);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ border: "1px dashed #666", padding: "20px", margin: "10px 0" }}>
      <select
        name="entryType"
        id="entryType"
        onChange={(e) => setEntryType(e.target.value)}
      >
        <option value="HealthCheck">Health Check</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
        <option value="Hospital">Hospital</option>
      </select>
      {error && <Alert severity="error">{error}</Alert>}
      {entryType && (
        <form onSubmit={handleFormSubmit}>
          <FormControl margin="normal" fullWidth>
            <TextField
              margin="normal"
              variant="outlined"
              label="Description"
              required={true}
              id="description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="date"
              label="Date"
              required={true}
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="specialist"
              label="Specialist"
              required={true}
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              margin="normal"
              variant="outlined"
              id="diagnosisCodes"
              label="Diagnosis Codes"
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
            />
            {entryType === "HealthCheck" && (
              <TextField
                margin="normal"
                variant="outlined"
                id="healthCheckRating"
                label="Health Check Rating"
                required={true}
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(Number(target.value))}
              />
            )}
            {entryType === "OccupationalHealthcare" && (
              <>
                <TextField
                  margin="normal"
                  variant="outlined"
                  id="employerName"
                  label="Employer Name"
                  value={employerName}
                  required={true}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  id="startDate"
                  label="Start Date"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  id="endDate"
                  label="End Date"
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                />
              </>
            )}
            {entryType === "Hospital" && (
              <>
                <TextField
                  margin="normal"
                  variant="outlined"
                  id="dischargeDate"
                  label="DischargeDate"
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  id="dischargeCriteria"
                  label="DischargeCriteria"
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </>
            )}
          </FormControl>
          <ButtonGroup variant="contained">
            <Button type="submit" startIcon={<Add />} color="primary">
              Add
            </Button>
            <Button color="error" onClick={() => onCancel()}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};

export default AddEntryForm;
