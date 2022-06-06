import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareData = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <>
      <p>{entry.date} {<WorkIcon />} {entry.employerName} </p>
      <p><i>{entry.description}</i></p>
      <p>Diagnosed by {entry.specialist}</p>
      {entry.sickLeave ? 
      <p>Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> :
      <></>
      }
    </>
  );
};

export default OccupationalHealthcareData;