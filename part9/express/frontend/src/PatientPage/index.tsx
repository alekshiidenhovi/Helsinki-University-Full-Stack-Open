import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, updatePatient } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage = () => {
  
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  // const [patient, setPatient] = useState<Patient | undefined>();
  
  useEffect(() => {
    const fetchCurrentPatient = async (): Promise<void> => {
      try {
        const { data: currentPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // setPatient(currentPatient);
        dispatch(updatePatient(currentPatient));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchCurrentPatient();
  }, [dispatch]);

  const patient = state.patients[`${id}`]
  // console.log(state.patients)
  // console.log(id)
    
  if (patient) {
    return (
      <div>
        <h2>{patient.name} {patient.gender}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Patient not found</h2>
      </div>
    );
  }
};

export default PatientPage;