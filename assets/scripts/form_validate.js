// Function to validate the player name input
function validatePlayerName() {
    const playerName = document.querySelector(".player-name").value.trim();
    if (!playerName) {
      alert("Player name cannot be empty!");
    } else {
      startGame();
    }
  }