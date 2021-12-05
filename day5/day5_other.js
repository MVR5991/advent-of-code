import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

const numbers = input
    .map((line) => line.split(' -> ').map((d) => d.split(',').map(Number)))

let grid = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
)

numbers.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            grid[y][x1]++
        }
    } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            grid[y1][x]++
        }
    } else {
        for (let i = 0; i <= Math.abs(x1 - x2); i++) {
            const x = x1 > x2 ? x1 - i : x1 + i
            const y = y1 > y2 ? y1 - i : y1 + i
            grid[y][x]++
        }
    }
})

console.log(
    grid.reduce((count, row) => count + row.filter((num) => num > 1).length, 0)
)