export type Diagnose = {
  code: string,
  name: string,
  latin?: string
};

export enum Gender { 
  Male = "male",
  Female = "female",
  Other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender, 
  occupation: string,
  entries: Entry[]
};

export type NewPatient = Omit<Patient, "id" | "entries">;
export type PatientWithoutSSN = Omit<Patient, "ssn">;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;