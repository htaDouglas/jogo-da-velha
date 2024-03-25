document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const resultDiv = document.getElementById("result");
    const restartBtn = document.getElementById("restartBtn");
  
    let currentPlayer = "X";
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];
  
    function checkWin() {
      const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
      ];
  
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
  
      if (boardState.every(cell => cell !== "")) {
        return "T"; // Tie
      }
  
      return null;
    }
  
    function handleCellClick(event) {
      const cellIndex = event.target.dataset.cellIndex;
      if (boardState[cellIndex] || !gameActive) return;
  
      boardState[cellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
  
      const winner = checkWin();
      if (winner) {
        gameActive = false;
        if (winner === "T") {
          resultDiv.textContent = "Empate!";
        } else {
          resultDiv.textContent = `O jogador ${winner} venceu!`;
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  
    function restartGame() {
      currentPlayer = "X";
      gameActive = true;
      boardState = ["", "", "", "", "", "", "", "", ""];
      cells.forEach(cell => {
        cell.textContent = "";
      });
      resultDiv.textContent = "";
    }
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleCellClick);
    });
  
    restartBtn.addEventListener("click", restartGame);
  });
  