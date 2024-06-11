
// DOM element variables

// Get the canvas element and its 2D rendering context
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");

// Get the button elements
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");
const endButton = document.querySelector(".end-button");

// Get the timer, health, and score display elements
const timerElement = document.querySelector(".timer");
const healthElement = document.querySelector(".health");
const scoreElement = document.querySelector(".score");

// Get the directional control buttons
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

// Get the shoot button
const shootButton = document.querySelector(".shoot-button");

// Preload game assets (images and audio)
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const assets = {
  fighterJetImage: new Image(),
  targetImage: new Image(),
  bulletImage: new Image(),
  backgroundMusic: new Audio("assets/audio/maintheme-music.mp3"),
  backgroundMusic2: new Audio("assets/audio/background-music-2.mp3"),
  gunshotAudio: new Audio("assets/audio/heavymachinegun-6998.mp3"),
  targetGunshotAudio: new Audio("assets/audio/target-gunfire-2.mp3")
};

let assetsLoaded = 0;
const totalAssets = 7;

function checkAllAssetsLoaded() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    // Start the game loop only when all images and audio files are loaded
    startGame();
  }
}

assets.fighterJetImage.src = "assets/images/player-1-jet-fixed.png";
assets.fighterJetImage.onload = checkAllAssetsLoaded;

assets.targetImage.src = "assets/images/target-enemy.png";
assets.targetImage.onload = checkAllAssetsLoaded;

assets.bulletImage.src = "assets/images/player-bullet-image.png";
assets.bulletImage.onload = checkAllAssetsLoaded;

assets.backgroundMusic.oncanplaythrough = checkAllAssetsLoaded;
assets.backgroundMusic2.oncanplaythrough = checkAllAssetsLoaded;
assets.gunshotAudio.oncanplaythrough = checkAllAssetsLoaded;
assets.targetGunshotAudio.oncanplaythrough = checkAllAssetsLoaded;

assets.backgroundMusic.volume = 0.5;
assets.backgroundMusic2.volume = 1;
assets.gunshotAudio.volume = 1;
assets.targetGunshotAudio.volume = 1;

// Get the instructions button and instructions display elements
const instructionsButton = document.querySelector(".instructions-button");
const instructions = document.querySelector(".instructions");

// Initialize the shooting interval and leaderboard variables
let shootingInterval;
let leaderboard = [];

// Define a constant for speed increment
const speedIncrement = 0.10; // Increase speed by 0.5 units every time

// Add an event listener to the instructionsButton element
instructionsButton.addEventListener("click", () => {
  if (instructions.style.display === "none") {
    instructions.style.display = "block";
    instructionsButton.textContent = "Hide Instructions";
  } else {
    instructions.style.display = "none";
    instructionsButton.textContent = "Show Instructions";
  }
});

// Gunner object representing the player
const gunner = {
  x: 80, // Initial x-coordinate at the left edge of the canvas
  y: canvas.height / 2, // Initial y-coordinate at the center of the canvas
  speed: 3, // The speed of the gunner character
  angle: 0, // The angle at which the gunner is facing (in degrees)
  health: 100, // The health points of the gunner character
  movingUp: false,
  movingDown: false,
  movingLeft: false, // Added for left movement
  movingRight: false, // Added for right movement
  shootingDirection: 0, // 0 for right, 180 for left
};

// Initialize arrays to store bullets, targets, and enemy bullets
const bullets = []; // Store bullets fired by the gunner
const targets = []; // Store targets or enemies
const enemyBullets = []; // Store bullets fired by enemies

// Initialize a boolean variable 'isShooting' to track if the gunner is shooting
let isShooting = false;

