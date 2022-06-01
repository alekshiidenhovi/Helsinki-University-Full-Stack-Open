import diagnoses from '../../data/diagnoses';
import type { Diagnose } from '../types';

const getItems = (): Diagnose[] => {
  return diagnoses;
};

export default { getItems };



