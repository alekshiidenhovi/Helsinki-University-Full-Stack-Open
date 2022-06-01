import express from 'express';
import cors from 'cors';

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.status(200).send("PONG");
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});