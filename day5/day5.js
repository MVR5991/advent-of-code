import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

const mappedInput = input.map(line => line.split(' ->').map(part => part.split(',')).map(coordinatePair => ({
    x: parseInt(coordinatePair[0]),
    y: parseInt(coordinatePair[1])
})));
console.log(mappedInput)

const maxX = Math.max(...mappedInput.map(line => Math.max(...line.map(coordinate => coordinate.x))));
const maxY = Math.max(...mappedInput.map(line => Math.max(...line.map(coordinate => coordinate.y))));

console.log(maxX)
console.log(maxY)

const emptyArray = Array.from({length: maxX + 1}, () => Array.from({length: maxY + 1}, () => 0));

console.log(emptyArray)

for (const pairs of mappedInput) {
    const localMinX = Math.min(...pairs.map(coordinate => coordinate.x));
    const localMaxX = Math.max(...pairs.map(coordinate => coordinate.x));
    const localMinY = Math.min(...pairs.map(coordinate => coordinate.y));
    const localMaxY = Math.max(...pairs.map(coordinate => coordinate.y));


    if((pairs[0].x !== pairs[1].x) && (pairs[0].y !== pairs[1].y)) {

        const x1 = pairs[0].x;
        const y1 = pairs[0].y;
        const x2 = pairs[1].x;
        const y2 = pairs[1].y;

        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
            const x = x1 > x2 ? x1 - i : x1 + i
            const y = y1 > y2 ? y1 - i : y1 + i
            emptyArray[y][x]++
        }
        continue;
    }

    console.log(pairs)
    for (let x = localMinX; x <= localMaxX; x++) {
        for (let y = localMinY; y <= localMaxY; y++) {
                emptyArray[y][x] += 1;
        }
    }

}

let overlaps = 0;
for(let x = 0; x < emptyArray.length; x++) {
    for(let y = 0; y < emptyArray[x].length; y++) {
        if(emptyArray[y][x] > 1) {
            overlaps+=1;
        }
    }
}

console.log(overlaps)