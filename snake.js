export const snakeSpeed = 3// how many times per second does the snake move
export const snakeBody = []
export const gameBoard = document.getElementById('game-board')
export const movementDirection = {'direction':{'x':'add'}}

export function updateSnake(){
    const coordinate = Object.keys(movementDirection['direction'])[0]
    const direction = Object.values(movementDirection['direction'])[0]
    if (direction === 'add'){
        snakeBody[0][coordinate] += 1
    }else{
        snakeBody[0][coordinate] -= 1
    }
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
