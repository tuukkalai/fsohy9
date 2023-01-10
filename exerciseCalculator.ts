interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating?: number;
  ratingDescription?: string;
  target?: number;
  average?: number;
}

const calculateExercises = (trainingDetails:Array<number>, target:number): Result => {
  let trainingDays:number = trainingDetails.filter(dailyHours => dailyHours > 0).length;
  let average:number = trainingDetails.reduce((p, c) => p + c / trainingDetails.length, 0);

  return {
    periodLength: trainingDetails.length,
    trainingDays: trainingDays,
    success: average > target ? true : false,
    rating: average >= target ? 3 : average >= target / 2 ? 2 : 1,
    ratingDescription: average >= target ? "Well done!" : average >= target / 2 ? "Not too bad but could be better" : "Goal was not met",
    target: target,
    average: average
  }
}

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2));