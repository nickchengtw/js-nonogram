
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 10
const FILLED_PERCENTAGE = 60

let answer = [...Array(BOARD_HEIGHT)].map(e => Array(BOARD_WIDTH).fill(false))
let board = [...Array(BOARD_HEIGHT)].map(e => Array(BOARD_WIDTH).fill(false))
let horizontalHint = new Array(BOARD_HEIGHT)
let verticalHint = new Array(BOARD_WIDTH)

initAnswer()
initHint()
createBoard()

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

function initHint() {
    for (let i in answer) {
        let shape = hintFromVector(answer[i])
        horizontalHint[i] = shape
    }

    let columnVectors = []
    for (let c = 0; c < BOARD_WIDTH; c++) {
        let column = []
        for (let r = 0; r < BOARD_HEIGHT; r++) {
            column.push(answer[r][c])
        }
        columnVectors.push(column)
    }

    for (let i in columnVectors) {
        hint = hintFromVector(columnVectors[i])
        verticalHint[i] = hint
    }
}

function hintFromVector(vec) {
    let hint = []
    let linked = 0
    for (let i = 0; i < vec.length + 1; i++) {
        if (vec[i]) {
            linked += 1
        } else {
            if (linked != 0) {
                hint.push(linked)
                linked = 0
            }
        }
    }
    return hint
}

function createBoard() {
    let firstRow = document.createElement('tr')
    firstRow.appendChild(document.createElement('th'))
    for (let c=0; c < BOARD_WIDTH; c++) {
        columnHint = document.createElement('th')
        columnHint.innerHTML = verticalHint[c].join('<br>')
        firstRow.appendChild(columnHint)
    }
    document.getElementById('game-area').appendChild(firstRow)

    for (let r = 0; r < BOARD_HEIGHT; r++) {
        var row = document.createElement('tr')

        let rowHint = document.createElement('th')
        rowHint.innerHTML = horizontalHint[r].join(' ')
        row.appendChild(rowHint)

        for (let c = 0; c < BOARD_WIDTH; c++) {
            let square = document.createElement('td')
            square.setAttribute('onclick', "onClick(this, " + r + ", " + c + ")")
            // Uncomment code below to show answer
            // if (answer[r][c]) {
            //     square.classList.add('filled')
            // }
            row.appendChild(square)
        }

        document.getElementById('game-area').appendChild(row)
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