// Function to draw the gunner character on the canvas
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function drawGunner() {
  // Save the current canvas state
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
  ctx.save();

  // Move the canvas origin to the gunner's position
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
  ctx.translate(gunner.x, gunner.y);

  // Rotate the canvas to align with the gunner's shooting direction
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
  ctx.rotate(gunner.shootingDirection * (Math.PI / 180));

  // Set the dimensions for the fighter jet image
  let jetWidth = 120;
  let jetHeight = 88;

  // Function to adjust jet size based on screen width
  function adjustJetSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      jetWidth = 60;
      jetHeight = (60 / 120) * 88; // Maintain aspect ratio
    } else if (screenWidth <= 768) {
      jetWidth = 90;
      jetHeight = (90 / 120) * 88; // Maintain aspect ratio
    } else {
      jetWidth = 120;
      jetHeight = 88;
    }
  }

  // Add event listeners to adjust jet size on window resize and DOM content load
  window.addEventListener('resize', adjustJetSize);
  document.addEventListener('DOMContentLoaded', adjustJetSize);

  // Draw the gunner image centered at the current canvas origin
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    assets.fighterJetImage,
    -jetWidth / 2, // Center the image horizontally
    -jetHeight / 2, // Center the image vertically
    jetWidth, // Width of the image
    jetHeight // Height of the image
  );

  // Set the dimensions for the health bar
  const healthBarWidth = 50;
  const healthBarHeight = 2;
  const healthBarX = -healthBarWidth / 2; // Center the health bar horizontally
  const healthBarY = jetHeight / 2 + 10; // Position the health bar below the gunner

  // Set the fill color for the health bar
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
  ctx.fillStyle = "black";

  // Draw the health bar representing the gunner's health
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
  ctx.fillRect(
    healthBarX,
    healthBarY,
    healthBarWidth * (gunner.health / 100), // Width proportional to the gunner's health
    healthBarHeight
  );

  // Restore the canvas state to what it was before the transformations
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
  ctx.restore();
}

// Function to draw bullets on the canvas
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function drawBullets() {
  // Iterate through each bullet in the bullets array
  bullets.forEach((bullet) => {
    // Set the fill color to green for player bullets
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
    ctx.fillStyle = "green";

    // Begin a new path for the bullet
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
    ctx.beginPath();

    // Draw a circle to represent the bullet
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);

    // Fill the bullet with the specified color
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
    ctx.fill();

    // Close the path for the bullet
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
    ctx.closePath();
  });

  // Iterate through each bullet in the enemyBullets array
  enemyBullets.forEach((bullet) => {
    // Set the fill color to red for enemy bullets
    ctx.fillStyle = "red";

    // Begin a new path for the enemy bullet
    ctx.beginPath();

    // Draw a circle to represent the enemy bullet
    ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);

    // Fill the enemy bullet with the specified color
    ctx.fill();

    // Close the path for the enemy bullet
    ctx.closePath();
  });
}

// Function to draw targets (enemies) on the canvas
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
function drawTargets() {
  // Iterate through each target in the targets array
  targets.forEach((target) => {
    // Save the current canvas state
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
    ctx.save();

    // Move the canvas origin to the target's position
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
    ctx.translate(target.x, target.y);

    // Rotate the canvas to align with the target's angle
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
    ctx.rotate(target.angle);

    // Set the dimensions for the target image
    const targetWidth = 80;
    const targetHeight = 48;

    // Draw the target image centered at the current canvas origin
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(
      assets.targetImage,
      -targetWidth / 2, // Center the image horizontally
      -targetHeight / 2, // Center the image vertically
      targetWidth, // Width of the image
      targetHeight // Height of the image
    );

    // Restore the canvas state to what it was before the transformations
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
    ctx.restore();
  });
}

