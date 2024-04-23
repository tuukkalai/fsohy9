import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Patient, HealthCheckRating, enumKeys } from "../../types";
import {
  Alert,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

interface Props {
  onCancel: () => void;
  onSubmit: (patient: Patient, values: EntryWithoutId) => void;
  error?: string;
  patient: Patient;
  diagnosisCodes: string[];
}

const AddEntryForm = ({ onCancel, onSubmit, error, patient, diagnosisCodes }: Props) => {
  const today = new Date();
  const todayParsed =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate();
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(todayParsed);
  const [specialist, setSpecialist] = useState<string>("");
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<string>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    switch (entryType) {
      case "HealthCheck":
        const healthCheckEntry = {
          description,
          date,
          specialist,
          diagnosisCodes: selectedDiagnosisCodes,
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
          diagnosisCodes: selectedDiagnosisCodes,
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
          diagnosisCodes: selectedDiagnosisCodes,
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

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof selectedDiagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ border: "1px dashed #666", padding: "20px", margin: "10px 0" }}>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="entry-type-select-label" shrink={true}>
          Entry Type
        </InputLabel>
        <Select
          name="entryType"
          labelId="entry-type-select-label"
          id="entryType"
          value={entryType}
          onChange={(e) => setEntryType(e.target.value)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
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
              InputLabelProps={{ shrink: true }}
              type="date"
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
            <FormControl margin="normal" fullWidth>
              <InputLabel id="diagnosis-select-label">Diagnosis Codes</InputLabel>
              <Select
                variant="outlined"
                id="diagnosisCodes"
                labelId="diagnosis-select-label"
                label="Diagnosis Codes"
                multiple
                value={selectedDiagnosisCodes}
                onChange={handleDiagnosisCodesChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {diagnosisCodes.map((c) => (
                  <MenuItem key={c} value={c}>
                    <Checkbox checked={selectedDiagnosisCodes.indexOf(c) > -1} />
                    <ListItemText primary={c} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {entryType === "HealthCheck" && (
              <FormControl margin="normal" fullWidth>
                <InputLabel id="healthcheck-select-label">Health Check Rating</InputLabel>
                <Select
                  id="healthCheckRating"
                  labelId="healthcheck-select-label"
                  label="Health Check Rating"
                  required={true}
                  value={healthCheckRating}
                  onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                >
                  {enumKeys(HealthCheckRating).map((rating) => (
                    <MenuItem key={rating} value={HealthCheckRating[rating]}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="startDate"
                  label="Start Date"
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  type="date"
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
                  InputLabelProps={{ shrink: true }}
                  type="date"
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
