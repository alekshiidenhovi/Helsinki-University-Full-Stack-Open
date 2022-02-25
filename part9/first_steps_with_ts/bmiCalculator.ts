// interface BMIInputs {
//   height: number;
//   weight: number;
// }

// const parseEntries = (args: Array<string>): BMIInputs => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

export default function bmiCalculator(height: number, weight: number) {
  const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100
    const BMI: number = weight / (heightInMeters**2)
    if (BMI >= 25) {
      return "High (overweight)"
    } else if (BMI >= 18.5) {
      return "Normal (healthy weight)"
    } else {
      return "Low (underweight)"
    }
  }

  console.log(`Ex 9.1: ${calculateBmi(180, 74)}`)

  return calculateBmi(height, weight)

  // try {
  //   console.log(`Ex 9.3: ${calculateBmi(height, weight)}`)

  // } catch (error: unknown) {
  //   let errorMessage = 'Something bad happened.'
  //   if (error instanceof Error) {
  //     errorMessage += ' Error: ' + error.message;
  //   }
  //   console.log(errorMessage);
  // }
}
