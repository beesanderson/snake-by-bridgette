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
let squares = [] //create empty array
let currentSnake = [2,1,0] //snakeHead === currentSnake[0]
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
//create grid on load
createGrid()

// call default currentSnake location, [2,1,0] (head = 0), and use higher order array method .forEach() to add styling to each square of snake
    // PS snake is set backwards bc snake starts at left side of game board going right (aka plus 1 direction) BASICALLY just reversed the standard array indexes 
        // i.e. correctSnake[2] = backwardSnake[0] && correctSnake[0] = backwardSnake[2] && [1] == [1]
currentSnake.forEach(index => squares[index].classList.add('snake'))
    // here I take the squares array and pass through the index of [2,1,0] and style array index [0,1,2] as such so I can add to or subtract from the direction variable to compare snake location to grid nodes & check if head is at top, right, bottom, and left wall or apple.   




function move() {
     
        /* MODULUS OPERATOR - returns remainder of the division
                aka --------- 
                extremely useful in dividing something up equally then finding how much is left 
        i.e. 
        //if snakeHead modulus is equal to 9 its at right wall

            if snakeHead index is 46 the remainder is 6 because 
                46 = (10*4) + 6 thus has a remainder of 6 --- 10 goes into 40 4 times and 6 doesn't go into 10

            if snakeHead index is 
        */

// keep snake from hitting sides of walls using modulus operator
    if ( //check if snake has hit...

        //BOTTOM WALL snakeHead + width(10) >= 100 --- snakeHead is at bottom wall 
            //IF snakeHead is greater than or equal to 100 && direction is 10 
        (currentSnake[0] + width >= width*width && direction === width) || 
        //RIGHT WALL snakeHead % 10 === 9 ---- if remainder of 9 snakeHead is at right wall
            //IF snakeHead remainder is 9 && direction is 1 
        (currentSnake[0] % width === width-1 && direction === 1) ||
        //LEFT WALL snakeHead % 10 === 0 ---- if remainder of 0 snakeHead is at left wall
            //IF snakeHead remainder is 0 && direction is - 1
        (currentSnake[0] % width === 0 && direction === - 1) ||
        //TOP WALL if snakeHead - 10 is less than 
            //IF snakeHead - 10 is less than 0 && direction is -10
        (currentSnake[0] - width < 0 && direction === -width) ||
        //&& keep snake from going into itself 
        squares[currentSnake[0] + direction].classList.contains('snake') 
    // if snake hits wall, stop game and clear timerId/setInterval
    ) return clearInterval(timerId)

/* snakeHead == currentSnake[0]

        BOTTOM WALL  -- snakeHead + 10 >= 100 
        RIGHT WALL   -- snakeHead % 10 === 9
        LEFT WALL    -- snakeHead % 10 === 0
        TOP WALL     -- snakeHead - 10 < 0

        
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
    // generate random number based on squares array (100)
       appleIndex = Math.floor(Math.random() * squares.length)
    // generate them while there is a snake on the board
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}






/* Button Functions */


function startGame() {
    //reset game board
    //remove current snake from current location
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove apple from current location (regardless of snake location)
    squares[appleIndex].classList.remove('apple')
    //reset timerId and clear interval timer
    clearInterval(timerId)
    //reset snake at top of game board
    currentSnake = [2,1,0]
    //reset direction to go right until keycode input otherwise
    direction = 1 
    //reset interval timer to 1000 milliseconds
    intervalTime = 1000 
    //generate random apple on board
    generateApple()
    //begin adding styling for snake to each indexed node
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    //call move() function while setting time with intervalTime (reset to 1000)
    timerId = setInterval(move, intervalTime)
    //reset score to 0
    score = 0
    //set scoreHeading to block (h2 is by default but for multiple restarts can bug out to inline)
    scoreHeading.style.display = "block"
    //remove message from being seen
    messageBoard.classList.remove('restore-display')
    //hide message board from view 
    messageBoard.classList.add('null-display')
    //display score on scoreboard element 
    scoreBoard.textContent = score
}

function hardCore() {
    //set boolean for hardcore mode
    hardcoreModeOn = true
    //set faster speed to increment quicker than default .9
    speed = 0.7
    //display turn off text on hardcore button
    hardModeBtn.textContent = "Turn Off?"
    //debugging 
    console.log("hardcore mode = " + hardcoreModeOn)
    //to see current speed when incremented 
    console.log("speed = " + speed)
    //display interval time
    console.log("interval Time? = " + intervalTime)
    //turn off hardcore mode by resetting speed to default 0.9 on secondary click
    hardModeBtn.addEventListener("click", function() {
        speed = 0.9
        //reset hardcore mode to off 
        hardcoreModeOn = false
        //redisplay hard code text on button
        hardModeBtn.textContent = "Hard Mode"
        console.log("hardcore mode off")
        console.log("hardcore mode = " + hardcoreModeOn)
        console.log("speed = " + speed)
        console.log("interval Time? = " + intervalTime)
    })
}

function quitGame() {

    //remove snake styling from current snake & game board
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove apple styling from current apple location & game board
    squares[appleIndex].classList.remove('apple')
    //clear interval timer 
    clearInterval(timerId) 
    //show message board text
    messageBoard.classList.remove('null-display')
    //remove score board text
    scoreHeading.style.display = "none"
    //add class 
    messageBoard.classList.add('restore-display')
    //display text
    messageBoard.textContent = "See you next time!"

}


/* -------- Event Listeners --------- */


//keycodes are deprecated but fine for current build

function control(e) { //pass an event as e through control function

    //we add | subtract from SNAKE INDEX --not-- the squares index for the directional controls :) 

    //key code 39 = right arrow
    if (e.keyCode === 39) { 
        // console.log("right arrow pressed.")
        direction = 1 //set direction as 1
    //keycode 38 = up arrow
    } else if (e.keyCode === 38) {
        // console.log("up arrow pressed")
        direction = -width //set direction to -10 --- minus whole width of our array (makes it jump up next row above unless there is a wall or snake)
    //keycode 37 = left arrow
    } else if (e.keyCode === 37) {
        // console.log("left arrow pressed")
        direction = -1 //set direction -1 -- minus one to go backwards unless snake or wall in direction
    //keycode 40 = down arrow
    } else if (e.keyCode === 40) {
        // console.log("down arrow pressed")
        direction = +width //set direction +10 -- adds whole width of our array to jump to row below unless wall or snake present. 


        // IF apple is present will increment score & speed and add to snake tail one node and reset apple location where snake is not present 
    }
}

//event listener for arrow key presses-calls control function
document.addEventListener('keyup', control)

//start game on click
startBtn.addEventListener("click", startGame)

//set hardcore mode to true and increase speed
hardModeBtn.addEventListener("click", hardCore)

//remove snake and apple from board
quitBtn.addEventListener("click", quitGame)
