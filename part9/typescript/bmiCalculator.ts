interface CalculateValues {
    height: number,
    weight: number,
}

export const calculateBmi = (height: number, weight: number): string => {
    
    const bmi = (weight/(height*height))*10000;

    if( bmi <= 17 ) {
        return 'underweight';
    } else if ( bmi <= 24) {
        return 'Healthy weight';
    } else if ( bmi <= 29) {
        return 'Overweight';
    } else if ( bmi <= 39) {
        return 'Obese';
    } else {
        return 'Severely obese';
    }
};

const parseArgs = (args: Array<string>): CalculateValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

  try {
    const { height, weight } = parseArgs(process.argv);
    calculateBmi(height, weight);
  } catch ({ message }) {
    console.log('Error, something bad happened, message: ', message);
  }