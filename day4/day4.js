import {readTextFile} from "../utils/utils.js";

const input = readTextFile('input.txt');

const numbers = input[0].split(',')

let boards = []

for (let i = 2; i < input.length; i += 6) {
    const board = []
    for (let x = 0; x < 5; x++) {
        board.push(input[x + i].split(" ").map(number => ({
            number: parseInt(number),
            hasBeenHit: false
        })).filter(number => Boolean(number.number) || number.number === 0))
    }
    boards.push(board)
}

const isBoardWinning = (board) => {
    for (let i = 0; i < board.length; i++) {
        let winner = true;
        //horizontal
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].hasBeenHit === false) {
                winner = false;
                break;
            }
        }
        if (winner)
            return true;
        // vertical
        winner = true;
        for(let j = 0; j < board[0].length; j++){
            if(board[j][i].hasBeenHit === false)
            {
                winner=false;
                break;
            }
        }
        if(winner)
            return true;
    }
    return false;
}

const getSumOfBoard = (board, lastCalledNumber) => {
    let sum = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].hasBeenHit === false) {
                sum += board[i][j].number
            }
        }
    }
    return sum*lastCalledNumber;
}

console.log(numbers)
console.log(boards)

let winningBoards = []

for (const pickedNumber of numbers) {
    console.log(pickedNumber)
    let winner = false;

    for (const board of boards) {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[0].length; y++) {
                if (board[x][y].number === parseInt(pickedNumber)) {
                    board[x][y].hasBeenHit = true;
                }
            }
        }
    }
    for (let i = 0; i < boards.length; i++) {
        if (isBoardWinning(boards[i])) {
            // boards = boards.filter((board, index) => index !== i)
            if(!winningBoards.find(el => el.boardNumber === i)){
                console.log(`Board ${i} is winning`)
                console.log(getSumOfBoard(boards[i], parseInt(pickedNumber)))
                winningBoards.push({boardNumber: i, sum: getSumOfBoard(boards[i], parseInt(pickedNumber))})
            }

            // winner = true;
            // break;
        }
    }
    // if (winner) break;
}


console.log(winningBoards)
// console.log(numbers)
// console.log(boards)
// isBoardWinning(boards[0], numbers.slice(0,5))