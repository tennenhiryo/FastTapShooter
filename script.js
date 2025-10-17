const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const gameScreen = document.getElementById('game-screen');
const btn = document.getElementById('target-btn');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const gameArea = document.getElementById('game-area');

let score = 0;
let timeout;
let timeLimit = 1500; // 最初の猶予時間（ミリ秒）

// スタートボタン押したらカウントダウン開始
startBtn.addEventListener('click', () => {
  startScreen.innerHTML = "<p>3</p>";
  let count = 3;
  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      startScreen.innerHTML = `<p>${count}</p>`;
    } else {
      clearInterval(countdown);
      startScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      startGame();
    }
  }, 1000);
});

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
  }, timeLimit);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  btn.disabled = false;
  timeLimit = 1500; // 最初は1.5秒
  moveButton();
  startTimer();
}

// ボタン押した時
btn.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
  // 猶予時間を少しずつ短く（最低500ms）
  timeLimit = Math.max(500, timeLimit - 50);
  moveButton();
  startTimer();
  message.textContent = '';
});