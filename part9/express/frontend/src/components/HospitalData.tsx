import { HospitalEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalData = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <p>{entry.date} {<LocalHospitalIcon />}</p>
      <p><i>{entry.description}</i></p>
      <p>Diagnosed by {entry.specialist}</p>
    </>
  );
};

export default HospitalData;