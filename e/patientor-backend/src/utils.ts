import {
  Diagnosis,
  Gender,
  EntryWithoutId,
  NewPatient,
  SickLeave,
  BaseEntryWithoutId,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing string");
  }
  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing sickLeave: " + sickLeave);
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  } as SickLeave;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((h) => Number(h))
    .includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error("Incorrect or missing healthCheckRating: " + healthCheckRating);
  }
  return healthCheckRating as HealthCheckRating;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };

  return newPatient;
};

// type EntryFields = {
//   description: unknown;
//   date: unknown;
//   specialist: unknown;
//   type: unknown;
//   diagnosisCodes: unknown;
//   employerName?: unknown;
//   sickLeave?: unknown;
// };

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const entry: BaseEntryWithoutId = {
      ...object,
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : undefined,
    };

    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          if (!object.discharge || typeof object.discharge !== "object") {
            throw new Error("Incorrect or missing data");
          }
          if ("date" in object.discharge && "criteria" in object.discharge) {
            return {
              ...entry,
              type: object.type,
              discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseString(object.discharge.criteria),
              },
            };
          }
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...entry,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          return {
            ...entry,
            employerName: parseString(object.employerName),
            type: "OccupationalHealthcare",
            sickLeave:
              "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
          };
        }
        break;
      default:
        throw new Error("Unknown type");
    }
  }
  throw new Error("Incorrect or missing data (newEntry)");
};
