document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const newGameButton = document.getElementById("newGameButton");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.getAttribute("data-index");
        if (boardState[index] || checkWinner()) {
            return;
        }
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
        } else if (boardState.every(cell => cell)) {
            showResult("It's a draw!");
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => boardState[index] === currentPlayer);
        });
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.classList.add("show");
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        resultScreen.classList.remove("show");
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", resetGame);
});
