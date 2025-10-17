const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
const countdownEl = document.getElementById("countdown");
const gameOverEl = document.getElementById("game-over");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timeBar = document.getElementById("time-bar");
const gameArea = document.getElementById("game-area");

let score = 0;
let highScore = 0;
let timeLeft = 6;
const maxTime = 6;
const minTime = 2;
const timeDecay = 0.01; // スコア1ごとに猶予時間短縮
let timeInterval;
let target;

function startCountdown(callback) {
  gameOverEl.style.display = "none";
  startButton.style.display = "none";
  countdownEl.style.display = "block";
  let count = 3;
  countdownEl.textContent = count;
  const countdownInterval = setInterval(() => {
    count--;
    if(count > 0){
      countdownEl.textContent = count;
    } else {
      countdownEl.textContent = "Start!";
      setTimeout(() => {
        countdownEl.style.display = "none";
        clearInterval(countdownInterval);
        callback();
      }, 500);
    }
  }, 1000);
}

function startGame() {
  score = 0;
  scoreEl.textContent = `スコア: ${score}`;
  timeLeft = maxTime;
  spawnTarget();
  timeInterval = setInterval(updateTime, 50);
}

function spawnTarget() {
  if(target) gameArea.removeChild(target);
  target = document.createElement("button");
  target.style.position = "absolute";
  const size = 50;
  const maxX = gameArea.clientWidth - size;
  const maxY = gameArea.clientHeight - size;
  target.style.width = size + "px";
  target.style.height = size + "px";
  target.style.background = "#ff5722";
  target.style.border = "none";
  target.style.borderRadius = "10px";
  target.style.top = Math.random() * maxY + "px";
  target.style.left = Math.random() * maxX + "px";
  target.addEventListener("click", hitTarget);
  gameArea.appendChild(target);
}

function hitTarget() {
  score++;
  scoreEl.textContent = `スコア: ${score}`;
  if(score > highScore){
    highScore = score;
    highScoreEl.textContent = `ハイスコア: ${highScore}`;
  }
  timeLeft = Math.max(maxTime - score * timeDecay, minTime);
  spawnTarget();
}

function updateTime() {
  timeLeft -= 0.05;
  if(timeLeft <= 0){
    endGame();
  }
  updateTimeBar();
}

function updateTimeBar() {
  const percent = (timeLeft / maxTime) * 100;
  timeBar.style.width = percent + "%";
}

function endGame() {
  clearInterval(timeInterval);
  if(target) gameArea.removeChild(target);
  gameOverEl.style.display = "flex";
}

startButton.addEventListener("click", () => startCountdown(startGame));
retryButton.addEventListener("click", () => startCountdown(startGame));