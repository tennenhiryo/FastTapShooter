const btn = document.getElementById('target-btn');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const gameArea = document.getElementById('game-area');

let score = 0;
let timeout;

function moveButton() {
  const maxX = gameArea.clientWidth - btn.offsetWidth;
  const maxY = gameArea.clientHeight - btn.offsetHeight;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

function startTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    message.textContent = "ゲームオーバー！";
    btn.disabled = true;
  }, 500); // 0.5秒以内に押さないとアウト
}

btn.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
  moveButton();
  startTimer();
  message.textContent = '';
});

// 初期配置
moveButton();
startTimer();