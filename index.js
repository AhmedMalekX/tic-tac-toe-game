'use strict';

// Sudo code
/* 
  - get all cells ✅
  - define players and current player ✅
  - define the winning areas ✅
  - switch the player when click in cell ✅
  - if a player clicked on a marked cell => alert with an error ✅
  - if no one win => alert game over and rest the game ✅
  - if any player win => alert with winning and reset the game ✅
*/

// constants
const allCells = document.querySelectorAll('.cell');
let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;
const winningAreas = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const cells = [...allCells];

let selectedCellsContainer = [];
let player1SelectedCells = [];
let player2SelectedCells = [];
let finalMoves = [];

const switchPlayers = (cell, player, otherPlayer) => {
  cell.textContent = player;
  currentPlayer = otherPlayer;
};

const detectPlayerCells = (cell, playerSelectedCells, player) => {
  playerSelectedCells.push(Number(cell.id));
  console.log(`${playerSelectedCells}`, playerSelectedCells);

  if (playerSelectedCells.length === 4) {
    finalMoves = playerSelectedCells.splice(1);
  } else {
    finalMoves = playerSelectedCells;
  }
  console.log(`final Moves for ${player}`, finalMoves);
};

const matchResults = player => {
  winningAreas.forEach((el, i) => {
    if (JSON.stringify(winningAreas[i]) === JSON.stringify(finalMoves.sort())) {
      alert(`${player} wins play again?`);
      resetTheGame();
    }
  });
};

const resetTheGame = () => {
  window.location.reload();
};

const gameOver = availableCells => {
  if (availableCells.length === 9) {
    alert(`Game over play again?`);
    resetTheGame();
  }
};

const startGame = () => {
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (selectedCellsContainer.find(ele => ele === Number(cell.id))) {
        alert('Selected');
      } else {
        selectedCellsContainer.push(Number(cell.id));

        if (currentPlayer === player1) {
          switchPlayers(cell, player1, player2);
          detectPlayerCells(cell, player1SelectedCells, player1);
          matchResults(player1);
        } else {
          switchPlayers(cell, player2, player1);
          detectPlayerCells(cell, player2SelectedCells, player2);
          matchResults(player2);
        }
        gameOver(selectedCellsContainer);

        console.log('selectedCellsContainer', selectedCellsContainer);
      }
    });
  });
};
startGame();
