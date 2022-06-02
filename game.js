// import other modules and set constants/variables
import {gameBoard, appendYouSnakeSegment as appendYouSnakeSegment, drawSnake as drawSnake, snakeBody, snakeSpeed, updateSnake as updateSnake} from './snake.js'
import {checkIfSnakeAte, drawFood as drawFood, food, updateFood as updateFood} from "./food.js";
let lastRenderTime = 0
let globalID;
const starterSnakePosition = { 'x' : 11, 'y' : 11}
const xAxisEdgeCases = [-1,21]
const yAxisEdgeCases = [-1,22]


window.addEventListener("load", function(){
    snakeBody.push(starterSnakePosition)
    // food = starterFoodPosition
})


let controlPanel = document.getElementById('controlPanel')
controlPanel.addEventListener('click', (event) =>{
    let clickedButton = event.target
    if (clickedButton.id === "start-continue"){
        if (clickedButton.innerHTML === 'Restart'){
            document.location.reload()
        }else{
        window.requestAnimationFrame(initGame)
        clickedButton.innerHTML = 'Continue'
        }
    }else{
        pauseGame()
    }
})

function initGame(currentTime) {
    globalID = window.requestAnimationFrame(initGame)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000 // divide milliseconds to seconds
    if (secondsSinceLastRender < 1 / snakeSpeed){return}
    lastRenderTime = currentTime
    console.log('snake',{...snakeBody[0]})
    console.log('food',{...food})
    if (checkGameOver()){return}
    update()
    draw()
}

export function pauseGame(){
    cancelAnimationFrame(globalID)
}

function update(){
    updateSnake()
    if (checkIfSnakeAte()){appendYouSnakeSegment()}
    updateFood()
}
function draw(){
    gameBoard.innerText=''
    drawSnake()
    drawFood()
}

function checkGameOver(){
    if (xAxisEdgeCases.includes(snakeBody[0].x) || yAxisEdgeCases.includes(snakeBody[0].y)){
        pauseGame()
        let gameOverElement = document.createElement("div")
        gameOverElement.classList.add('error-message-container')
        gameOverElement.innerHTML = '<h1>GAME OVER !!</h1>'
        gameBoard.appendChild(gameOverElement)
        document.getElementById("start-continue").innerText = 'Restart'
        return true
    }

}