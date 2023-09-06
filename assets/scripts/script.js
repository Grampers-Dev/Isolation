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

// Function to draw targets (enemies) on the canvas
function drawTargets() {
    // Get the target image element from the HTML document
    const targetImage = document.querySelector(".target-image");

    // Loop through the 'targets' array and draw each target
    targets.forEach((target) => {
        ctx.save(); // Save the current canvas state to prevent transformations affecting other elements
        ctx.translate(target.x, target.y); // Translate the canvas to the target's position
        ctx.rotate(target.angle); // Apply rotation angle to the target

        // Replace the drawing code with an image of the target
        const targetWidth = 80; // Adjust the width of the target image as needed
        const targetHeight = 48; // Adjust the height of the target image as needed

        // Draw the target image centered on the target's position and rotated based on its angle
        ctx.drawImage(
            targetImage,             // The target image element
            -targetWidth / 2,        // Center the image horizontally
            -targetHeight / 2,       // Center the image vertically
            targetWidth,             // Width of the image
            targetHeight             // Height of the image
        );

        ctx.restore(); // Restore the canvas state to revert transformations
    });
}

// Function to clear the entire canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the game state and perform various game-related tasks
function update() {
    clearCanvas(); // Clear the canvas to prepare for rendering the updated game state
    handleInput(); // Handle player input (e.g., movement and shooting)
    drawGunner(); // Draw the gunner character on the canvas
    drawBullets(); // Draw bullets fired by the gunner

    // Update the positions of player bullets based on their angles and speeds
    bullets.forEach((bullet) => {
        const bulletDirection = {
            x: Math.cos(bullet.angle), // Calculate x-component of the bullet's direction
            y: Math.sin(bullet.angle), // Calculate y-component of the bullet's direction
        };

        // Update the bullet's position based on its speed and direction
        bullet.x += bullet.speed * bulletDirection.x;
        bullet.y += bullet.speed * bulletDirection.y;
    });

    // Update the positions of enemy bullets based on their angles and speeds
    enemyBullets.forEach((bullet) => {
        bullet.x += bullet.speed * Math.cos(bullet.angle); // Update x-coordinate
        bullet.y += bullet.speed * Math.sin(bullet.angle); // Update y-coordinate
    });

    // Update the positions of targets (enemies) and handle their interactions with the gunner
    targets.forEach((target) => {
        const dx = gunner.x - target.x; // Calculate the horizontal distance between gunner and target
        const dy = gunner.y - target.y; // Calculate the vertical distance between gunner and target
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between gunner and target
        const angleToGunner = Math.atan2(dy, dx); // Calculate the angle from the target to the gunner

        // Rotate the target to face the gunner
        target.angle = angleToGunner;

        // Move the target along its own direction
        target.x += target.speed * Math.cos(target.angle);
        target.y += target.speed * Math.sin(target.angle);

        // If the target gets too close to the gunner, damage the gunner's health
        if (distance < 15) {
            gunner.health -= 2; // Reduce gunner's health by 2 points
            healthElement.textContent = `Health: ${gunner.health}%`; // Update health display
            if (gunner.health <= 0) {
                endGame(); // End the game if the gunner's health reaches zero or below
            }
        }
    });

    drawTargets(); // Draw the targets (enemies) on the canvas
    handleCollisions(); // Handle collisions between bullets and targets

    // Check if the game is over and the gunner's health is depleted
    if (isGameOver && gunner.health <= 0) {
        clearCanvas(); // Clear the canvas for the game over message
        drawDeathMessage(); // Display the game over message
        return; // Return early to avoid executing other parts of the function
    }
}

// Function to handle player input for character movement and aiming
function handleInput() {
    // Check if the gunner character is moving upward
    if (gunner.movingUp) {
        gunner.y -= gunner.speed; // Move the gunner's y-coordinate upwards
    }

    // Check if the gunner character is moving downward
    if (gunner.movingDown) {
        gunner.y += gunner.speed; // Move the gunner's y-coordinate downwards
    }

    // Check if the gunner character is moving leftward
    if (gunner.movingLeft) {
        gunner.x -= gunner.speed; // Move the gunner's x-coordinate to the left
    }

    // Check if the gunner character is moving rightward
    if (gunner.movingRight) {
        gunner.x += gunner.speed; // Move the gunner's x-coordinate to the right
    }

    // Calculate the angle at which the gunner character is aiming based on the mouse position
    const dx = mouse.x - gunner.x; // Calculate the horizontal distance between mouse and gunner
    const dy = mouse.y - gunner.y; // Calculate the vertical distance between mouse and gunner
    gunner.angle = Math.atan2(dy, dx); // Calculate the angle in radians using arctangent
}

// Function to handle collisions between bullets and targets, and between enemy bullets and the gunner
function handleCollisions() {
    // Iterate through all player bullets and targets to check for collisions
    bullets.forEach((bullet, bulletIndex) => {
        targets.forEach((target, targetIndex) => {
            // Check if the bullet is within a close range of the target (collided)
            if (
                bullet.x > target.x - 15 &&
                bullet.x < target.x + 15 &&
                bullet.y > target.y - 15 &&
                bullet.y < target.y + 15
            ) {
                // Remove the collided bullet and target from their respective arrays
                bullets.splice(bulletIndex, 1);
                targets.splice(targetIndex, 1);

                // Increase the player's score when a target is hit
                score += 10;
                scoreElement.textContent = `Score: ${score}`; // Update the score display
            }
        });
    });

    // Iterate through all enemy bullets to check for collisions with the gunner
    enemyBullets.forEach((bullet, bulletIndex) => {
        // Calculate the distance between the gunner and the enemy bullet
        const dx = gunner.x - bullet.x;
        const dy = gunner.y - bullet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if the enemy bullet is within a close range of the gunner (collided)
        if (distance < 5) {
            // Reduce the gunner's health and update the health display
            gunner.health -= 10;
            healthElement.textContent = `Health: ${gunner.health}%`;

            // Remove the collided enemy bullet from the array
            enemyBullets.splice(bulletIndex, 1);

            // Check if the gunner's health has reached zero or below, and end the game if so
            if (gunner.health <= 0) {
                endGame();
            }
        }
    });
}

// Function that serves as the game loop responsible for updating the game and rendering frames
function gameLoop() {
    // Check if the game is not paused and the game is not over
    if (!isPaused && !isGameOver) {
        // Call the 'update' function to update the game state
        update();

        // Iterate through all targets to simulate enemy shooting with a certain probability
        targets.forEach((target) => {
            // Randomly determine if the target should shoot (approx. 1% chance per frame)
            if (Math.random() < 0.01) {
                shootTargetBullet(target); // Call a function to make the target shoot a bullet
            }
        });
    }

    // Request the next animation frame to continue the game loop
    requestAnimationFrame(gameLoop);
}

// Declaration of game-related variables

let gameInterval;     // Variable to store the game loop interval
let startTime;        // Variable to store the start time of the game
let remainingTime = 120; // Variable to store the remaining game time (in seconds)
let isPaused = false; // Variable to track whether the game is currently paused
let isGameOver = false; // Variable to track whether the game is over
let score = 0;        // Variable to keep track of the player's score

// Update the score display element with the initial score value
scoreElement.textContent = `Score: ${score}`;