// Function to clear the entire canvas
function clearCanvas() {
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the game state and perform various game-related tasks
/**
 * Updates the game state for each frame.
 * Clears the canvas, handles user input, updates the positions of bullets and targets,
 * checks for collisions, and handles game over conditions.
 */
function update() {
  // Clear the canvas to prepare for the new frame
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
  clearCanvas();

  // Handle user input for character movement and actions
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
  handleInput();

  // Draw the gunner character on the canvas
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  drawGunner();

  // Draw all bullets fired by the player and enemies
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  drawBullets();

  // Update the position of each bullet based on its speed and direction
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
  bullets.forEach((bullet) => {
    const bulletDirection = {
      x: Math.cos(bullet.angle),
      y: Math.sin(bullet.angle),
    };

    // Move the bullet along its trajectory
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    bullet.x += bullet.speed * bulletDirection.x;
    bullet.y += bullet.speed * bulletDirection.y;
  });

  // Update the position of each enemy bullet
  enemyBullets.forEach((bullet) => {
    bullet.x += bullet.speed * Math.cos(bullet.angle);
    bullet.y += bullet.speed * Math.sin(bullet.angle);
  });

  // Update the position and angle of each target (enemy)
  targets.forEach((target) => {
    const dx = gunner.x - target.x;
    const dy = gunner.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between gunner and target
    const angleToGunner = Math.atan2(dy, dx); // Calculate the angle to the gunner
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2

    target.angle = angleToGunner; // Rotate the target to face the gunner

    // Move the target towards the gunner
    target.x += target.speed * Math.cos(target.angle);
    target.y += target.speed * Math.sin(target.angle);

    // Keep target within canvas bounds
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    target.x = Math.max(0, Math.min(canvas.width, target.x));
    target.y = Math.max(0, Math.min(canvas.height, target.y));

    // Check for collision with the gunner
    if (distance < 15) {
      gunner.health -= 2; // Reduce gunner's health
      healthElement.textContent = `Health: ${gunner.health}%`; // Update health display
      if (gunner.health <= 0) {
        endGame(); // End the game if gunner's health reaches zero
      }
    }
  });

  // Draw all targets (enemies) on the canvas
  drawTargets();

  // Handle collisions between bullets and targets
  handleCollisions();

  // Check if the game is over and the gunner's health is depleted
  if (isGameOver && gunner.health <= 0) {
    clearCanvas(); // Clear the canvas for the game over message
    drawDeathMessage(); // Display the game over message
    return; // Return early to avoid executing other parts of the function
  }
}

// Function to handle player input for character movement and aiming
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
function handleInput() {
  // Move gunner up if 'movingUp' flag is set and gunner is within canvas bounds
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
  if (gunner.movingUp && gunner.y - gunner.speed > 0) {
    gunner.y -= gunner.speed;
  }

  // Move gunner down if 'movingDown' flag is set and gunner is within canvas bounds
  if (gunner.movingDown && gunner.y + gunner.speed < canvas.height) {
    gunner.y += gunner.speed;
  }

  // Move gunner left if 'movingLeft' flag is set and gunner is within canvas bounds
  if (gunner.movingLeft && gunner.x - gunner.speed > 0) {
    gunner.x -= gunner.speed;
  }

  // Move gunner right if 'movingRight' flag is set and gunner is within canvas bounds
  if (gunner.movingRight && gunner.x + gunner.speed < canvas.width) {
    gunner.x += gunner.speed;
  }
}

// Function to handle collisions between bullets and targets, and between enemy bullets and the gunner
// Reference: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// Additional Reference: https://gamedevelopment.tutsplus.com/tutorials/quick-tip-collision-detection-with-the-separating-axis-theorem--gamedev-169
function handleCollisions() {
  // Check for collisions between player bullets and targets
  bullets.forEach((bullet, bulletIndex) => {
    targets.forEach((target, targetIndex) => {
      // Simple bounding box collision detection
      if (
        bullet.x > target.x - 15 &&
        bullet.x < target.x + 15 &&
        bullet.y > target.y - 15 &&
        bullet.y < target.y + 15
      ) {
        // Remove the bullet and target from their respective arrays
        bullets.splice(bulletIndex, 1);
        targets.splice(targetIndex, 1);

        // Increase score when a target is hit
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
      }
    });
  });

  // Check for collisions between enemy bullets and the gunner
  enemyBullets.forEach((bullet, bulletIndex) => {
    const dx = gunner.x - bullet.x;
    const dy = gunner.y - bullet.y;
    const distance = Math.sqrt(dx * dx + dy * dy); // Calculate distance between gunner and bullet

    // If distance is less than threshold, a collision occurred
    if (distance < 5) {
      gunner.health -= 10; // Decrease gunner's health
      healthElement.textContent = `Health: ${gunner.health}%`;
      enemyBullets.splice(bulletIndex, 1); // Remove the enemy bullet

      // End game if gunner's health is zero or less
      if (gunner.health <= 0) {
        endGame();
      }
    }
  });
}

// Function that serves as the game loop responsible for updating the game and rendering frames
function gameLoop() {
  if (!isPaused && !isGameOver) {
    update();
    targets.forEach((target) => {
      if (Math.random() < 0.01) {
        shootTargetBullet(target);
      }
    });
  }
  requestAnimationFrame(gameLoop);
}

// Declaration of game-related variables
let gameInterval;
let startTime;
let remainingTime = 120;
let isPaused = false;
let isGameOver = false;
let score = 0;
let gameIsRunning = false; // Added this to track the game running state

scoreElement.textContent = `Score: ${score}`;

// Function to update the game timer and check for game over conditions
function updateTimer() {
  if (!isPaused && !isGameOver) {
    // Get the current time in milliseconds since the epoch
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
    const currentTime = new Date().getTime();

    // Calculate the elapsed time in seconds
    const elapsedTime = (currentTime - startTime) / 1000;

    // Update the remaining game time, ensuring it doesn't go below zero
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    remainingTime = Math.max(0, remainingTime - elapsedTime);

    // Check if the game should end due to time running out or the gunner's health reaching zero
    // Reference: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (remainingTime <= 0 || gunner.health <= 0) {
      endGame();
    }

    // Calculate minutes and seconds from the remaining time
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);

    // Format the time as MM:SS with leading zeros if needed
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Update the timer display element with the formatted time
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/textContent
    timerElement.textContent = `Time left: ${formattedTime}`;

    // Update the start time for the next calculation
    startTime = currentTime;
  }
}

