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

// Function to update the game timer and check for game over conditions
function updateTimer() {
    // Check if the game is not paused and the game is not over
    if (!isPaused && !isGameOver) {
        // Get the current time in milliseconds
        const currentTime = new Date().getTime();

        // Calculate the elapsed time since the last update and convert it to seconds
        const elapsedTime = (currentTime - startTime) / 1000;

        // Update the remaining game time while ensuring it doesn't go below zero
        remainingTime = Math.max(0, remainingTime - elapsedTime);

        // Check if the game has ended due to running out of time or the gunner's health
        if (remainingTime <= 0 || gunner.health <= 0) {
            endGame(); // Call the endGame function to handle game over
        }

        // Calculate minutes and seconds from the remaining time
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60);

        // Format the time in MM:SS format with leading zeros
        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;

        // Update the timer display element with the formatted time
        timerElement.textContent = `Time left: ${formattedTime}`;

        // Update the start time to the current time for the next iteration
        startTime = currentTime;
    }
}

// Event listener for the "Start" button click
startButton.addEventListener("click", () => {
    // Check if the game interval is not already running
    if (!gameInterval) {
        resetGame(); // Reset the game state (additional function call)
        startGame(); // Start the game
    }
});

// Event listener for the "Pause" button click
pauseButton.addEventListener("click", () => {
    // Toggle the game's pause state (paused or resumed)
    isPaused = !isPaused;

    // Update the button text to reflect the current pause state
    if (isPaused) {
        pauseButton.textContent = "Resume"; // Set button text to "Resume" when paused
    } else {
        pauseButton.textContent = "Pause"; // Set button text to "Pause" when resumed
    }
});

// Event listener for the "End" button click
endButton.addEventListener("click", () => {
    endGame(); // Call the endGame function to end the game
});

// Function to start the game and initialize game elements
function startGame() {
    // Get references to relevant HTML elements
    const startButton = document.querySelector(".start-button");
    const playerNameInput = document.querySelector(".player-name");
    const playerNameDisplay = document.querySelector(".player-name-display");

    // Get the trimmed player name from the input field
    const playerName = playerNameInput.value.trim();

    // Check if a valid player name is provided (not empty)
    if (playerName !== "") {
        // Hide the input field and display the player's name
        playerNameInput.style.display = "none";
        playerNameDisplay.textContent = `Player: ${playerName}`;
        playerNameDisplay.style.display = "inline"; // Show the name display

        // Start shooting at regular intervals
        shootingInterval = setInterval(shoot, 100);

        // Hide the start button and display the game canvas
        startButton.style.display = "none";
        canvas.style.display = "block";

        // Reset the game state
        resetGame();

        // Call the function to periodically spawn targets after the game starts
        setInterval(spawnTargets, 1000);

        // Disable the start button and initialize game timers
        startButton.disabled = true;
        startTime = new Date().getTime();
        gameInterval = setInterval(updateTimer, 1000);

        // Start the game loop for continuous updates and rendering
        gameLoop();

        // Play the background music
        backgroundMusic.play();
    }
}

// Function to handle game ending and cleanup
function endGame() {
    // Clear the game interval to stop continuous updates
    clearInterval(gameInterval);

    // Mark the game as over
    isGameOver = true;

    // Enable the "Start" button and disable the "Pause" and "End" buttons
    startButton.disabled = false;
    pauseButton.disabled = true;
    endButton.disabled = true;

    // Pause or stop background music and sound effects
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset audio to the beginning
    backgroundMusic2.pause();
    backgroundMusic2.currentTime = 0;

    // Retrieve the player's name from the input field
    const playerName = document.querySelector(".player-name").value;

    // Create a player stats object with name, score, and remaining time
    const playerStats = {
        name: playerName,
        score: score,
        time: remainingTime,
    };

    // Add the player's stats to the leaderboard array
    leaderboard.push(playerStats);

    // Clear the shooting interval
    clearInterval(shootingInterval);

    // Check if the game ended due to the gunner's health reaching zero
    if (gunner.health <= 0) {
        clearCanvas(); // Clear the game canvas
        drawDeathMessage(); // Display a message indicating the game over condition
    }
}

