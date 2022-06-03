/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';
import type { Patient, NewPatient, PatientWithoutSSN } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addNewPatient = ( newPatient: NewPatient ): Patient => {
  const newPatientEntry: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(), 
    ...newPatient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addNewPatient };



