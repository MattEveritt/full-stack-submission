interface Hours {
    targetHours: number;
    hours: Array<number>;
}

interface ExerciseInfo {
    numDays: number;
    numTrainingDays: number;
    originalTarget: number;
    averageTime: number;
    targetReached: boolean;
    rating: number;
    valueExplanation: string;
}

const parseArguments = (args: Array<string>): Hours => {

    if (args.length < 3) throw new Error('no hours');
    const target = parseInt(args[2]);
    args.splice(0,2);
    const hours: Array<number> = args.map(a => parseInt(a));
    if (hours.filter(h => isNaN(h)).length > 0) throw new Error('input digits as hours');
    return {
        targetHours: target,
        hours: hours,
    };
};

export const calculateExercises = (targetHours: number, hours: Array<number> ): ExerciseInfo => {
    console.log(targetHours, hours);
    const numberTrainingDays = hours.filter(d => d !== 0).length;
    const averageTime = (hours.reduce((a,b) => a + b,0))/hours.length;
    const targetReached = averageTime < targetHours ? false : true;
    const rating = (averageTime < targetHours ? false : true) === true ? 3 : averageTime <= targetHours/2 ? 1 : 2;
    let valueExplanation;
    if (rating === 1) {
        valueExplanation = 'You got less than half the target hours on average';
    }   else if (rating === 2){
        valueExplanation = 'You didnt reach your target hours';
    } else {
        valueExplanation = 'You reached your target hours!';
    }

    return {
        numDays: hours.length,
        numTrainingDays: numberTrainingDays,
        originalTarget: targetHours,
        averageTime: averageTime,
        targetReached: targetReached,
        rating: rating,
        valueExplanation: valueExplanation,
    };
};

try {
    const { targetHours, hours } = parseArguments(process.argv);
    console.log(calculateExercises( targetHours, hours));
  } catch ({ message}) {
    console.log('Error, something bad happened, message: ', message);
  }
