
const BOARD_WIDTH = 5
const BOARD_HEIGHT = 5
const FILLED_PERCENTAGE = 70


let answer = [...Array(BOARD_HEIGHT)].map(e => Array(BOARD_WIDTH).fill(false))
let board = [...Array(BOARD_HEIGHT)].map(e => Array(BOARD_WIDTH).fill(false))

initAnswer()

function initAnswer() {
    for (let r=0; r < BOARD_HEIGHT; r++) {
        for(c=0; c < BOARD_WIDTH; c++) {
            let rnd = Math.floor(Math.random()*100)+0
            if (rnd < FILLED_PERCENTAGE) {
                answer[r][c] = true
            }
        }
    }
}

function onClick(el, rowN, columnN) {
    if (el.classList[0] == "filled") {
        el.classList.remove("filled")
        board[rowN][columnN] = false
    } else {
        el.classList.add("filled")
        board[rowN][columnN] = true
    }
    checkAnswer()
}

function checkAnswer() {
    if (JSON.stringify(answer) == JSON.stringify(board)) {
        alert("YOU WIN")
        location.reload()
    }
}
