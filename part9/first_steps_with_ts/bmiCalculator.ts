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

console.log(calculateBmi(180, 74))