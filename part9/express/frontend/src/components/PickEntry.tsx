import React from 'react';
import { Entry } from '../types';
import HospitalData from './HospitalData';
import HealthCheckData from './HealthCheckData';
import OccupationalHealthcareData from './OccupationalHealthcareData';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PickEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalData entry={entry} />;
    case "HealthCheck":
      return <HealthCheckData entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareData entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default PickEntry;