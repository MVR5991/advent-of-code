import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt')

const octopussy = input.map(line => line.split('').map(val => ({
    value: parseInt(val),
    hasFlashed: false
})))


// increase all diagonally adjacent elements by one
const increaseSurroundingOctopussyEnergyLevel = (localOctopussy, x, y) => {
    if (x > 0 && y > 0) {
        localOctopussy[y - 1][x - 1].value += 1
    }
    if (x > 0 && y < localOctopussy.length - 1) {
        localOctopussy[y + 1][x - 1].value += 1
    }
    if (x < localOctopussy[0].length - 1 && y > 0) {
        localOctopussy[y - 1][x + 1].value += 1
    }
    if (x < localOctopussy[0].length - 1 && y < localOctopussy.length - 1) {
        localOctopussy[y + 1][x + 1].value += 1
    }
    if (x > 0) {
        localOctopussy[y][x - 1].value += 1
    }
    if (x < localOctopussy[0].length - 1) {
        localOctopussy[y][x + 1].value += 1
    }
    if (y > 0) {
        localOctopussy[y - 1][x].value += 1
    }
    if (y < localOctopussy.length - 1) {
        localOctopussy[y + 1][x].value += 1
    }
    return localOctopussy;
}

let totalFlashes = 0;

let newOctoPussyMap = octopussy;

for (let step = 1; step <= 500; step += 1) {
    let flashesThisRound = 0;
    let increaseOctoPussys = newOctoPussyMap.map(octopussyLine => {
        return octopussyLine.map(x => ({
            hasFlashed: false,
            value: x.value + 1
        }))
    })

    let mapChanged = true;
    while (mapChanged) {
        mapChanged = false;

        for (let y = 0; y < increaseOctoPussys.length; y++) {
            for (let x = 0; x < increaseOctoPussys[0].length; x++) {
                if (increaseOctoPussys[y][x].value >= 10 && increaseOctoPussys[y][x].hasFlashed === false) {
                    mapChanged = true;
                    increaseOctoPussys[y][x].hasFlashed = true;
                    flashesThisRound += 1;
                    increaseOctoPussys = increaseSurroundingOctopussyEnergyLevel(increaseOctoPussys, x, y);
                }
            }
        }

    }
    const debugMapOcto = increaseOctoPussys.map(x => x.map(z => z.value))
    let amountOfOctopussysFlashed = 0;
    totalFlashes += flashesThisRound;
    newOctoPussyMap = increaseOctoPussys.map(x => x.map(z => {
        if (z.hasFlashed) {
            amountOfOctopussysFlashed += 1;
            return {
                value: 0,
                hasFlashed: false
            }
        } else {
            return {
                value: z.value,
                hasFlashed: false
            }
        }

    }))
    if(amountOfOctopussysFlashed === 100) {
        console.log(`${step} steps it took to flash 100 octopussys`)
        break;
    }
}

console.log(totalFlashes)


