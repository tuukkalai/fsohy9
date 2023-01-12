import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

interface ExerciseCalculatorPost {
  daily_exercises: Array<number>;
  target: number;
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.weight) throw new Error("Parameter 'weight' is missing");
  if (!req.query.height) throw new Error("Parameter 'height' is missing");

  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) throw new Error("Provided values were not numbers");

  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseCalculatorPost;
  if ( !daily_exercises || !target ) {
    return res.status(400).json({ error: 'Training details or target missing.'});
  }
  daily_exercises.splice(0,0,target);
  const result = calculateExercises(daily_exercises);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App listening port ${PORT}`);
});
