interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodDays: number = hours.length
  const totalTrainingHours: number = hours.reduce((acc, hour) => acc + hour, 0)
  const targetHours = periodDays * target
  const modifiedSigmoidRating =  2 / (1 + Math.pow(Math.E, totalTrainingHours / targetHours - 1)) + 1

  return {
    periodLength: periodDays,
    trainingDays: hours.filter(hour => hour > 0).length,
    success: totalTrainingHours >= targetHours,
    rating: modifiedSigmoidRating,
    ratingDescription: "Rating scale 1-3, higher is better",
    target,
    average: totalTrainingHours / periodDays
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))