// Function to reset the game state and prepare for a new game
function resetGame() {
    // Reset the gunner's position to the center of the canvas and health to 100%
    gunner.x = canvas.width / 2;
    gunner.y = canvas.height / 2;
    gunner.health = 100;

    // Update the health display element with the new health value
    healthElement.textContent = `Health: ${gunner.health}%`;

    // Clear the arrays for bullets, targets, and enemy bullets
    bullets.length = 0;
    targets.length = 0;
    enemyBullets.length = 0;

    // Reset the remaining game time, pause and game over states
    remainingTime = 120;
    isPaused = false;
    isGameOver = false;

    // Reset the "Pause" button text to "Pause"
    pauseButton.textContent = "Pause";

    // Reset the player's score to 0 and update the score display element
    score = 0;
    scoreElement.textContent = `Score: ${score}`;

    // Reset the game's start time
    startTime = new Date().getTime();

    // Clear the game canvas
    clearCanvas();

    // Hide any displayed death message by clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Enable the "Start," "Pause," and "End" buttons
    startButton.disabled = false;
    pauseButton.disabled = false;
    endButton.disabled = false;

    // Reset the player's name display and show the input field
    const playerNameInput = document.querySelector(".player-name");
    const playerNameDisplay = document.querySelector(".player-name-display");
    playerNameInput.style.display = "inline";
    playerNameInput.value = ""; // Clear the input value
    playerNameDisplay.style.display = "none";
    playerNameDisplay.textContent = "";

    // Stop and reset background music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic2.pause();
    backgroundMusic2.currentTime = 0;

    // Reset the leaderboard
    leaderboard = [];

    // Resume the game loop if it was paused
    if (!gameInterval) {
        startTime = new Date().getTime();
        gameInterval = setInterval(updateTimer, 1000);
        gameLoop();
    }
}

// Object to store mouse coordinates
const mouse = {
    x: 0,
    y: 0,
};

// Event listener to track mouse movement within the game canvas
canvas.addEventListener("mousemove", (event) => {
    // Get the canvas's position relative to the viewport
    const rect = canvas.getBoundingClientRect();

    // Update the mouse object with the current mouse coordinates
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Event listener to handle keyboard keydown events
window.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        gunner.movingUp = true; // Set gunner's upward movement flag to true
    } else if (event.key === "s") {
        gunner.movingDown = true; // Set gunner's downward movement flag to true
    } else if (event.key === "a") {
        gunner.movingLeft = true; // Set gunner's leftward movement flag to true
    } else if (event.key === "d") {
        gunner.movingRight = true; // Set gunner's rightward movement flag to true
    } else if (event.key === " ") {
        // Space bar pressed, initiate shooting
        isShooting = true; // Set the shooting flag to true
    }
});

// Event listener to handle keyboard keyup events
window.addEventListener("keyup", (event) => {
    if (event.key === "w") {
        gunner.movingUp = false; // Set gunner's upward movement flag to false
    } else if (event.key === "s") {
        gunner.movingDown = false; // Set gunner's downward movement flag to false
    } else if (event.key === "a") {
        gunner.movingLeft = false; // Set gunner's leftward movement flag to false
    } else if (event.key === "d") {
        gunner.movingRight = false; // Set gunner's rightward movement flag to false
    } else if (event.key === " ") {
        // Space bar released, stop shooting
        isShooting = false; // Set the shooting flag to false
    }
});

// Event listeners for touch controls on buttons (touchstart)
document.querySelector(".up-button").addEventListener("touchstart", () => {
    gunner.movingUp = true; // Set gunner's upward movement flag to true
});

document.querySelector(".down-button").addEventListener("touchstart", () => {
    gunner.movingDown = true; // Set gunner's downward movement flag to true
});

document.querySelector(".left-button").addEventListener("touchstart", () => {
    gunner.movingLeft = true; // Set gunner's leftward movement flag to true
});

document.querySelector(".right-button").addEventListener("touchstart", () => {
    gunner.movingRight = true; // Set gunner's rightward movement flag to true
});

document.querySelector(".shoot-button").addEventListener("touchstart", () => {
    // Space bar pressed, initiate shooting
    isShooting = true; // Set the shooting flag to true
});

// Event listeners for touch controls on buttons (touchend)
document.querySelector(".up-button").addEventListener("touchend", () => {
    gunner.movingUp = false; // Set gunner's upward movement flag to false
});

