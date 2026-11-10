// ===== 五子棋逻辑 =====
const SIZE = 15;          // 15 x 15 棋盘
const CELL = 30;          // 每格像素
const PADDING = 15;       // 边距

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

let board = [];
let currentPlayer = 1;    // 1 = 黑棋, 2 = 白棋
let gameOver = false;

function initGame() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  currentPlayer = 1;
  gameOver = false;
  updateStatus();
  drawBoard();
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#5a3e1b";
  ctx.lineWidth = 1;
  for (let i = 0; i < SIZE; i++) {
    const pos = PADDING + i * CELL;
    ctx.beginPath();
    ctx.moveTo(PADDING, pos);
    ctx.lineTo(PADDING + (SIZE - 1) * CELL, pos);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos, PADDING);
    ctx.lineTo(pos, PADDING + (SIZE - 1) * CELL);
    ctx.stroke();
  }
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c]) drawStone(r, c, board[r][c]);
    }
  }
}

function drawStone(row, col, player) {
  const x = PADDING + col * CELL;
  const y = PADDING + row * CELL;
  const gradient = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, 13);
  if (player === 1) {
    gradient.addColorStop(0, "#666");
    gradient.addColorStop(1, "#000");
  } else {
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#ccc");
  }
  ctx.beginPath();
  ctx.arc(x, y, 13, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function checkWin(row, col, player) {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (const [dr, dc] of directions) {
    let count = 1;
    for (const sign of [1, -1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (r >= 0 && r < SIZE && c >= 0 && c < SIZE && board[r][c] === player) {
        count++;
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (count >= 5) return true;
  }
  return false;
}

function updateStatus(text) {
  if (text) {
    statusEl.innerHTML = text;
    return;
  }
  const name = currentPlayer === 1 ? "黑棋" : "白棋";
  statusEl.innerHTML = `当前回合：<strong>${name}</strong>`;
}

canvas.addEventListener("click", (e) => {
  if (gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;
  const x = (e.clientX - rect.left) * scale;
  const y = (e.clientY - rect.top) * scale;
  const col = Math.round((x - PADDING) / CELL);
  const row = Math.round((y - PADDING) / CELL);
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE || board[row][col]) return;

  board[row][col] = currentPlayer;
  drawStone(row, col, currentPlayer);

  if (checkWin(row, col, currentPlayer)) {
    gameOver = true;
    const name = currentPlayer === 1 ? "黑棋" : "白棋";
    updateStatus(`<strong>${name}获胜！</strong>`);
    return;
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateStatus();
});

restartBtn.addEventListener("click", initGame);

// ===== 注册弹窗逻辑（纯前端演示） =====
const registerBtn = document.getElementById("register-btn");
const modal = document.getElementById("register-modal");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("register-form");
const welcomeEl = document.getElementById("welcome");

registerBtn.addEventListener("click", () => modal.classList.remove("hidden"));
cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  localStorage.setItem("gomoku_user", username);
  modal.classList.add("hidden");
  form.reset();
  showWelcome();
  alert(`注册成功，欢迎你，${username}！`);
});

function showWelcome() {
  const user = localStorage.getItem("gomoku_user");
  welcomeEl.textContent = user ? `你好，${user}，来下一局吧！` : "";
}

showWelcome();
initGame();
