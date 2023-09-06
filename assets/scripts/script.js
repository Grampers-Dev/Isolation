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

// Function to draw the gunner character on the canvas
function drawGunner() {
    // Save the current canvas state to prevent transformations affecting other elements
    ctx.save();

    // Translate the canvas to the gunner's position and rotate it based on the gunner's angle
    ctx.translate(gunner.x, gunner.y);
    ctx.rotate(gunner.angle);

    // Replace the drawing code with an image of the gunner (fighter jet)
    const fighterJetImage = document.querySelector(".fighter-jet"); // Get the gunner image
    const jetWidth = 120; // Adjust the width as needed
    const jetHeight = 88; // Adjust the height as needed

    // Draw the gunner image centered on the gunner's position and rotated angle
    ctx.drawImage(
        fighterJetImage,
        -jetWidth / 2,  // Center the image horizontally
        -jetHeight / 2, // Center the image vertically
        jetWidth,       // Width of the image
        jetHeight       // Height of the image
    );

    // Draw a health bar below the gunner's image to represent their health
    const healthBarWidth = 50; // Width of the health bar
    const healthBarHeight = 2; // Height of the health bar
    const healthBarX = -healthBarWidth / 2; // Center the health bar horizontally
    const healthBarY = jetHeight / 2 + 10;  // Position the health bar below the gunner
    ctx.fillStyle = "black"; // Set the color of the health bar
    ctx.fillRect(
        healthBarX,                            // X-coordinate of the health bar
        healthBarY,                            // Y-coordinate of the health bar
        healthBarWidth * (gunner.health / 100), // Adjust the width based on gunner's health
        healthBarHeight                        // Height of the health bar
    );

    // Restore the canvas state to revert transformations
    ctx.restore();
}

// Function to draw bullets on the canvas
function drawBullets() {
    // Loop through the 'bullets' array and draw each bullet
    bullets.forEach((bullet) => {
        ctx.fillStyle = "green"; // Set the fill color to green
        ctx.beginPath();

        // Draw a circular bullet at the specified (x, y) position with a radius of 4 (adjust as needed)
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);

        ctx.fill(); // Fill the bullet with the specified color
        ctx.closePath(); // Close the path for this bullet
    });

    // Loop through the 'enemyBullets' array and draw each enemy bullet
    enemyBullets.forEach((bullet) => {
        ctx.fillStyle = "red"; // Set the fill color to red
        ctx.beginPath();

        // Draw a circular enemy bullet at the specified (x, y) position with a radius of 4 (adjust as needed)
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);

        ctx.fill(); // Fill the enemy bullet with the specified color
        ctx.closePath(); // Close the path for this enemy bullet
    });
}

function drawTargets() {
    const targetImage = document.querySelector(".target-image"); // Get the target image element
    targets.forEach((target) => {
        ctx.save();
        ctx.translate(target.x, target.y);
        ctx.rotate(target.angle); // Apply rotation angle

        // Replace the drawing code with an image
        const targetWidth = 80; // Adjust the width as needed
        const targetHeight = 48; // Adjust the height as needed
        ctx.drawImage(
            targetImage,
            -targetWidth / 2,
            -targetHeight / 2,
            targetWidth,
            targetHeight
        );

        ctx.restore();
    });
}


