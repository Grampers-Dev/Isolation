// DOM element variables
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const endButton = document.querySelector(".end-button");
const timerElement = document.querySelector(".timer");
const healthElement = document.querySelector(".health");
const scoreElement = document.querySelector(".score");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const shootButton = document.querySelector(".shoot-button");
const bulletImage = new Image();
bulletImage.src = "assets/images/player-bullet-image.png"; // Replace with the actual path to your bullet image
const backgroundMusic = document.querySelector(".background-music");
const backgroundMusic2 = document.querySelector(".background-music2"); // Initialize backgroundMusic2
const gunshotAudio = document.querySelector(".gunshot-audio");
backgroundMusic.volume = 0.5;
const instructionsButton = document.querySelector(".instructions-button");
const instructions = document.querySelector(".instructions");
let shootingInterval;

// Define a constant for speed increment
const speedIncrement = 0.5; // Increase speed by 0.5 units every time

// Add an event listener to the instructionsButton element
instructionsButton.addEventListener("click", () => {
    // Check if the 'instructions' element is currently hidden
    if (instructions.style.display === "none") {
        // If hidden, display the 'instructions' element and update the button text
        instructions.style.display = "block";
        instructionsButton.textContent = "Hide Instructions";
    } else {
        // If not hidden, hide the 'instructions' element and update the button text
        instructions.style.display = "none";
        instructionsButton.textContent = "Show Instructions";
    }
});

// Add an event listener to the startButton element
startButton.addEventListener("click", () => {
    // Play background music using the 'backgroundMusic' and 'backgroundMusic2' audio elements
    backgroundMusic.play();
    backgroundMusic2.play();

    // Call the 'startGame' function to initiate the game
    startGame(); // Call your startGame function here
});