// Event listener for the "Start" button click
startButton.addEventListener("click", () => {
  if (!gameInterval) {
    resetGame();
    startGame();
  }
});

// Event listener for the "Pause" button click
pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

// Event listener for the "End" button click
endButton.addEventListener("click", () => {
  endGame();
});

// Function to validate the player name input
function validatePlayerName() {
  const playerName = document.querySelector(".player-name").value.trim();
  if (!playerName) {
    alert("Player name cannot be empty!");
  } else {
    startGame();
  }
}

// Existing startGame function modified to remove inline event handler
function startGame() {
  // Existing code to start the game
  const playerNameInput = document.querySelector(".player-name");
  const playerNameDisplay = document.querySelector(".player-name-display");
  const playerName = playerNameInput.value.trim();

  // Check if the player name is not empty
  if (playerName !== "") {
    // Hide the player name input and display the player name
    playerNameInput.style.display = "none";
    playerNameDisplay.textContent = `Player: ${playerName}`;
    playerNameDisplay.style.display = "inline";

    // Set up the shooting interval to call the shoot function every 100 milliseconds
    shootingInterval = setInterval(shoot, 100);

    // Hide the start button and display the game canvas
    startButton.style.display = "none";
    canvas.style.display = "block";

    // Initialize the game start time
    startTime = new Date().getTime();

    // Set up the game interval to call the updateTimer function every second
    gameInterval = setInterval(updateTimer, 1000);

    // Set up the interval to spawn targets every second
    setInterval(spawnTargets, 2000);

    // Set the game running state to true
    gameIsRunning = true;

    // Start the game loop
    gameLoop();

    // Play background music with error handling
    assets.backgroundMusic.play().catch((error) => {
      console.error("Background music play failed:", error);
    });

    assets.backgroundMusic2.play().catch((error) => {
      console.error("Background music 2 play failed:", error);
    });
  }
}

// Event listener for the "Start" button click
startButton.addEventListener("click", validatePlayerName);


function endGame() {
  // Clear the game interval to stop the timer
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  clearInterval(gameInterval);

  // Set the game over flag to true
  isGameOver = true;

  // Enable the start button and disable the pause and end buttons
  startButton.disabled = false;
  pauseButton.disabled = true;
  endButton.disabled = true;

  // Pause the background music and reset its playback position
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
  assets.backgroundMusic.pause();
  assets.backgroundMusic.currentTime = 0;
  assets.backgroundMusic2.pause();
  assets.backgroundMusic2.currentTime = 0;

  // Stop the shooting sound
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
  isShooting = false; // Stop shooting
  assets.gunshotAudio.pause();
  assets.gunshotAudio.currentTime = 0;

  // Get the player's name from the input field
  // Reference: https://www.w3schools.com/jsref/prop_text_value.asp
  const playerName = document.querySelector(".player-name").value;

  // Create a player stats object with the player's name, score, and remaining time
  const playerStats = {
    name: playerName,
    score: score,
    time: remainingTime,
  };

  // Add the player stats to the leaderboard array
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  leaderboard.push(playerStats);

  // Clear the shooting interval to stop the player from shooting
  clearInterval(shootingInterval);

  // Check if the gunner's health is zero or less
  if (gunner.health <= 0) {
    // Clear the canvas and draw the death message
    clearCanvas();
    drawDeathMessage();
  }
}


