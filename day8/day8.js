import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input_test.txt')

// console.log(input)

const signalPattern = input.map(line => line.split('|')[0].trim().split(" "))

console.log(input)
const output = input.map(line => {
    console.log(line)
    return line.split('|')[1].trim().split(" ")
})

for(const line of input) {
    const numberSignals = line.split('|')[0].trim().split(" ").map(signal => signal.split(''))
    const numberOutput = line.split('|')[1].trim().split(" ")


    const number1 = numberSignals.filter(signal => signal.length === 2).flat()
    const number4 = numberSignals.filter(signal => signal.length === 4).flat()
    const number7 = numberSignals.filter(signal => signal.length === 3).flat()
    const number8 = numberSignals.filter(signal => signal.length === 7).flat()


    console.log(number1);
    console.log(number4);
    console.log(number7);
    console.log(number8);

    const upperBorder = number7.filter(letter => !number1.includes(letter))

    console.log(upperBorder)



}

const allSignalLines= ['a', 'b', 'c', 'd', 'e', 'f', 'g']

const displayMapping = [allSignalLines,allSignalLines,allSignalLines,allSignalLines,allSignalLines,allSignalLines,allSignalLines,allSignalLines]


const LETTER_DISPLAY_MAPPING = {
    0: [0,1,2,3,4,5],
    1: [1,2],
    2: [0,1,3,4,6],
    3: [0,1,2,3,6],
    4: [1,2,5,6],
    5: [0,2,3,5,6],
    6: [0,2,3,4,5,6],
    7: [0,1,2],
    8: [0,1,2,3,4,5,6],
    9: [0,1,2,3,5,6]
}

const easySegmentsMapping = {
    2: 1,
    3: 7,
    4: 4,
    7: 8
}

// const mapping = signalPattern[0].reduce((acc, number, curIndex, array) => {
//     const splitNumber = number.split('')
//     if(!Object.keys(easySegmentsMapping).map(Number).includes(splitNumber.length)) return acc;
//     LETTER_DISPLAY_MAPPING[easySegmentsMapping[splitNumber.length]].forEach(letterIndex => {
//         let intersection = acc[letterIndex].filter(x => splitNumber.includes(x));
//         acc[letterIndex] = intersection;
//     })
//     return acc;
// }, displayMapping)
//
//
//
//
// console.log(mapping)
//
// function getNewMapping(localMapping) {
//     return localMapping.map((element, index, array) => {
//         const inclusions = array.filter(arrayEl => arrayEl.every(v => element.includes(v) && arrayEl.length !== element.length))
//         if (inclusions.length === 0) {
//             return element;
//         }
//         let difference = element.filter(x => !inclusions[0].includes(x));
//         return difference;
//     });
// }
//
// console.log('*******************');
// const mapping2 = getNewMapping(mapping);
// console.log(mapping2)
// console.log('*******************');
// const mapping3 = getNewMapping(mapping2);
// console.log(mapping3)

// let count = 0;
// const countEasySegments = () => {
//     output.forEach(line => {
//         line.forEach(segment => {
//             if (easySegments.includes(segment.length)) {
//                 count = count +1;
//             }
//         })
//     })
//     return count;
// }


// console.log(countEasySegments())

