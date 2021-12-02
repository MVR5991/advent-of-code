import {readTextFile} from "../utils/utils.js";

const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
    forward: 'forward',
}

const input = readTextFile('input.txt');

const mappedInput = input.map(line => {
    return line.split(" ")
})

console.log(mappedInput)

// const result = mappedInput.reduce((acc, curr) => {
//     const [direction, distance] = curr;
//     if(direction === DIRECTIONS.UP) {
//         acc.depth =  acc.depth - parseInt(distance);
//     } else if(direction === DIRECTIONS.DOWN) {
//         acc.depth = acc.depth  + parseInt(distance);
//     } else if(direction === DIRECTIONS.forward) {
//         acc.horizontalPos = acc.horizontalPos + parseInt(distance);
//     }
//     return acc;
// }, {
//    horizontalPos: 0,
//    depth: 0
// })

// console.log(result)
// console.log(result.horizontalPos * result.depth)

const resultPart2 = mappedInput.reduce((acc, curr) => {
    const [direction, distance] = curr;
    if(direction === DIRECTIONS.UP) {
        acc.aim = acc.aim - parseInt(distance);
    } else if(direction === DIRECTIONS.DOWN) {
        acc.aim = acc.aim + parseInt(distance);
    } else if(direction === DIRECTIONS.forward) {
        acc.horizontalPos = acc.horizontalPos + parseInt(distance);
        acc.depth = acc.depth + acc.aim * parseInt(distance);
    }
    return acc;
}, {
    horizontalPos: 0,
    depth: 0,
    aim: 0
})

console.log(resultPart2)
console.log(resultPart2.horizontalPos * resultPart2.depth)