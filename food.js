import {snakeBody, gameBoard, movementDirection} from './snake.js'
export let food = { 'x' : 13, 'y' : 13}
const lowestCoordinateValue = 3
const highestCoordinateValue = 18


export function updateFood(){
    if (checkIfSnakeAte()){
        console.log('snake ate')
        let invalidCoordinate = true
        while (invalidCoordinate){
            let x = generateRandomNumber();
            let y = generateRandomNumber();
            let coordinate = {'x' : x, 'y' : y}
            if (checkFoodCoordinates(coordinate)){
                food = coordinate
                invalidCoordinate = false
                break
            }
        }
    }
}


export function drawFood(){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food['y']
    foodElement.style.gridColumnStart = food['x']
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}


export function checkIfSnakeAte(){
    return snakeBody[0]['x'] === food['x'] && snakeBody[0]['y'] === food['y']
}

function checkFoodCoordinates(coordinate){
    return !snakeBody.includes(coordinate);

}

function generateRandomNumber() {
    let min = lowestCoordinateValue
    let max = highestCoordinateValue
    let difference = max - min
    let rand = Math.random();

    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}