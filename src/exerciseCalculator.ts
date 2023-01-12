interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface TrainingData {
  trainingDetails: Array<number>;
  target: number;
}

const calculateExercises = (argv: Array<number>): Result => {
  console.log(argv);
  const { trainingDetails, target } = parseArgs(argv);
  const trainingDays: number = trainingDetails.filter(dailyHours => dailyHours > 0).length;
  const average: number = trainingDetails.reduce((p, c) => p + c / trainingDetails.length, 0);

  return {
    periodLength: trainingDetails.length,
    trainingDays,
    success: average > target ? true : false,
    rating: average >= target ? 3 : average >= target / 2 ? 2 : 1,
    ratingDescription: average >= target ? "Well done!" : average >= target / 2 ? "Not too bad but could be better" : "Goal was not met",
    target,
    average
  };
};

const parseArgs = (input: Array<number>): TrainingData => {
  const target = Number(input.shift());
  const trainingDetails: Array<number> = [];
  input.forEach(n => {
    if (isNaN(Number(n))) throw new Error("Not all training values are numbers");
    trainingDetails.push(Number(n));
  });
  return {
    trainingDetails,
    target
  };
};

if (process.argv[0].indexOf("ts-node") > -1) {
  if (process.argv.length > 4) throw new Error("Too few arguments");
  const args = process.argv.slice(2);
  const input: Array<number> = [];
  args.forEach(e => {
    if (!isNaN(Number(e))) {
      input.push(Number(e));
    } else {
      throw new Error("Value for target or exercise details was not number!");
    }
  });
  console.log(calculateExercises(input));
};

export default calculateExercises;