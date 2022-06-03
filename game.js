import {
    gameBoard,
    snakeBody,
    snakeSpeed,
    appendNewSnakeSegment,
    drawSnake,
    updateSnake,
    manipulateSpeeed
} from './snake.js';

import {
    checkIfSnakeAte,
    drawFood,
    updateFood,
    setFoodStarterPosition
    } from "./food.js";

let lastRenderTime = 0
let globalID;
const snakeStarterPosition = { 'x' : 11, 'y' : 11}
const foodStarterPosition = { 'x' : 13, 'y' : 13}
const xAxisEdgeCases = [-1,21]
const yAxisEdgeCases = [-1,22]


window.addEventListener("load", function(){
    snakeBody.push(snakeStarterPosition)
    setFoodStarterPosition(foodStarterPosition)
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
    }else if (clickedButton.id === "pause"){
        pauseGame()
    }else if (clickedButton.id === "speed-up"){
        manipulateSpeeed('add')
    }else{
        manipulateSpeeed('subtract')
    }
})

function initGame(currentTime) {
    // if (globalID === 600){gameOver()}
    globalID = window.requestAnimationFrame(initGame)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000 // divide milliseconds to seconds
    if (secondsSinceLastRender < 1 / snakeSpeed){return}
    lastRenderTime = currentTime
    console.log(snakeSpeed)
    if (checkGameOver()){return}
    update()
    draw()
}

export function pauseGame(){
    cancelAnimationFrame(globalID)
}

function update(){
    updateSnake()
    if (checkIfSnakeAte()){
        updateFood()
        appendNewSnakeSegment()
    }
}
function draw(){
    gameBoard.innerText=''
    drawSnake()
    drawFood()
}

function checkGameOver(){
    if (xAxisEdgeCases.includes(snakeBody[0].x) || yAxisEdgeCases.includes(snakeBody[0].y)){
        gameOver()
        return true
    }
}

function gameOver(){
    pauseGame()
    let gameOverElement = document.createElement("div")
    gameOverElement.classList.add('error-message-container')
    gameOverElement.innerHTML = '<h1>GAME OVER !!</h1>'
    gameBoard.appendChild(gameOverElement)
    document.getElementById("start-continue").innerText = 'Restart'
}