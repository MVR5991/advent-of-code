import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

// const input = ['00100',
//     '11110',
//     '10110',
//     '10111',
//     '10101',
//     '01111',
//     '00111',
//     '11100',
//     '10000',
//     '11001',
//     '00010',
//     '01010']

const gammaRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const epsilonRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// const gammaRate = [0, 0, 0, 0, 0]
// const epsilonRate = [0, 0, 0, 0, 0]

const mappedInput = input.map(line => {
    const numberAsArray = Array.from(String(line), Number);
    numberAsArray.forEach((number, index) => {
        if (number === 0) {
            gammaRate[index] += 1;
            epsilonRate[index] -= 1;
        } else {
            gammaRate[index] -= 1;
            epsilonRate[index] += 1;
        }
    });
});

const calculateGammaAndEpsilonRate = (inputNumbers) => {
    const gammaRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const epsilonRate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // const gammaRate = [0, 0, 0, 0, 0]
    // const epsilonRate = [0, 0, 0, 0, 0]
    inputNumbers.map(line => {
        const numberAsArray = Array.from(String(line), Number);
        numberAsArray.forEach((number, index) => {
            if (number === 1) {
                gammaRate[index] += 1;
                epsilonRate[index] -= 1;
            } else {
                gammaRate[index] -= 1;
                epsilonRate[index] += 1;
            }
        });
    });
    return {
        gammaRate,
        epsilonRate
    }
}

const newCalculated = calculateGammaAndEpsilonRate(input);

const gammaBinary = newCalculated.gammaRate.map(number => number > 0 ? 1 : 0).join('');
const epsilonBinary = newCalculated.epsilonRate.map(number => number > 0 ? 1 : 0).join('');

const gammaDecimal = parseInt(gammaBinary, 2);
const epsilonDecimal = parseInt(epsilonBinary, 2);


console.log(gammaDecimal)
console.log(epsilonDecimal)

console.log(gammaDecimal * epsilonDecimal)

const getOxygenRating = (numbers, index = 0) => {
    const newGammaRate = calculateGammaAndEpsilonRate(numbers).gammaRate;
    let valueToCompareWith = 0;
    if(newGammaRate[index] >= 0){
        valueToCompareWith = 1
    }
    if (numbers.length === 1) {
        console.log(index)
        return numbers[0];
    }
    const newArray = numbers.filter((number) => parseInt(number[index]) === valueToCompareWith);

    return getOxygenRating(newArray, index + 1);
}
//111001111010

const getScrubberRating = (numbers, index = 0) => {
    const newEpsilonRate = calculateGammaAndEpsilonRate(numbers).epsilonRate;
    let valueToCompareWith = 1;
    if(newEpsilonRate[index] <= 0){
        valueToCompareWith = 0
    }
    if (numbers.length === 1) {
        console.log(index)
        return numbers[0];
    }
    const newArray = numbers.filter((number) => parseInt(number[index]) === valueToCompareWith);

    return getScrubberRating(newArray, index + 1);
}

const oxygenRes = getOxygenRating(input)
console.log(oxygenRes)
const scrubberRes = getScrubberRating(input)
console.log(scrubberRes)

const oxygenDecimal = parseInt(oxygenRes, 2);
const scrubberDecimal = parseInt(scrubberRes, 2);

console.log(oxygenDecimal)
console.log(scrubberDecimal)

console.log(oxygenDecimal * scrubberDecimal)
