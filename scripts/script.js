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



/* Nav Bar Interaction */ 

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle('active')
    playerDisplay.classList.toggle('opacity')
    gameBoard.classList.toggle('opacity')

})




/* 
=================
Game Code Begins
================= 
*/

/* Functions */

function createGrid() {

    //create 100 new elements with for loop
    for (let i = 0; i < width*width; i++) {
        //create the element
        const square = document.createElement('div')
        //add styling to element
        square.classList.add('square')
        //put the element into grid 
        grid.appendChild(square)
        //push it into a new squares array 
        squares.push(square)
    }
}
createGrid()

// call default currentSnake location, [2,1,0] (head = 0), and use higher order array method .forEach() to add styling to each square of snake
currentSnake.forEach(index => squares[index].classList.add('snake'))




function move() {

    // keep snake from hitting sides of walls 
    if (
        (currentSnake[0] + width >= width*width && direction === width) || 
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === - 1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        //take squares array & snakeHead plus direction and add snake styling 
        squares[currentSnake[0] + direction].classList.contains('snake') 
    ) return clearInterval(timerId)

/* snakeHead == currentSnake[0]

        LEFT WALL    -- snakeHead % 10 === 0 
        RIGHT WALL   -- snakeHead % 10 === 9
        TOP WALL     -- snakeHead - 10 < 0
        BOTTOM WALL  -- snakeHead + 10 >= 100 

        
 */
    
    

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction) 



    //create if statement to see if apple is in same area as snake
    if (squares[currentSnake[0]].classList.contains('apple')) { 
        //remove apple square from randomly generated location
        squares[currentSnake[0]].classList.remove('apple') 
        //add styling to squares array
        squares[tail].classList.add('snake')
        //add styled square in squares array to currentSnake by passing through tail const
        currentSnake.push(tail)
        //call generateApple function to populate new apple
        generateApple()
        //increment score 
        score++
        //display new score to scoreBoard
        scoreBoard.textContent = score
        //reset timer id
        clearInterval(timerId)
        //increase speed
        intervalTime = intervalTime * speed
        //restart timerId with new interval speed and call move function
        timerId = setInterval(move, intervalTime)
        //debug
        console.log("Interval Time = " + intervalTime)
    }
    //add styling so we can see snake after checking if currentSnake is in the same square as an apple
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
