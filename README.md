# Isolation - Jetfighter Shooter Website

Welcome to the Isolation Jetfighter Shooter website, where you can immerse yourself in an action-packed 2D JavaScript game. Take control of a fighter jet, eliminate hostile forces, and strive for victory in intense aerial battles.

## Table of Contents

- [Isolation - Jetfighter Shooter Website](#isolation---jetfighter-shooter-website)
 [![Header Logo](./assets/images/header-logo.jpg)](#section-header)
  - [Table of Contents](#table-of-contents)
  - [Mission Log](#mission-log)
 [![Mission Log](./assets/images/mission-log.jpg)](#section-missionlog)
  - [How to Play](#how-to-play)
 [![How to play](./assets/images/how-to-play.jpg)](#section-how-to-play)
    - [Game Controls](#game-controls)
    [![Game Controls](./assets/images/game-controls.jpg)](#section-game-controls) 
    - [Health and Survival](#health-and-survival)
    - [Mobile and Tablet Controls](#mobile-and-tablet-controls)
  - [Game Instructions](#game-instructions)
  - [Canvas for the Game](#canvas-for-the-game)
  [![Game Canvas](./assets/images/game-canvas.jpg)](#section-game-canvas) 
  - [Game Elements](#game-elements)
  - [Player Stats and Game Controls](#player-stats-and-game-controls)
  [![Player Stats](./assets/images/player-stats.jpg)](#section-player-stats)
  - [JavaScript Functionality](#javascript-functionality)
  - [Contact Information](#contact-information)
  - [Credits](#credits)

## Mission Log

Prepare for an adrenaline-filled mission! You are the last surviving member of your squad, stranded in enemy territory. Your objective: eliminate all hostile forces within a limited timeframe of 2 minutes. Your precision and resourcefulness will determine your success. Good luck, soldier!

## How to Play

Are you ready for action? Here's how you can play the game:

### Game Controls

- **W:** Move Up
- **S:** Move Down
- **A:** Move Left
- **D:** Move Right
- **Mouse Movement:** Aim your fighter jet
- **Space Bar:** Fire your weapons
- **Pause Button:** Pause/Resume the game
- **End Button:** End the game

### Health and Survival

Your health is displayed as a percentage at the top. Eliminate enemies and dodge their attacks to stay alive.

### Mobile and Tablet Controls

On tablet and mobile devices, you can control the game using on-screen buttons:

- **Up Button:** Move Up
- **Down Button:** Move Down
- **Left Button:** Move Left
- **Right Button:** Move Right
- **Shoot Button:** Fire your weapons

Good luck, and may victory be yours!

## Game Instructions

For a quick reference, you can show or hide the game instructions with the "Show Instructions" button.

## Canvas for the Game

The game is rendered within a canvas element with a width of 800 pixels and a height of 600 pixels.

## Game Elements

- **Fighter Jet Image:** The image of your fighter jet is used in the game.
- **Audio Elements:** Game sounds and background music are provided through audio elements.
- **Enemy Target Image:** The image of enemy targets is used in the game.

## Player Stats and Game Controls

- **Player Name:** Enter your name to start the game.
- **Start Button:** Begin the game.
- **Pause Button:** Pause the game.
- **Reset Button:** Reset the game.
- **End Button:** End the game.
- **Timer:** Shows the remaining time (02:00).
- **Health:** Displays your health (100%).
- **Score:** Keeps track of your score.
- **On-Screen Touch Control Buttons:** For mobile and tablet devices.

## JavaScript Functionality

The game functionality is powered by JavaScript, which is included in the `script.js` file.

#### Bugs

- The player's fighter jet may not respond correctly to touch gestures for aiming.
- [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
- Prolonged touch input may result in unexpected behavior, including the player going outside the game canvas.
- The reset button would only partly work by ending the game but not reloading the game into a fresh state.
- Player input name would not display after the user enters their name.
- When the payer dies the shooting sound keeps on playing.

#### Bugfixes

While I have identified several issues within the game, it's important to note that I have encountered some challenges in addressing these bugs. However, I have taken steps to document the code for readability and future improvements, ensuring that other developers can review the code and potentially find solutions to these issues.

Here's a summary of my efforts:

1. **Touch Control Issue:**
   - Despite my best efforts, I encountered difficulties in achieving precise touch control aiming on mobile and tablet devices. While the issue persists, I have documented the relevant code for further examination and potential improvements.

2. **Prevent Default Warning:**
   - I faced challenges in resolving the "preventDefault" warning related to passive event listeners. Although I couldn't eliminate this warning entirely, I have documented the code to provide insights for future development.

3. **Prolonged Touch Input Behavior:**
   - The unexpected behavior during prolonged touch input remains unresolved. Nevertheless, I have documented the code involved in touch event handling, which may aid in diagnosing and rectifying this issue.

4. **Reset Button Functionality:**
   - The reset button's partial functionality has not been fully resolved. I have documented the code for the reset button, allowing for potential future enhancements.

5. **Player Input Name Display:**
   - Despite our efforts, the issue with player input names not displaying has not been fixed. I have documented the code related to player names, which could assist in finding a solution.

6. **Endless Shooting Sound:**
   - The issue of continuous shooting sound after the player's death remains unresolved. I have documented the code related to audio management for reference in future fixes.

My commitment to improving the game experience remains steadfast. I appreciate your understanding and patience as I continue to work on addressing these challenges.

## Technologies Used

This project is built using the following technologies:

- **HTML:** The structure of the game and user interface is developed using HTML (Hypertext Markup Language), providing the foundation for the game's layout and content.

- **CSS:** Cascading Style Sheets (CSS) are used to style and design the game's appearance, including layouts, colors, fonts, and responsive design elements.

- **JavaScript:** The game functionality and interactivity are powered by JavaScript, enabling dynamic gameplay, user input handling, and game logic.

## Validation and Quality Assurance

I'm dedicated to maintaining the quality and reliability of my codebase. To ensure that my JavaScript code meets high coding standards and is free of potential errors, I validated it using JSHint ([jshint.com](https://jshint.com/)).

Key points regarding my JavaScript code validation:

- I used JSHint to analyze my JavaScript file, checking for syntax errors, coding conventions, and potential issues.

- My JavaScript code passes through JSHint validation with no warnings, demonstrating my commitment to clean and well-structured code.

I also conducted HTML and CSS validation using the W3C Markup Validation Service ([validator.w3.org](https://validator.w3.org/)) to ensure comprehensive quality assurance.

- Both my HTML and CSS pass through validation with no warnings or errors.

Thank you for choosing my game, and I hope you have a fantastic time playing it!

## Credits

- Fighter Jet Image: [Image Source](https://www.google.ie/)
- Background image and Game Canvas [Image Source](https://www.vecteezy.com/)
- Sound Effects: [Sound Source](https://pixabay.com/)
- Enemy Target Image: [Image Source](https://www.vecteezy.com/)
- Game Development: [Graham Walsh](https://grampers-dev.github.io/Isolation/)

## Code Update Summary

### Overview of Key Changes and Improvements
This section provides an overview of the significant changes and improvements made to the JavaScript code. The updates focus on enhancing readability, maintainability, and performance while adhering to best practices and standards.

### DOM Element Variables
#### Grouping of similar elements:
- The canvas, context, button elements, timer, health, score display elements, and directional control buttons are grouped together with comments explaining their purpose.
- References to the DOM elements are organized with comments and links to relevant documentation.

#### Volume Levels:
- The volume levels for `backgroundMusic` and `backgroundMusic2` are set differently (`backgroundMusic.volume = 0.5` and `backgroundMusic2.volume = 1`).

### Gunner Object
#### Initialization:
- The `gunner` object has added properties `movingLeft` and `movingRight` for movement, and `shootingDirection` to handle shooting direction.
- The initial position of the gunner is set to the left edge of the canvas.

### Functions
#### Draw Gunner:
- Improved comments and references to the documentation for each method used in the function.

#### Draw Bullets and Targets:
- Consistent use of comments and documentation references for each step.

#### Handle Input:
- Added bounds checking to ensure the gunner does not move outside the canvas.

#### Handle Collisions:
- Improved comments and references to collision detection techniques and resources.

#### Game Loop:
- Added a check to set `gameIsRunning` to `true` when the game starts and incorporated error handling for audio play.

### Event Listeners
#### Keyboard Events:
- Combined keydown and keyup event listeners to handle movement and shooting.

#### Touch Events:
- Added event listeners for touchstart and touchend events with improved comments and references.
- Added passive options to touch event listeners to improve performance.

### Game Mechanics
#### Start Game:
- Improved comments and references for each step, added error handling for audio play, and updated game state management.

#### End Game:
- Included error handling and improved comments for cleanup tasks.

#### Reset Game:
- Improved comments and reset state management for a fresh start.

### Timer and Interval Management
#### Update Timer:
- Enhanced comments for better understanding of the timing calculations and formatting.

#### Shooting and Spawning Targets:
- Improved comments, added references, and managed the spawning of targets and shooting actions.

### Error Handling
#### Audio Play:
- Added error handling for playing audio elements to manage potential issues.

### Detailed Code Review

#### Documentation and References:
- Added detailed comments and references to MDN documentation for various methods and properties, which improves code readability and maintainability.

#### Gunner Object Enhancements:
- Added `movingLeft` and `movingRight` properties to the `gunner` object.
- Included `shootingDirection` to handle the shooting direction.

#### Game Initialization:
- Moved the initialization of the leaderboard array inside the DOM element variables section.
- Added a constant `speedIncrement` to control the speed increment of targets.

#### Event Listeners:
- Improved event listeners for buttons and touch controls with passive event options to enhance performance.
- Added detailed comments and MDN references for each event listener.

#### Canvas and Context Handling:
- Added more detailed comments and references for `canvas` and `ctx` operations.

#### Game Loop and Update Function:
- Improved the `update` function with more detailed comments and better structuring of tasks like handling input, drawing elements, and updating positions.
- The `gameLoop` function now checks `isPaused` and `isGameOver` states before calling `update`.

#### Collision Handling:
- Simplified collision detection logic with improved comments and references to MDN and game development resources.
- Added a new collision handling method for both player and enemy bullets.

#### Audio Management:
- Added error handling for audio playback to ensure smooth user experience.
- Improved comments for audio elements and playback logic.

#### Player Input Handling:
- Enhanced `handleInput` function to ensure the gunner stays within canvas bounds.
- Improved comments and added references for handling keyboard and touch events.

#### Timer and Game State Management:
- Improved `updateTimer` function with detailed comments and MDN references for date and time calculations.
- Reset game intervals and timeouts more efficiently in the `resetGame` function.

#### Game Control Functions:
- Enhanced `startGame`, `endGame`, and `resetGame` functions with better state management and more detailed comments.
- Ensured proper cleanup and resetting of game states and elements.

#### Drawing Functions:
- Added detailed comments for `drawGunner`, `drawBullets`, and `drawTargets` functions.
- Improved the drawing logic to handle various transformations and state changes.

### Conclusion
The updated code is significantly more maintainable, readable, and efficient. It incorporates comprehensive documentation and references to MDN, ensuring that other developers can easily understand and extend the game. The improvements in state management, collision detection, and input handling contribute to a smoother gameplay experience.


## Use of MDN Documentation

Throughout the development of this project, I made extensive use of the Mozilla Developer Network (MDN) documentation to ensure that my code is based on best practices and industry standards. Here are some key areas where MDN documentation was particularly helpful:

1. **Canvas and 2D Context:**
   - [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
   - [Canvas API/Tutorial/Drawing_shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

2. **DOM Manipulation:**
   - [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

3. **Image and Media Elements:**
   - [HTMLImageElement/Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
   - [HTMLMediaElement/volume](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume)
   - [HTMLMediaElement/pause](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause)
   - [HTMLMediaElement/play](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)

4. **Event Handling:**
   - [Element/keydown_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
   - [Element/keyup_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)
   - [Touch_events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

5. **Animation and Timing:**
   - [window/requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
   - [WindowOrWorkerGlobalScope/setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
   - [WindowOrWorkerGlobalScope/clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

6. **Mathematics and Utility Functions:**
   - [Math/atan2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
   - [Math/random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
   - [Math/floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
   - [Array/push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
   - [Array/splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
   - [Date/getTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
   - [String/padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

By leveraging MDN's comprehensive and authoritative resources, I was able to implement features with confidence, knowing that I was following the latest web standards and best practices. MDN documentation provided invaluable guidance on a wide range of topics, from basic DOM manipulation to complex canvas operations, ensuring that the codebase is robust and maintainable.

## References

1. [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
2. [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
3. [HTMLImageElement/Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
4. [HTMLMediaElement/volume](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume)
5. [CanvasRenderingContext2D/save](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save)
6. [CanvasRenderingContext2D/translate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate)
7. [CanvasRenderingContext2D/rotate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)
8. [CanvasRenderingContext2D/drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
9. [CanvasRenderingContext2D/fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
10. [CanvasRenderingContext2D/fillRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)
11. [CanvasRenderingContext2D/restore](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore)
12. [Canvas API/Tutorial/Drawing_shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
13. [CanvasRenderingContext2D/clearRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)
14. [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
15. [2D collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
16. [Separating Axis Theorem](https://gamedevelopment.tutsplus.com/tutorials/quick-tip-collision-detection-with-the-separating-axis-theorem--gamedev-169)
17. [Bounding Box Intersection](https://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection)
18. [window/requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
19. [Date/getTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
20. [Math/max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
21. [String/padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
22. [WindowOrWorkerGlobalScope/setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
23. [WindowOrWorkerGlobalScope/clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)
24. [HTMLMediaElement/pause](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause)
25. [HTMLMediaElement/play](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
26. [HTMLButtonElement/disabled](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/disabled)
27. [HTMLElement/style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
28. [Element/keydown_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
29. [Element/keyup_event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)
30. [Touch_events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
31. [CanvasRenderingContext2D/fillText](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText)
32. [HTMLMediaElement/currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
33. [Math/atan2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)
34. [Math/random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
35. [Math/floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
36. [Array/push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
37. [Array/splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)