function resetGame() {
  // Reset the gunner's position to the left edge of the canvas and center vertically
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
  gunner.x = 80;
  gunner.y = canvas.height / 2;

  // Reset the gunner's health to 100%
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/textContent
  gunner.health = 100;
  healthElement.textContent = `Health: ${gunner.health}%`;

  // Clear the arrays storing bullets and targets
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
  bullets.length = 0;
  targets.length = 0;
  enemyBullets.length = 0;

  // Reset the remaining time, pause state, and game over state
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
  remainingTime = 120;
  isPaused = false;
  isGameOver = false;

  // Reset the pause button text to "Pause"
  pauseButton.textContent = "Pause";

  // Reset the player's score to 0 and update the score display
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/textContent
  score = 0;
  scoreElement.textContent = `Score: ${score}`;

  // Clear any existing intervals for the game and shooting
  clearInterval(gameInterval);
  clearInterval(shootingInterval);

  // Reset the game's start time
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
  startTime = new Date().getTime();

  // Clear the canvas
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
  clearCanvas();

  // Enable the start, pause, and end buttons
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/disabled
  startButton.disabled = false;
  pauseButton.disabled = false;
  endButton.disabled = false;

  // Reset the player name input and display elements
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
  const playerNameInput = document.querySelector(".player-name");
  const playerNameDisplay = document.querySelector(".player-name-display");
  playerNameInput.style.display = "inline";
  playerNameInput.value = "";
  playerNameDisplay.style.display = "none";
  playerNameDisplay.textContent = "";

  // Show the start button again
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
  startButton.style.display = "inline";

  // Pause and reset the background music
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
  assets.backgroundMusic.pause();
  assets.backgroundMusic.currentTime = 0;
  assets.backgroundMusic2.pause();
  assets.backgroundMusic2.currentTime = 0;

  // Stop the shooting sound
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
  isShooting = false; // Stop shooting
  assets.gunshotAudio.pause();
  assets.gunshotAudio.currentTime = 0;

  // Ensure any other intervals are cleared
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }

  // Clear isGunshotPlaying flag
  isGunshotPlaying = false;

  // Re-initialize game elements
  gameInterval = null;
  shootingInterval = null;
}


// Event listener for the "Reset" button click
resetButton.addEventListener("click", () => {
  resetGame();
});

// Ensure startGame does not get called twice
startButton.addEventListener("click", () => {
  if (!gameIsRunning) {
    startGame();
  }
});


// Event listener to handle keyboard keydown events
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
window.addEventListener("keydown", (event) => {
  if (isPaused) {
    return; // Do nothing if the game is paused
  }

  if (event.key === "w") {
    // Move gunner up when 'w' key is pressed
    gunner.movingUp = true;
  } else if (event.key === "s") {
    // Move gunner down when 's' key is pressed
    gunner.movingDown = true;
  } else if (event.key === "a") {
    // Move gunner left when 'a' key is pressed
    gunner.movingLeft = true;
  } else if (event.key === "d") {
    // Move gunner right when 'd' key is pressed
    gunner.movingRight = true;
  } else if (event.key === " ") {
    // Start shooting when spacebar is pressed
    isShooting = true;
  }
});

// Event listener to handle keyboard keyup events
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
window.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    // Stop moving gunner up when 'w' key is released
    gunner.movingUp = false;
  } else if (event.key === "s") {
    // Stop moving gunner down when 's' key is released
    gunner.movingDown = false;
  } else if (event.key === "a") {
    // Stop moving gunner left when 'a' key is released
    gunner.movingLeft = false;
  } else if (event.key === "d") {
    // Stop moving gunner right when 'd' key is released
    gunner.movingRight = false;
  } else if (event.key === " ") {
    // Stop shooting when spacebar is released
    isShooting = false;
  }
});


// Event listeners for touch controls on buttons (touchstart)
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
upButton.addEventListener(
  "touchstart",
  () => {
    gunner.movingUp = true;
  },
  { passive: false }
);
downButton.addEventListener(
  "touchstart",
  () => {
    gunner.movingDown = true;
  },
  { passive: false }
);
leftButton.addEventListener(
  "touchstart",
  () => {
    gunner.movingLeft = true;
  },
  { passive: false }
);
rightButton.addEventListener(
  "touchstart",
  () => {
    gunner.movingRight = true;
  },
  { passive: false }
);
shootButton.addEventListener(
  "touchstart",
  () => {
    isShooting = true;
  },
  { passive: false }
);

// Event listeners for touch controls on buttons (touchend)
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
upButton.addEventListener(
  "touchend",
  () => {
    gunner.movingUp = false;
  },
  { passive: false }
);
downButton.addEventListener(
  "touchend",
  () => {
    gunner.movingDown = false;
  },
  { passive: false }
);
leftButton.addEventListener(
  "touchend",
  () => {
    gunner.movingLeft = false;
  },
  { passive: false }
);
rightButton.addEventListener(
  "touchend",
  () => {
    gunner.movingRight = false;
  },
  { passive: false }
);
shootButton.addEventListener(
  "touchend",
  () => {
    isShooting = false;
  },
  { passive: false }
);

