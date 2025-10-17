const startBtn = document.getElementById('startBtn');
const countdownEl = document.getElementById('countdown');
const target = document.getElementById('target');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const timeBar = document.getElementById('timeBar');
const gameArea = document.getElementById('gameArea');

let score = 0;
let highScore = 0;
let timeLeft;
const maxTime = 6; // 初期猶予時間
const minTime = 1;
const timeDecay = 0.02; // 減少率
let gameInterval;
let targetInterval;

function startGame() {
  score = 0;
  scoreEl.textContent = `スコア: ${score}`;
  timeLeft = maxTime;
  startBtn.style.display = 'none';
  gameOverEl.style.display = 'none';
  countdownEl.textContent = '';
  target.style.display = 'none';
  runCountdown();
}

function runCountdown() {
  let count = 3;
  countdownEl.textContent = count;
  const cdInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      clearInterval(cdInterval);
      countdownEl.textContent = 'START!';
      setTimeout(() => {
        countdownEl.textContent = '';
        beginGameplay();
      }, 500);
    }
  }, 1000);
}

function beginGameplay() {
  spawnTarget();
  gameInterval = setInterval(updateTime, 50);
}

function updateTime() {
  // ゲージは常にフル幅
  const decayRate = (maxTime / Math.max(timeLeft, 0.01)) * 0.05; 
  timeLeft -= decayRate;
  if (timeLeft <= 0) {
    endGame();
  }
  updateTimeBar();
}

function updateTimeBar() {
  // 常にフル幅のゲージ表示
  timeBar.style.width = '100%';
}

function spawnTarget() {
  const areaSize = gameArea.clientWidth;
  const btnSize = 60;
  target.style.left = `${Math.random() * (areaSize - btnSize)}px`;
  target.style.top = `${Math.random() * (areaSize - btnSize)}px`;
  target.style.display = 'block';
}

target.addEventListener('click', () => {
  score++;
  scoreEl.textContent = `スコア: ${score}`;
  if(score > highScore){
    highScore = score;
    highScoreEl.textContent = `ハイスコア: ${highScore}`;
  }
  timeLeft = Math.max(maxTime - score * timeDecay, minTime);
  updateTimeBar();
  spawnTarget();
});

function endGame() {
  clearInterval(gameInterval);
  target.style.display = 'none';
  gameOverEl.style.display = 'block';
  finalScoreEl.textContent = `Score: ${score}`;
}

restartBtn.addEventListener('click', startGame);
startBtn.addEventListener('click', startGame);