document.querySelector(".down-button").addEventListener("touchend", () => {
    gunner.movingDown = false; // Set gunner's downward movement flag to false
});

document.querySelector(".left-button").addEventListener("touchend", () => {
    gunner.movingLeft = false; // Set gunner's leftward movement flag to false
});

document.querySelector(".right-button").addEventListener("touchend", () => {
    gunner.movingRight = false; // Set gunner's rightward movement flag to false
});

document.querySelector(".shoot-button").addEventListener("touchend", () => {
    // Space bar released, stop shooting
    isShooting = false; // Set the shooting flag to false
});

// Handle mousemove event (if needed)
canvas.addEventListener("mousemove", (event) => {
    // Get the canvas's position relative to the viewport
    const rect = canvas.getBoundingClientRect();

    // Update the mouse object with the current mouse coordinates
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Handle keyboard events (if needed)
window.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        gunner.movingUp = true; // Set gunner's upward movement flag to true
    } else if (event.key === "s") {
        gunner.movingDown = true; // Set gunner's downward movement flag to true
    } else if (event.key === "a") {
        gunner.movingLeft = true; // Set gunner's leftward movement flag to true
    } else if (event.key === "d") {
        gunner.movingRight = true; // Set gunner's rightward movement flag to true
    } else if (event.key === " ") {
        // Space bar pressed, initiate shooting
        isShooting = true; // Set the shooting flag to true
    }
});

// Handle keyboard keyup events (if needed)
window.addEventListener("keyup", (event) => {
    if (event.key === "w") {
        gunner.movingUp = false; // Set gunner's upward movement flag to false
    } else if (event.key === "s") {
        gunner.movingDown = false; // Set gunner's downward movement flag to false
    } else if (event.key === "a") {
        gunner.movingLeft = false; // Set gunner's leftward movement flag to false
    } else if (event.key === "d") {
        gunner.movingRight = false; // Set gunner's rightward movement flag to false
    } else if (event.key === " ") {
        // Space bar released, stop shooting
        isShooting = false; // Set the shooting flag to false
    }
});

// Function to draw a death message on the canvas
function drawDeathMessage() {
    ctx.fillStyle = "red"; // Set the fill color to red for the death message
    ctx.font = "40px 'Black Ops One', sans-serif"; // Set the font and size
    ctx.textAlign = "center"; // Center-align the text
    ctx.fillText("You Died!", canvas.width / 2, canvas.height / 2); // Draw the death message in the center of the canvas
}

// Define a variable to keep track of whether the gunshot sound is currently playing
let isGunshotPlaying = false;

// Function to handle shooting action
function shoot() {
    if (isGameOver) {
        return; // Stop shooting when the game is over
    }

    if (isShooting) {
        if (!isGunshotPlaying) {
            gunshotAudio.currentTime = 0; // Reset the gunshot audio to the beginning
            gunshotAudio.play(); // Play the gunshot sound
            isGunshotPlaying = true; // Set the flag to indicate that the gunshot sound is playing
        }

        // Create a bullet object with its initial position, speed, and angle
        const bullet = {
            x: gunner.x,
            y: gunner.y,
            speed: 6, // Bullet's movement speed
            angle: Math.atan2(mouse.y - gunner.y, mouse.x - gunner.x), // Calculate the angle towards the mouse cursor
        };

        bullets.push(bullet); // Add the bullet to the bullets array
    } else {
        isGunshotPlaying = false; // Set the flag to indicate that the gunshot sound has stopped playing
        gunshotAudio.pause(); // Pause the gunshot sound
    }
}

// Function to shoot a bullet from an enemy target towards the player's position
function shootTargetBullet(target) {
    // Calculate the angle from the target to the player's position
    const angle = Math.atan2(gunner.y - target.y, gunner.x - target.x);

    // Create a bullet object for the enemy target with its initial position, speed, and angle
    const bullet = {
        x: target.x,
        y: target.y,
        speed: 4.5, // Bullet's movement speed
        angle: angle, // Angle towards the player's position
    };

    enemyBullets.push(bullet); // Add the bullet to the enemyBullets array

    // Play the target gunfire sound
    const targetGunshotAudio = document.querySelector(".target-gunshot-audio");
    targetGunshotAudio.currentTime = 0; // Reset the target gunfire audio to the beginning
    targetGunshotAudio.play(); // Play the target gunfire sound
}

