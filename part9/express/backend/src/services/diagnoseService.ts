import diagnoses from '../../data/diagnoses';
import type { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };



