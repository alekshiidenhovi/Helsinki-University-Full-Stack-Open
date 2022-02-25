import express from 'express';
import bmiCalculator from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  let { weight, height } = req.query

  if (weight && height) {
    const data = {
      weight: Number(weight),
      height: Number(height),
      bmi: bmiCalculator(Number(height), Number(weight)),
    }

    res.status(200).json(data)
  } else {
    res.status(404).json({ error: "malformatted parameters" })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})