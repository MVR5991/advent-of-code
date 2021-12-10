import {readTextFile} from "../utils/utils.js";
const input = readTextFile('input.txt')


const lines = input.map(line => line.split(''))

const SYMBOL_MAPPING = {
    '<': '>',
    '(': ')',
    '[': ']',
    '{': '}'
}

const SYNTAX_ERROR_VALUES = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const COMPLETION_SYMBOL_VALUES = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

const completeLines = lines.filter(line => line.length%2 === 0)

let ERROR = 0;

const validLines = lines.filter(line => {
    const stack = []
    let validLine = true;
    line.forEach((symbol) => {
        if (Object.keys(SYMBOL_MAPPING).includes(symbol)) {
            stack.push(symbol)
        } else {
            if (SYMBOL_MAPPING[stack.pop()] !== symbol) {
                // console.log(`Syntax error at ${symbol}`)
                ERROR += SYNTAX_ERROR_VALUES[symbol]
                validLine = false;
            }
        }
    })
    return validLine;
})


// console.log(ERROR)
// console.log(validLines.length)


const getContestValue = (completionArray) => {
    let completionValue = 0;
    completionArray.forEach(completion => {
        completionValue *= 5;
        completionValue += COMPLETION_SYMBOL_VALUES[completion];
    })

    return completionValue;
}

const contestValueArray = []

const correctedLines = validLines.map(line => {
    const stack = []
    let validLine = true;
    line.forEach((symbol) => {
        if (Object.keys(SYMBOL_MAPPING).includes(symbol)) {
            stack.push(symbol)
        } else {
            if (SYMBOL_MAPPING[stack.pop()] !== symbol) {
                // console.log(`Syntax error at ${symbol}`)
                ERROR += SYNTAX_ERROR_VALUES[symbol]
                validLine = false;
            }
        }
    })
    const missingSymbols = stack.map(symbol => SYMBOL_MAPPING[symbol]).reverse();
    contestValueArray.push(getContestValue(missingSymbols))
    return [...line, ...missingSymbols]
})

contestValueArray.sort((a, b) => a - b);
console.log(contestValueArray[Math.round((contestValueArray.length - 1) / 2)])

