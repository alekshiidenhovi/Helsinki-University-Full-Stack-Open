import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, updatePatient } from '../state';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import PickEntry from '../components/PickEntry';

const PatientPage = () => {
  
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  // const [patient, setPatient] = useState<Patient | undefined>();
  
  useEffect(() => {
    const fetchCurrentPatient = async (): Promise<void> => {
      try {
        const { data: currentPatient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(currentPatient));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchCurrentPatient();
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const patient = state.patients[`${id}`];
  // console.log(state.patients)
  // console.log(id)
    
  if (patient) {
    return (
      <div className="patient-container">
        <div className="patient-info">
          <h2>{patient.name} {patient.gender}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
        <div className="entry-container">
          <h2>Entries</h2>
          <div className="entries">
            {patient.entries.map((entry, id) => 
              <div key={id} className="box">
                <PickEntry entry={entry} />
                {entry.diagnosisCodes ?
                  <ul>
                  {entry.diagnosisCodes.map((code, idx) => {
                    const diagnosis = state.diagnoses[code]?.name;
                    return <li key={idx}>{code} {diagnosis ? diagnosis : ""}</li>;
                  })}
                  </ul> :
                  <></>
                }
              </div>
            )}
          </div>
        </div>
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