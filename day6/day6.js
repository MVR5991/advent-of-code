import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

const population = input[0].split(',').map(Number)

const generationsArray = Array.from({ length: 9 }, (v, i) => population.filter((n) => n === i).length);

for(let x = 0; x < 256; x++) {
   const newZeroes = generationsArray.shift()
    generationsArray[6]+=newZeroes
    generationsArray.push(newZeroes)
}

const generations = Array.from({ length: 9 }, (v, i) => population.filter((n) => n === i).length);

function generate() {
    console.log(generations)
    const zeroes = generations.shift();
    generations[6] += zeroes;
    generations.push(zeroes)
}

for (let i = 0; i < 256; i++) generate();

console.log(generations.reduce((acc, v) => acc + v, 0));
console.log(generationsArray.reduce((acc, v) => acc + v, 0));
