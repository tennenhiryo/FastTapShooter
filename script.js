const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
const countdownEl = document.getElementById("countdown");
const gameContainer = document.getElementById("game-container");
const gameOverEl = document.getElementById("game-over");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const timeBar = document.getElementById("time-bar");

let score = 0;
let highScore = 0;
let timeLeft = 6; // 初期猶予6秒
let gameInterval;
let timeInterval;

function startCountdown(callback) {
  let count = 3;
  countdownEl.textContent = count;
  countdownEl.style.display = "block";
  const cdInterval = setInterval(() => {
    count--;
    if(count > 0) {
      countdownEl.textContent = count;
    } else {
      countdownEl.textContent = "Start!";
      clearInterval(cdInterval);
      setTimeout(() => {
        countdownEl.style.display = "none";
        callback();
      }, 800);
    }
  }, 800);
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  timeLeft = 6;
  updateTimeBar();

  startButton.style.display = "none";
  gameOverEl.style.display = "none";

  spawnTarget();

  timeInterval = setInterval(() => {
    timeLeft -= 0.05; // 緩やかに減少
    if(timeLeft <= 0) {
      endGame();
    }
    updateTimeBar();
  }, 50);
}

function spawnTarget() {
  const target = document.createElement("div");
  target.style.width = "50px";
  target.style.height = "50px";
  target.style.backgroundColor = "#ff5555";
  target.style.borderRadius = "50%";
  target.style.position = "absolute";

  const containerRect = gameContainer.getBoundingClientRect();
  const maxX = containerRect.width - 50;
  const maxY = containerRect.height - 50;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  target.style.left = x + "px";
  target.style.top = y + "px";

  target.addEventListener("click", () => {
    score++;
    scoreEl.textContent = score;
    timeLeft = 6; // 猶予時間リセット
    updateTimeBar();
    target.remove();
    spawnTarget();
  });

  gameContainer.appendChild(target);
}

function updateTimeBar() {
  timeBar.style.width = (timeLeft / 6 * 100) + "%";
}

function endGame() {
  clearInterval(timeInterval);
  const targets = gameContainer.querySelectorAll("div");
  targets.forEach(t => t.remove());
  gameOverEl.style.display = "flex";
  startButton.style.display = "none";
  if(score > highScore) {
    highScore = score;
    highScoreEl.textContent = highScore;
  }
}

startButton.addEventListener("click", () => {
  startCountdown(startGame);
});

retryButton.addEventListener("click", () => {
  startCountdown(startGame);
});