interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface HourInputs {
  target: number;
  hours: Array<number>
}

const parseArguments = (args: Array<string>): HourInputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [first, second, ...entries] = args
  for (const entry of entries) {
    if (isNaN(Number(entry))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const [target, ...hours] = entries
  return {
    target: Number(target),
    hours: hours.map(num => Number(num))
  } 
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodDays: number = hours.length;
  const totalTrainingHours: number = hours.reduce((acc, hour) => acc + hour, 0);
  const targetHours = periodDays * target;
  const modifiedSigmoidRating =  2 / (1 + Math.pow(Math.E, totalTrainingHours / targetHours - 1)) + 1;

  return {
    periodLength: periodDays,
    trainingDays: hours.filter(hour => hour > 0).length,
    success: totalTrainingHours >= targetHours,
    rating: modifiedSigmoidRating,
    ratingDescription: "Rating scale 1-3, higher is better",
    target,
    average: totalTrainingHours / periodDays
  };
};


// Ex 9.2
console.log(`Ex 9.2:`, calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// Ex 9.3
try {
  const { target, hours } = parseArguments(process.argv)
  console.log(`Ex 9.3:`, calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}