/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Diagnosis, HealthCheckRating, Discharge, SickLeave, NewPatient, Gender } from './types';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from './types';

////////////////////////////////
// General
////////////////////////////////

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

////////////////////////////////
// Patient 
////////////////////////////////

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown, 
  occupation: unknown
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) { throw new Error("Incorrect or missing name " + name); }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isSSN = (ssn: string): boolean => {
  const firstPart = ssn.substring(0, 6);
  const firstValid = firstPart.split("").every(digit => !isNaN(Number(digit)));
  // console.log(firstPart, firstValid);

  const dash = ssn.substring(6, 7); 
  const dashValid = dash === "-";
  // console.log(dash, dashValid);

  const lastPart = ssn.substring(7);
  const lastValid = lastPart.split("").every(alpha => /\w/.test(alpha));
  // console.log(lastPart, lastValid);

  return firstValid && dashValid && lastValid;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing social security number " + ssn);
  }

  return ssn;
};

const isGender = (gender: any): gender is Gender => Object.values(Gender).includes(gender);
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation " + occupation);
  }

  return occupation;
};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFields): NewPatient => ({
  name: parseName(name),
  dateOfBirth: parseDate(dateOfBirth),
  ssn: parseSSN(ssn),
  gender: parseGender(gender),
  occupation: parseOccupation(occupation),
});


////////////////////////////////
// Entry
////////////////////////////////

interface EntryFields {
  id: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  type: unknown,
  healthCheckRating?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown
}

const parseStringField = (value: unknown): string => {
  if (!value || !isString(value)) { throw new Error("Incorrect or missing value " + value); }
  return value;
};

const isDiagnosisCodes = (diagnosisCodes: any): diagnosisCodes is Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes)) { return false; }
  if (diagnosisCodes.some((v) => typeof v !== "string")) { return false; }
  return true;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)) { 
    throw new Error(`Missing or invalid diagnosis codes`);
  }
  return diagnosisCodes;
};

const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const parseHealthCheckRating = (healthRating: unknown): HealthCheckRating => {
  if (!healthRating || !isHealthCheckRating(healthRating)) {
    throw new Error(`Missing or invalid health rating`);
  }
  return healthRating;
};

const isDischarge = (value: any): value is Discharge => {
  if (!value.date || !isString(value.date) || !value.criteria || !isString(value.criteria)) { 
    return false;
  }
  return true;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) { 
    throw new Error(`Missing or invalid discharge`);
  }
  return discharge;
};

const isSickLeave = (value: any): value is SickLeave => {
  if (!value.startDate || !isDate(value.startDate) || !value.endDate || isDate(value.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error(`Invalid or missing sick leave`);
  }
  return sickLeave;
};

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)) {
    throw new Error(`Invalid or missing employer name!`);
  }
  return employer;
};

export const toNewEntry = ({ 
  id, description, date, specialist, diagnosisCodes, type, healthCheckRating,
  discharge, employerName, sickLeave
}: EntryFields): Entry => {
  const validId = parseStringField(id);
  const validDescription = parseStringField(description);
  const validDate = parseDate(date);
  const validSpecialist = parseStringField(specialist);
  const validDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  // const validType = parseStringField(id);

  switch (type) {
    case "HealthCheck":
      const validHealthCheckRating = parseHealthCheckRating(healthCheckRating);
      const healthEntry: HealthCheckEntry = { 
        id: validId,
        description: validDescription,
        date: validDate, 
        specialist: validSpecialist, 
        diagnosisCodes: validDiagnosisCodes,
        type: "HealthCheck", 
        healthCheckRating: validHealthCheckRating
      };
      return healthEntry;
    case "Hospital":
      const validDischarge = parseDischarge(discharge);
      const hospitalEntry: HospitalEntry = { 
        id: validId,
        description: validDescription,
        date: validDate, 
        specialist: validSpecialist, 
        diagnosisCodes: validDiagnosisCodes,
        type: "Hospital", 
        discharge: validDischarge
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const validEmployerName = parseEmployer(employerName);
      const occupationalEntry: OccupationalHealthcareEntry = { 
        id: validId,
        description: validDescription,
        date: validDate, 
        specialist: validSpecialist, 
        diagnosisCodes: validDiagnosisCodes,
        type: "OccupationalHealthcare", 
        employerName: validEmployerName
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sickLeave ? occupationalEntry.sickLeave = parseSickLeave(sickLeave) : "ignore";
      return occupationalEntry;
    default: 
      throw new Error("Unknown type of entry: " + type);
  }
};