// Function to handle touch events for shooting
function handleTouchEvents(event) {
  event.preventDefault(); // Prevent default touch behavior
  const rect = canvas.getBoundingClientRect();

  if (event.type === "touchstart" || event.type === "touchmove") {
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;

    isShooting = true;
  } else if (event.type === "touchend") {
    isShooting = false;
  }
}

// Add touch event listeners to the canvas for shooting
canvas.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    handleTouchEvents(event);
    isTouching = true;
  },
  { passive: false }
);

canvas.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();

    if (isTouching) {
      handleTouchEvents(event);
      isShooting = true;
    }
  },
  { passive: false }
);

canvas.addEventListener(
  "touchend",
  (event) => {
    event.preventDefault();
    handleTouchEvents(event);

    isTouching = false;
    isShooting = false;
  },
  { passive: false }
);

// Add global touch event listeners to prevent default behavior only when interacting with the canvas
document.addEventListener(
  "touchstart",
  (event) => {
    if (event.target === canvas) {
      event.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (event.target === canvas) {
      event.preventDefault();
    }
  },
  { passive: false }
);

// Function to draw a death message on the canvas
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
function drawDeathMessage() {
  ctx.fillStyle = "red";
  ctx.font = "40px 'Black Ops One', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("You Died!", canvas.width / 2, canvas.height / 2);
}

let isGunshotPlaying = false;

// Function to handle shooting action
function shoot() {
  // Check if the game is over
  if (isGameOver) {
    return; // Do nothing if the game is over
  }

  // Check if the player is shooting
  if (isShooting) {
    // Play the gunshot audio if it's not already playing
    if (!isGunshotPlaying) {
      // Reset audio to the beginning and play it
      // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
      assets.gunshotAudio.currentTime = 0;
      assets.gunshotAudio.play().catch((error) => {
        console.error("Gunshot audio play failed:", error);
      });
      isGunshotPlaying = true;
    }

    // Create a new bullet object with the gunner's position and direction
    const bullet = {
      x: gunner.x,
      y: gunner.y,
      speed: 3,
      angle: gunner.shootingDirection * (Math.PI / 180), // Convert angle to radians
    };

    // Add the bullet to the bullets array
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    bullets.push(bullet);
  } else {
    // Stop the gunshot audio if the player is not shooting
    isGunshotPlaying = false;
    assets.gunshotAudio.pause();
  }
}

// Function to shoot a bullet from an enemy target towards the player's position
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
function shootTargetBullet(target) {
  // Calculate the angle from the target to the gunner
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  const angle = Math.atan2(gunner.y - target.y, gunner.x - target.x);

  // Create a bullet object with the calculated angle and predefined speed
  const bullet = {
    x: target.x,
    y: target.y,
    speed: 4.5,
    angle: angle,
  };

  // Add the bullet to the array of enemy bullets
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  enemyBullets.push(bullet);

  // Play the target's gunshot audio
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
  assets.targetGunshotAudio.currentTime = 0;
  assets.targetGunshotAudio.play().catch((error) => {
    console.error("Target gunshot audio play failed:", error);
  });
}

// Function to spawn targets at random positions with increasing speed
function spawnTargets() {
  // Get the height of the canvas
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/height
  const canvasHeight = canvas.height;

  // Generate a random y-coordinate for the target within the canvas height
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const targetY = Math.random() * canvasHeight;

  // Get the current time in milliseconds since the Unix epoch
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
  const currentTime = new Date().getTime();

  // Calculate the elapsed time in seconds since the game started
  const elapsedTime = (currentTime - startTime) / 1000;

  // Calculate the number of elapsed intervals (1-second intervals)
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  const elapsedIntervals = Math.floor(elapsedTime / 1);

  // Calculate the speed of the target with a random component and increasing speed over time
  const targetSpeed = Math.random() * (0.25 + speedIncrement * elapsedIntervals) + 0.25;

  // Create a target object with random position, calculated speed, and angle towards the gunner
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
  const target = {
    x: canvas.width,
    y: targetY,
    speed: targetSpeed,
    angle: Math.atan2(gunner.y - targetY, gunner.x - canvas.width),
  };

  // Add the target to the array of targets
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  targets.push(target);

  // If the game is running and a random condition is met, make the target shoot a bullet
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if (gameIsRunning && Math.random() < 0.01) {
    shootTargetBullet(target);
  }
}

// Set an interval to repeatedly call the shoot function
setInterval(shoot, 200);

// Start the game loop
gameLoop();






















