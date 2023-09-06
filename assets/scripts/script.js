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

// Attach a click event listener to the reset button
resetButton.addEventListener("click", () => {
    resetGame(); // Call the resetGame() function when the reset button is clicked
});

// Define an object 'gunner' representing a player or character
const gunner = {
    x: canvas.width / 2, // Initial x-coordinate at the center of the canvas
    y: canvas.height / 2, // Initial y-coordinate at the center of the canvas
    speed: 3, // The speed of the gunner character
    angle: 0, // The angle at which the gunner is facing (in degrees)
    health: 100, // The health points of the gunner character
};

// Initialize arrays to store bullets, targets, and enemy bullets
const bullets = []; // Store bullets fired by the gunner
const targets = []; // Store targets or enemies
const enemyBullets = []; // Store bullets fired by enemies

// Create a 'movementKeys' Set to keep track of keys currently pressed for movement
const movementKeys = new Set();

// Initialize a boolean variable 'isShooting' to track if the gunner is shooting
let isShooting = false;

function drawGunner() {
    ctx.save();
    ctx.translate(gunner.x, gunner.y);
    ctx.rotate(gunner.angle);

    // Replace the drawing code with an image
    const fighterJetImage = document.querySelector(".fighter-jet");
    const jetWidth = 120; // Adjust the width as needed
    const jetHeight = 88; // Adjust the height as needed
    ctx.drawImage(
        fighterJetImage,
        -jetWidth / 2,
        -jetHeight / 2,
        jetWidth,
        jetHeight
    );

    const healthBarWidth = 50;
    const healthBarHeight = 2;
    const healthBarX = -healthBarWidth / 2;
    const healthBarY = jetHeight / 2 + 10;
    ctx.fillStyle = "black";
    ctx.fillRect(
        healthBarX,
        healthBarY,
        healthBarWidth * (gunner.health / 100),
        healthBarHeight
    );

    ctx.restore();
}

