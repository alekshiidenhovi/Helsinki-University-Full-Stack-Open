import { NewPatient, Gender } from './types';

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown, 
  occupation: unknown,
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

const parseDOB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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


const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => ({
  name: parseName(name),
  dateOfBirth: parseDOB(dateOfBirth),
  ssn: parseSSN(ssn),
  gender: parseGender(gender),
  occupation: parseOccupation(occupation),
});

export default toNewPatientEntry;