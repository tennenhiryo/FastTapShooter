// 要素取得
const menuScreen = document.getElementById('menu-screen');
const startBtn = document.getElementById('start-btn');
const countdownEl = document.getElementById('countdown');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('gameover-screen');
const targetBtn = document.getElementById('target-btn');
const scoreText = document.getElementById('score-text');
const highscoreText = document.getElementById('highscore-text');
const timeGauge = document.getElementById('time-gauge');
const finalScore = document.getElementById('final-score');
const finalHighscore = document.getElementById('final-highscore');
const retryBtn = document.getElementById('retry-btn');

let score = 0;
let timeLimit = 3000;
let minTime = 500;
let decrease = 80;
let timeout;
let gaugeInterval;

// ハイスコア取得
let highScore = localStorage.getItem('FastTapShooterHigh') || 0;
highscoreText.textContent = "HIGH SCORE: " + highScore;

// スタートボタン
startBtn.addEventListener('click', () => {
  menuScreen.classList.add('hidden');
  countdownEl.classList.remove('hidden');
  window.scrollTo(0,0);
  let count = 3;
  countdownEl.textContent = count;
  const cd = setInterval(() => {
    count--;
    if(count > 0){
      countdownEl.textContent = count;
    } else {
      clearInterval(cd);
      countdownEl.textContent = "START!";
      setTimeout(() => {
        countdownEl.classList.add('hidden');
        startGame();
      }, 700);
    }
  },1000);
});

function startGame(){
  score = 0;
  scoreText.textContent = score;
  gameScreen.classList.remove('hidden');
  window.scrollTo(0,0);
  timeLimit = 3000;
  moveButton();
  startTimer();
}

function moveButton(){
  const maxX = gameScreen.clientWidth - targetBtn.offsetWidth;
  const maxY = 400 - targetBtn.offsetHeight;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  targetBtn.style.left = x + "px";
  targetBtn.style.top = y + "px";
}

function startTimer(){
  clearTimeout(timeout);
  clearInterval(gaugeInterval);
  let startTime = Date.now();
  gaugeInterval = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let width = Math.max(0, (timeLimit - elapsed)/timeLimit) * 100;
    timeGauge.style.width = width + "%";
  },16);

  timeout = setTimeout(() => {
    endGame();
  }, timeLimit);
}

targetBtn.addEventListener('click',()=>{
  score++;
  scoreText.textContent = score;
  timeLimit = Math.max(minTime, timeLimit - decrease);
  moveButton();
  startTimer();
  if(score > highScore){
    highScore = score;
    highscoreText.textContent = "HIGH SCORE: " + highScore;
    localStorage.setItem('FastTapShooterHigh', highScore);
  }
});

function endGame(){
  gameScreen.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');
  finalScore.textContent = "SCORE: " + score;
  finalHighscore.textContent = "HIGH SCORE: " + highScore;
  window.scrollTo(0,0);
}

// 再挑戦ボタン
retryBtn.addEventListener('click',()=>{
  gameOverScreen.classList.add('hidden');
  menuScreen.classList.remove('hidden');
});