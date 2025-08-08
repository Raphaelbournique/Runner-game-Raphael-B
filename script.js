const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const game = document.getElementById('game');

let isJumping = false;
let score = 0;
let speed = 5;
let scoreInterval;
let obstacleInterval;
let animationInterval;
let lastObstacleType = null;
let obstacles = [];

// Animation sprite run
const runFrameCount = 8;
const runFrameWidth = 64;
const runFrameTime = 100;
const runSprite = 'assets/player/Green-Blob-Run.png';
const jumpSprite = 'assets/player/Green-Blob-Jump.png';

const obstacleImages = [
  'assets/obstacles/Obstacle_1.png',
  'assets/obstacles/Obstacle_2.png',
  'assets/obstacles/Obstacle_3.png'
];

// ✅ Animation du sprite en boucle
function animateSpriteSheet(frameCount, frameWidth, frameTime, imagePath) {
  clearInterval(animationInterval);
  let frame = 0;
  player.style.backgroundImage = `url('${imagePath}')`;

  animationInterval = setInterval(() => {
    player.style.backgroundPosition = `-${frame * frameWidth}px 0`;
    frame = (frame + 1) % frameCount;
  }, frameTime);
}

// ⬆️ Saut du joueur
document.addEventListener('keydown', (e) => {
  if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  clearInterval(animationInterval);
  player.style.backgroundImage = `url('${jumpSprite}')`;
  player.style.backgroundPosition = '0 0';

  let position = 0;
  let goingUp = true;

  const jumpInterval = setInterval(() => {
    if (goingUp) {
      position += 5;
      if (position >= 150) goingUp = false;
    } else {
      position -= 5;
      if (position <= 0) {
        position = 0;
        clearInterval(jumpInterval);
        isJumping = false;
        animateSpriteSheet(runFrameCount, runFrameWidth, runFrameTime, runSprite);
      }
    }
    player.style.bottom = `${140 + position}px`;
  }, 20);
}

// 🎲 Type d'obstacle (évite 2 gros à la suite)
function getRandomObstacleType() {
  let newType;
  do {
    newType = Math.floor(Math.random() * obstacleImages.length);
  } while (newType === 2 && lastObstacleType === 2); // éviter double obstacle_3
  lastObstacleType = newType;
  return newType;
}

// 🚧 Génération obstacle
function createObstacle() {
  const type = getRandomObstacleType();
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.background = `url('${obstacleImages[type]}') no-repeat center / contain`;
  obstacle.style.width = '40px';
  obstacle.style.height = '40px';
  game.appendChild(obstacle);

  let left = window.innerWidth;

  const move = setInterval(() => {
    if (!obstacle) return;

    left -= speed;
    obstacle.style.left = `${left}px`;

    if (left < -50) {
      clearInterval(move);
      if (obstacle.parentNode) obstacle.parentNode.removeChild(obstacle);
      obstacles = obstacles.filter(o => o !== obstacle);
    }

    // Collision
    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    if (
      playerRect.left < obsRect.right &&
      playerRect.right > obsRect.left &&
      playerRect.bottom > obsRect.top &&
      playerRect.top < obsRect.bottom
    ) {
      endGame();
    }
  }, 20);

  obstacles.push(obstacle);
}

// 🔁 Apparition aléatoire d'obstacles
function launchObstacleLoop() {
  function spawnObstacle() {
    createObstacle();

    const baseDelay = 2000; 
    const minDelay = 600;   
    const difficulty = Math.min(score / 100, 10);
    const delay = baseDelay - difficulty * 140;

    obstacleInterval = setTimeout(spawnObstacle, Math.max(delay, minDelay));
  }

  spawnObstacle();
}


// 🧮 Score + difficulté
function updateScore() {
  score += 1;
  scoreDisplay.innerText = `Score: ${score}`;
  if (score % 100 === 0) {
    speed += 1;
  }
}

// 💀 Game Over
function endGame() {
  clearInterval(scoreInterval);
  clearTimeout(obstacleInterval);
  clearInterval(animationInterval);
  gameOverScreen.style.display = 'block';
}

// ▶️ Démarrage du jeu
function startGame() {
  startScreen.style.display = 'none';
  game.style.display = 'block';

  score = 0;
  speed = 5;
  lastObstacleType = null;
  player.style.bottom = '125px';
  scoreDisplay.innerText = "Score: 0";

  animateSpriteSheet(runFrameCount, runFrameWidth, runFrameTime, runSprite);
  scoreInterval = setInterval(updateScore, 100);
  launchObstacleLoop();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => window.location.reload());
