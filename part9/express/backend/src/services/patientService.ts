/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';
import type { Entry, Patient, NewPatient, PublicPatient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getPatients = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addNewPatient = ( newPatient: NewPatient ): Patient => {
  const newPatientEntry: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(), 
    entries: [],
    ...newPatient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = ( patient: Patient, entry: Entry ): Entry => {
  const idx = patients.findIndex(obj => obj.id === patient.id);
  patients[idx].entries.push(entry);
  return entry;
};

export default { addNewEntry, getPatients, getPatientById, addNewPatient };



