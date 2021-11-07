import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const params = req.query;
  const height = parseInt(params.height as string);
  const weight = parseInt(params.weight as string);
  if (isNaN(height) || isNaN(weight)) res.send({ error: "malformatted parameters"});
  const bmiResult = calculateBmi(height, weight);
  res.send({
    weight: weight,
    height: height,
    bmi: bmiResult
  });
});

interface Hours {
  hours: Array<number>;
  targetHours: number;
}

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Hours = req.body;
  const targetHours = body.targetHours;
  const hours = body.hours;

  if(!targetHours || hours.length < 1) {
    res.send({ error: 'parameters missing'});
  }

  if (isNaN(targetHours) || hours.filter(h => isNaN(h)).length >= 1) {
    res.send({ error: 'malformatted parameters'});
  }

  const values = calculateExercises(targetHours, hours);

  res.send({
    periodLength: values.numDays,
    trainingDays: values.numTrainingDays,
    succes: values.targetReached,
    rating: values.rating,
    ratingDescription: values.valueExplanation,
    target: values.originalTarget,
    average: values.averageTime,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});