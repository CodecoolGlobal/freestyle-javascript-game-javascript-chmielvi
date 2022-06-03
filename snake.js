export let snakeSpeed = 2// how many times per second does the snake move
export let snakeBody = []
export let movementDirection = {'direction':{'x':'add'}}
export const gameBoard = document.getElementById('game-board')

export function updateSnake() {
    for (let step = snakeBody.length - 2; step >= 0; step--){
        snakeBody[step + 1] = { ...snakeBody[step]}
    }
    snakeBody[0] = getHeadsNextCoordinates()
}

function getHeadsNextCoordinates(){
    let snakeHead = {...snakeBody[0]}
    const coordinate = Object.keys(movementDirection['direction'])[0]
    const direction = Object.values(movementDirection['direction'])[0]
    if (direction === 'add') {
        snakeHead[coordinate] += 1
    } else {
        snakeHead[coordinate] -= 1
    }
    return snakeHead
}

export function appendNewSnakeSegment(){
    snakeBody.unshift(getHeadsNextCoordinates())
}

export function drawSnake(){
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

document.onkeydown = (event) => {
    const pressedKey = event.key
    if (pressedKey === 'ArrowUp'){
        movementDirection['direction'] = {'y':'subtract'}
}else if (pressedKey === 'ArrowDown'){
        movementDirection['direction'] = {'y':'add'}
}else if (pressedKey === 'ArrowRight'){
        movementDirection['direction'] = {'x':'add'}
}else if (pressedKey === 'ArrowLeft'){
        movementDirection['direction'] = {'x':'subtract'}
    }
}

export function manipulateSpeeed(operator){
    if (operator === 'add'){
        snakeSpeed += 1
    }else{
        snakeSpeed -= 1
    }
}
