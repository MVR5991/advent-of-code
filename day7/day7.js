import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

const crabPositions = input[0].split(',').map(Number)

// calculate median of the array
const median = (values) => {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    } else {
        return (values[half - 1] + values[half]) / 2.0;
    }
}

const calculateFuelConsumption = (array, position) => {
    return array.reduce((acc, curr) => {
        acc += Math.abs(curr - position)
        return acc;
    }, 0)
}

const calculateFuelConsumptionIncreasingByDistance = (array, position) => {
    return array.reduce((acc, curr) => {
        const  distance = Math.abs(curr - position)
        const res = (distance * (distance+1)) / 2;
        return acc + res;
    }, 0)
}

const maxPosition = Math.max(...crabPositions);
const minPosition = Math.min(...crabPositions);

let lowestFuelConsumption = 99999999999999999999;
let position;

for(let i = minPosition; i <= maxPosition; i++) {
    const fuelConsumption = calculateFuelConsumptionIncreasingByDistance(crabPositions, i);
    if(fuelConsumption < lowestFuelConsumption) {
        lowestFuelConsumption = fuelConsumption;
        position = i;
    }
}

console.log(lowestFuelConsumption, position);

