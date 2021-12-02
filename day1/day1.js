const fs = require('fs')

const readTextFile = (file) => {
    // fs.readFile(file, 'utf8' , callback)
    return fs.readFileSync(file).toString().split("\r\n");
}

// const callback = (err, data) => {
//
//     if (err) {
//         console.error(err)
//         return
//     }
//     data.map(line => {
//         console.log(line)
//     })
// }

const input = readTextFile('./input.txt');

function getNumberOfIncrements(input) {
    return input.reduce((acc, line, curIndex, array) => {
        if (curIndex !== 0 && parseInt(line) > parseInt(array[curIndex - 1])) {
            acc++
        }
        return acc;
    }, 0);
}

const numberOfIncrements = getNumberOfIncrements(input)

// console.log(numberOfIncrements)

const getMeasurementWindows = input.reduce((acc, line, curIndex, array) => {
    if(curIndex === 0 || curIndex === 1) return acc;
    acc = acc.concat([parseInt(array[curIndex-2]) + parseInt(array[curIndex-1]) + parseInt(line)])
    return acc;
}, [])

console.log(getMeasurementWindows)
const numberOfIncrementsOfGroups = getNumberOfIncrements(getMeasurementWindows)

console.log(numberOfIncrementsOfGroups)
