/* 
=================
Variables
================= 
*/

/* DOM Variables */ 
const grid = document.querySelector(".grid")
const scoreBoard = document.querySelector("#score")
const playerDisplay = document.querySelector(".player-score")
const gameBoard = document.querySelector(".gameboard")
const messageBoard = document.querySelector(".message-board")
const scoreHeading = document.querySelector(".score-heading")


/* Navbar DOM Variables */
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]


/* Standard Variables */ 
let squares = []
let currentSnake = [2,1,0]
let direction = 1 
const width = 10
let appleIndex = 0 
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
let hardcoreModeOn = false



/* Button Variables */ 
const startBtn = document.querySelector("#btn-start")
// const pauseBtn = document.querySelector("#btn-pause")
const hardModeBtn = document.querySelector("#btn-hardcore")
const quitBtn = document.querySelector("#btn-quit")








/* 
=================
Game Code Begins
================= 
*/


/* Nav Bar Interaction */ 

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle('active')
    playerDisplay.classList.toggle('opacity')
    gameBoard.classList.toggle('opacity')

//     if (navbarLinks.classList.contains('active')) {
//         playerDisplay.classList.add('opacity')
//         gameBoard.classList.add('opacity')
//     } else {
//         playerDisplay.classList.remove('opacity')
//         gameBoard.classList.remove('opacity')
//     }

})



/* Functions */

function createGrid() {


    for (let i = 0; i < width*width; i++) {

        const square = document.createElement('div')

        square.classList.add('square')

        grid.appendChild(square)

        squares.push(square)

    }
}
createGrid()


currentSnake.forEach(index => squares[index].classList.add('snake'))




function move() {


    if (
        (currentSnake[0] + width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === - 1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake') 
    ) return clearInterval(timerId)
    
    


    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)




    if (squares[currentSnake[0]].classList.contains('apple')) { 
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreBoard.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
        console.log("Interval Time = " + intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')


}



function generateApple() {
    do {
       appleIndex = Math.floor(Math.random() * squares.length)

    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}






/* Button Functions */


function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    direction = 1 
    intervalTime = 1000 
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
    currentSnake = [2,1,0]
    score = 0
    scoreHeading.style.display = "block"
    messageBoard.classList.remove('restore-display')
    messageBoard.classList.add('null-display')
    scoreBoard.textContent = score
}

function hardCore() {
    hardcoreModeOn = true
    speed = 0.7
    hardModeBtn.textContent = "Turn Off?"
    console.log("hardcore mode = " + hardcoreModeOn)
    console.log("speed = " + speed)
    console.log("interval Time? = " + intervalTime)
    hardModeBtn.addEventListener("click", function() {
        speed = 0.9
        hardcoreModeOn = false
        hardModeBtn.textContent = "Hard Mode"
        console.log("hardcore mode off")
        console.log("hardcore mode = " + hardcoreModeOn)
        console.log("speed = " + speed)
        console.log("interval Time? = " + intervalTime)
    })
}

function quitGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId) 
    // scoreBoard.classList.add('null-display')
    messageBoard.classList.remove('null-display')
    scoreHeading.style.display = "none"
    // scoreHeading.classList.add('null-display')
    messageBoard.classList.add('restore-display')
    messageBoard.textContent = "See you next time!"
    
}


/* Event Listeners */

function control(e) {
    if (e.keyCode === 39) { 
        // console.log("right arrow pressed.")
        direction = 1
    } else if (e.keyCode === 38) {
        // console.log("up arrow pressed")
        direction = -width
    } else if (e.keyCode === 37) {
        // console.log("left arrow pressed")
        direction = -1
    } else if (e.keyCode === 40) {
        // console.log("down arrow pressed")
        direction = +width 

    }
}


document.addEventListener('keyup', control)

startBtn.addEventListener("click", startGame)

hardModeBtn.addEventListener("click", hardCore)

quitBtn.addEventListener("click", quitGame)