// Initialize a variable to track whether the game is running
let gameIsRunning = false;

// Function to spawn enemy targets on the canvas
function spawnTargets() {
    // Get the height of the canvas
    const canvasHeight = canvas.height;

    // Generate a random Y-coordinate for the target within the canvas height
    const targetY = Math.random() * canvasHeight;

    // Get the current time to calculate elapsed time and intervals
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;

    // Calculate elapsed intervals (e.g., every 1 second)
    const elapsedIntervals = Math.floor(elapsedTime / 1);

    // Calculate the speed of the target with randomness and increment
    const targetSpeed =
        Math.random() * (1 + speedIncrement * elapsedIntervals) + 1;

    // Create a target object with its initial position, speed, and angle towards the player
    const target = {
        x: canvas.width, // Initial X-coordinate outside the canvas
        y: targetY, // Random Y-coordinate within the canvas height
        speed: targetSpeed, // Randomized target speed
        angle: Math.atan2(gunner.y - targetY, gunner.x - canvas.width), // Angle towards the player's position
    };

    targets.push(target); // Add the target to the targets array

    // Check if the game is running and randomly trigger shooting from the spawned target
    if (gameIsRunning && Math.random() < 0.01) {
        shootTargetBullet(target); // Call the shooting function for the spawned target
    }
}

// Set an interval to call the 'shoot' function repeatedly every 100 milliseconds
setInterval(shoot, 100); // Adjust the shooting interval as needed


function handleTouchEvents(event) {
    event.preventDefault(); // Prevent the default touch event behavior
    const rect = canvas.getBoundingClientRect();

    if (event.type === "touchstart" || event.type === "touchmove") {
        isShooting = true;

        // Calculate the angle between the gunner and touch point
        const touchX = event.touches[0].clientX - rect.left;
        const touchY = event.touches[0].clientY - rect.top;

        // Calculate the angle from the gunner's position to the touch point
        const deltaX = touchX - gunner.x;
        const deltaY = touchY - gunner.y;
        const angle = Math.atan2(deltaY, deltaX);

        // Set the gunner's angle to the calculated angle
        gunner.angle = angle;
    } else if (event.type === "touchend") {
        isShooting = false;
    }
}



// Add a flag to track if a touch is in progress
let isTouching = false;

// Prevent default touch events for the entire document except the canvas
document.addEventListener("touchstart", (event) => {
      if (event.target !== canvas) {
            event.preventDefault();
      }
});

document.addEventListener("touchmove", (event) => {
      if (event.target !== canvas) {
            event.preventDefault();
      }
});

// Event listener for touch start (when you touch the canvas)
canvas.addEventListener("touchstart", (event) => {
      event.preventDefault(); // Prevent the default touch event behavior
      handleTouchEvents(event);

      // Calculate and set the gunner's angle based on the touch coordinates
      const rect = canvas.getBoundingClientRect();
      const touchX = event.touches[0].clientX - rect.left;
      const touchY = event.touches[0].clientY - rect.top;
      gunner.angle = Math.atan2(touchY - gunner.y, touchX - gunner.x);

      // Indicate that a touch is in progress
      isTouching = true;
});

// Event listener for touch move (when you move your finger on the canvas)
canvas.addEventListener("touchmove", (event) => {
      event.preventDefault(); // Prevent the default touch event behavior

      // Only handle touch events when a touch is in progress
      if (isTouching) {
            handleTouchEvents(event);

            // Calculate and update the gunner's angle continuously based on touch coordinates
            const rect = canvas.getBoundingClientRect();
            const touchX = event.touches[0].clientX - rect.left;
            const touchY = event.touches[0].clientY - rect.top;
            gunner.angle = Math.atan2(touchY - gunner.y, touchX - gunner.x);

            // Enable shooting while touching and moving
            isShooting = true;
      }
});

// Event listener for touch end (when you release your finger from the canvas)
canvas.addEventListener("touchend", (event) => {
      event.preventDefault(); // Prevent the default touch event behavior
      handleTouchEvents(event);

      // Indicate that the touch has ended and stop shooting
      isTouching = false;
      isShooting = false;
});


// Start the game loop, which continuously updates the game state and animations
gameLoop();























