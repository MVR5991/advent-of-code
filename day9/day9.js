import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt')

const map = input.map(line => line.split('').map(Number))

const lowPoints  = [];

//find lowest points in map
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        const surroundingArea = {
            left: 99,
            above: 99,
            right: 99,
            below: 99,
        }
        const curPoint = map[y][x];

        if(x-1 >= 0) {
            surroundingArea.left = map[y][x-1]
        }
        if(y-1 >= 0) {
            surroundingArea.above = map[y-1][x]
        }
        if(x+1 < map[0].length) {
            surroundingArea.right = map[y][x+1]
        }
        if(y+1 < map.length) {
            surroundingArea.below = map[y+1][x]
        }
        if(surroundingArea.left > curPoint && surroundingArea.right > curPoint && surroundingArea.above > curPoint && surroundingArea.below > curPoint) {
            lowPoints.push({x: x, y:y, value: curPoint})
        }
    }
}

console.log(lowPoints)
console.log(lowPoints.map(point => point.value + 1).reduce((a,b) => a + b))

const getAdjacentHigherPoints = (point) => {
    const newAdjacentPoints = [];

    if(point.x-1 >= 0 && map[point.y][point.x-1] > point.value) {
        newAdjacentPoints.push({x: point.x-1, y:point.y, value: map[point.y][point.x-1]})
        newAdjacentPoints.push(...getAdjacentHigherPoints({x: point.x-1, y: point.y, value: map[point.y][point.x-1]}))
    }

    if(point.y-1 >= 0 && map[point.y-1][point.x] > point.value) {
        newAdjacentPoints.push({x: point.x, y:point.y-1, value: map[point.y-1][point.x]})
        newAdjacentPoints.push(...getAdjacentHigherPoints({x: point.x, y: point.y-1, value: map[point.y-1][point.x]}))
    }

    if(point.x+1 < map[0].length && map[point.y][point.x+1] > point.value) {
        newAdjacentPoints.push({x: point.x+1, y:point.y, value: map[point.y][point.x+1]})
        newAdjacentPoints.push(...getAdjacentHigherPoints({x: point.x+1, y: point.y, value: map[point.y][point.x+1]}))
    }

    if(point.y+1 < map.length && map[point.y+1][point.x] > point.value) {
        newAdjacentPoints.push({x: point.x, y:point.y+1, value: map[point.y+1][point.x]})
        newAdjacentPoints.push(...getAdjacentHigherPoints({x: point.x, y: point.y+1, value: map[point.y+1][point.x]}))
    }

    return newAdjacentPoints.reduce((acc, point) => {
        if (point.value !== 9 && !acc.some(p => p.x === point.x && p.y === point.y)) {
            acc.push(point)
        }
        return acc;
    }, []);
}

const lowPointsWithBasins = lowPoints.map(point => {
    const adjacentPoints = getAdjacentHigherPoints(point);
    return {
        point: point,
        adjacentPoints: adjacentPoints
    }
})

lowPointsWithBasins.forEach(point => {
    console.log(point.adjacentPoints.length+1)
})

const basinSizes = lowPointsWithBasins.map(point => {
    return point.adjacentPoints.length+1
    }
)

basinSizes.sort(function(a, b) {
    return b - a;
});

console.log(basinSizes.slice(0,3).reduce((a,b) => a * b))

