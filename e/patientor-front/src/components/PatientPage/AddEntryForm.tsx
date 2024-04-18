import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import { Alert, Button, ButtonGroup, FormControl, TextField, Typography } from "@mui/material";
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
  const [healthCheckRating, setHealthCheckRating] = useState<number>(-1);

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newEntry: EntryWithoutId = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating
    };
    onSubmit(patient, newEntry);
  };

  return (
    <div style={{ border: "1px dashed #666", padding: "20px", margin: "10px 0" }}>
      <Typography variant="h5">New HealthCheck entry</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleFormSubmit}>
        <FormControl margin="normal" fullWidth>
          <TextField
            margin="normal"
            variant="outlined"
            label="Description"
            id="description"
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="date"
            name="date"
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="specialist"
            name="specialist"
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="diagnosisCodes"
            name="diagnosisCodes"
            label="Diagnosis Codes"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="healthCheckRating"
            name="healthCheckRating"
            label="Health Check Rating"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          />
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
    </div>
  );
};

export default AddEntryForm;
