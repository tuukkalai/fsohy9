import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.weight) throw new Error("Parameter 'weight' is missing");
  if (!req.query.height) throw new Error("Parameter 'height' is missing");

  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) throw new Error("Provided values were not numbers");

  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
