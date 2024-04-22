const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];

// Create game board
function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove);
            boardElement.appendChild(cell);
            board[row][col] = '';
        }
    }
}

// Handle player move
function handleMove(event) {
    const col = parseInt(event.target.dataset.col);
    const row = dropPiece(col);
    if (row !== -1) {
        event.target.style.backgroundColor = currentPlayer;
        board[row][col] = currentPlayer;
        if (checkWin(row, col)) {
            alert(currentPlayer.toUpperCase() + ' wins!');
            resetGame();
            return;
        }
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }
}

// Drop a piece into the column
function dropPiece(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            return row;
        }
    }
    return -1; // Column is full
}

// Check for a win
function checkWin(row, col) {
    const directions = [
        [-1, 0], [0, 1], [1, 1], [1, 0] // vertical, horizontal, diagonal (up-right), diagonal (down-right)
    ];
    for (const [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            const newRow = row + (i * dx);
            const newCol = col + (i * dy);
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i <= 3; i++) {
            const newRow = row - (i * dx);
            const newCol = col - (i * dy);
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

// Reset game
function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
    currentPlayer = 'red';
    board = [];
    createBoard();
}

// Initialize game
createBoard();

// Reset button
document.getElementById('reset').addEventListener('click', resetGame);
