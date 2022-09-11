
let horizontalHint = new Array(BOARD_HEIGHT)
let verticalHint = new Array(BOARD_WIDTH)

initHint()
createBoard()

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
        columnHint.innerHTML = verticalHint[c]
        firstRow.appendChild(columnHint)
    }
    document.getElementById('game-area').appendChild(firstRow)

    for (let r = 0; r < BOARD_HEIGHT; r++) {
        var row = document.createElement('tr')

        let rowHint = document.createElement('th')
        rowHint.innerHTML = horizontalHint[r]
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
