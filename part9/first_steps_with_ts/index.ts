/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;

  if (weight && height) {
    const data = {
      weight: Number(weight),
      height: Number(height),
      bmi: bmiCalculator(Number(height), Number(weight)),
    };

    res.status(200).json(data);
  } else {
    res.status(404).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const checkNaN = (num: any): boolean => isNaN(Number(num));

  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" }).status(400);
  } else if ((isNaN(Number(target))) || (daily_exercises.find(checkNaN))) {
    res.send({ error: "malformatted parameters" }).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const stats = calculateExercises(daily_exercises, target);

  res.status(200).json(stats);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});