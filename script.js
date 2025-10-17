const target = document.getElementById('target');
const startButton = document.getElementById('startButton');
const countdownEl = document.getElementById('countdown');
const gameOverEl = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');
const finalScore = document.getElementById('finalScore');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const timeBar = document.getElementById('timeBar');

let score = 0;
let highScore = 0;
let timeLeft = 6; // 初期猶予時間
let maxTime = 6;
let gameInterval;
const decayRate = 0.05; // 基本減少速度
const speedUp = 0.002;  // スコアによる加速

function randomPosition() {
  const area = document.getElementById('gameArea');
  const maxX = area.clientWidth - target.clientWidth;
  const maxY = area.clientHeight - target.clientHeight;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

function spawnTarget() {
  randomPosition();
  target.style.display = 'block';
}

function updateTimeBar() {
  const percent = (timeLeft / maxTime) * 100;
  timeBar.style.width = percent + '%';
}

function updateTime() {
  timeLeft -= decayRate + score * speedUp;
  if (timeLeft <= 0) {
    timeLeft = 0;
    endGame();
  }
  updateTimeBar();
}

function startCountdown(callback) {
  let count = 3;
  countdownEl.style.display = 'block';
  countdownEl.textContent = count;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      countdownEl.textContent = 'スタート！';
    }
    if (count < 0) {
      clearInterval(interval);
      countdownEl.style.display = 'none';
      callback();
    }
  }, 1000);
}

function startGame() {
  score = 0;
  scoreEl.textContent = `スコア: ${score}`;
  timeLeft = maxTime;
  clearInterval(gameInterval);
  target.style.display = 'none';
  gameOverEl.style.display = 'none';
  startButton.style.display = 'none';
  startCountdown(beginGameplay);
}

function beginGameplay() {
  maxTime = 6; // 再スタート時も初期猶予をリセット
  timeLeft = maxTime;
  spawnTarget();
  gameInterval = setInterval(updateTime, 50);
}

function endGame() {
  clearInterval(gameInterval);
  target.style.display = 'none';
  // ゲームオーバー時にFlexboxで表示させる
  gameOverEl.style.display = 'flex'; 
  finalScore.textContent = `スコア: ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = `ハイスコア: ${highScore}`;
  }
}

target.addEventListener('click', () => {
  score++;
  scoreEl.textContent = `スコア: ${score}`;
  // maxTimeの計算式はそのまま
  maxTime = 6 - Math.min(score * 0.01, 4); 
  timeLeft = maxTime; // タップで猶予回復
  spawnTarget();
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
  gameOverEl.style.display = 'none';
  startGame();
});
