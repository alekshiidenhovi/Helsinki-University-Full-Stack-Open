import express from 'express';
import patientService from '../services/patientService';
import type { Entry, NewPatient } from '../types';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    throw new Error(`Patient not found`);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const entry: Entry = toNewEntry(req.body);

  if (!patient) {
    throw new Error(`Patient not found`);
  } else if (!entry) {
    throw new Error(`Entry not found`);
  } else {
    const newEntry: Entry = patientService.addNewEntry(patient, entry);
    res.json(newEntry);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry: NewPatient = toNewPatientEntry(req.body);

    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;