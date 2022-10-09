const container = document.getElementById("container");
const countDown = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const scoreBoard = document.getElementById('scoreBoard');
const totalPoints = document.getElementById('totalPoints');
const totalGoldenLetters = document.getElementById('totalGoldenLetters');
const totalScore = document.getElementById('totalScore');
const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
const displayPoints = document.getElementById('points');
const displayGoldenPoints = document.getElementById('goldenPoints');
const fallingLetters = document.getElementById('lettersDiv');
let checker = countDown.innerText;
let timerInterval;
let fall;
let velocity = 20;
let goldenLetter;
let time = 20;
let letterTopPosition = -20;
let pointsCollected = 0;
let goldenPointsCollected = 0;
let checkPositionTimer;

// Stops the checkPositionTimer Interval
const killCheckPosition = () => {
    clearInterval(checkPositionTimer);
}
// Sets the top position of the fallingLetters div and reveals the scores when times up   
const checkPosition = () => {
    if (countDown.innerText === "Time Up!!!") {
        fallingLetters.style.top = -20 + "%";
        letterTopPosition = -20;
        fallingLetters.style.visibility = "hidden";
        scoreBoard.style.visibility = "visible";
        totalPoints.innerHTML = "Total Points: " + pointsCollected;
        totalGoldenLetters.innerText = "Total Golden Points: " + goldenPointsCollected;
        totalScore.innerText = "Total Score: " + (pointsCollected + (goldenPointsCollected * 2));
        startButton.style.top = 60 + "%";
        clearInterval(fall);
        clearInterval(timerInterval);
        killCheckPosition();
    }
}

//picks a random letter
const changeLetter = () => {
    let index = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
    fallingLetters.innerText = letters[index] || letters[0];
    if (checker !== "Time Up!!!") {
        fallingLetters.style.visibility = "visible";
    }
}
// Time reduces by 1 every second and when time reaches 0 intervals are stopped and
//  elements are given new properties
const startCountDown = () => {
    let seconds = time;
    countDown.innerHTML = `${seconds}`;
    time--;
    if (time === 0) {
        clearInterval(timerInterval);
        clearInterval(fall);
        startButton.style.visibility = "visible";
        countDown.innerHTML = "Time Up!!!";
        startButton.innerHTML = "Go again";
        time = 20;
        fallingLetters.style.top = -20 + "%";
        fallingLetters.style.visibility = "hidden";
    }
}
// Sets velocity of falling letter depending on letter color and 
// sets the position of letterTopPosition to 0 when letterTopPosition is 80
const lettersFalling = () => {
    fallingLetters.style.top = letterTopPosition + "%";
    letterTopPosition++;
    let index = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
    let randomPosition = Math.floor(Math.random() * (80 - 0 + 1)) + 0;
    if (goldenLetter > 2) {
        fallingLetters.style.color = "#ffd700";
        clearInterval(fall);
        velocity = 15;
        fall = setInterval(lettersFalling, velocity);
    } else {

        fallingLetters.style.color = "#000";
        clearInterval(fall);
        velocity = 20;
        fall = setInterval(lettersFalling, velocity);
    }

    if (letterTopPosition === 80) {

        letterTopPosition = 0;
        fallingLetters.innerText = letters[index] || letters[0];
        fallingLetters.style.left = randomPosition + "%";
        goldenLetter = Math.floor(Math.random() * 4) + 0;

        //turn letter gold if goldenLetter number is greater than 2, if not back to black.
        if (goldenLetter > 2) {
            fallingLetters.style.color = "#ffd700";
            clearInterval(fall);
            velocity = 10;
            fall = setInterval(lettersFalling, velocity);

        } else {

            fallingLetters.style.color = "#000";
            clearInterval(fall);
            velocity = 30;
            fall = setInterval(lettersFalling, velocity);
        }
    }
}

// Starts game and initiates the startCountDown, lettersFalling and
//  checkPosition intervals. Set elements with new properties.
const startGame = () => {
    let index = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
    fallingLetters.style.top = -20 + "%";
    fallingLetters.innerText = letters[index] || letters[0];
    pointsCollected = 0;
    goldenPointsCollected = 0;
    goldenLetter = 0;
    startCountDown();
    timerInterval = setInterval(startCountDown, 1000);
    fall = setInterval(lettersFalling, velocity);
    checkPositionTimer = setInterval(checkPosition, 10);
    startButton.style.visibility = "hidden";
    scoreBoard.style.visibility = "hidden";
    fallingLetters.style.visibility = "visible";
    displayPoints.innerHTML = 0;
    displayGoldenPoints.innerHTML = 0;

}
// Checks if key pressed on keyboard matches the letter that is randomly selected and 
// increases points depending on the condition of the goldenLetter variable.

document.onkeydown = function (e) {
    let key = e.key;
    let letter = fallingLetters.innerText;
    if (key === letter && checker !== "Time Up!!!" && goldenLetter <= 2) {
        pointsCollected++;
        displayPoints.innerHTML = pointsCollected;
        letterTopPosition = -20;
        fallingLetters.style.visibility = "hidden";
        goldenLetter = Math.floor(Math.random() * 4) + 0;
        let randomPosition = Math.floor(Math.random() * (80 - 0 + 1)) + 0;
        fallingLetters.style.left = randomPosition + "%";
        setTimeout(changeLetter, 450);
    } else if (key === letter && checker !== "Time Up!!!" && goldenLetter > 2) {
        goldenPointsCollected++;
        displayGoldenPoints.innerHTML = goldenPointsCollected;
        letterTopPosition = -20;
        fallingLetters.style.visibility = "hidden";
        goldenLetter = Math.floor(Math.random() * 4) + 0;
        let randomPosition = Math.floor(Math.random() * (80 - 0 + 1)) + 0;
        fallingLetters.style.left = randomPosition + "%";
        setTimeout(changeLetter, 450);
    }

};
