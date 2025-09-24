const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Kuş resmi ve ses
const birdImg = new Image();
birdImg.src = 'bird.png'; // Kuş resmi

const jumpSound = new Audio('jump.mp3'); // Zıplama sesi

// Kuş objesi
let bird = { x: 50, y: 150, width: 40, height: 40, gravity: 0.6, lift: -10, velocity: 0 };

// Borular
let pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
let frameCount = 0;

// Skor
let score = 0;
const scoreDiv = document.getElementById('score');

// Kontroller
document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
  jumpSound.play();
});
canvas.addEventListener("click", () => {
  bird.velocity = bird.lift;
  jumpSound.play();
});

// Oyun döngüsü
function update() {
  // Kuş hareketi
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Borular
  frameCount++;
  if(frameCount % 100 === 0) {
    let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 40)) + 20;
    pipes.push({ x: canvas.width, y: pipeY });
  }

  // Boruları hareket ettir
  for(let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;

    // Çarpma kontrolü
    if (
      bird.x + bird.width > pipes[i].x &&
      bird.x < pipes[i].x + pipeWidth &&
      (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipeGap)
    ) {
      gameOver();
      return;
    }

    // Boruları çiz
    ctx.fillStyle = "green";
    ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].y);
    ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipeWidth, canvas.height - pipes[i].y - pipeGap);

    // Skor
    if (pipes[i].x + pipeWidth === bird.x) {
      score++;
      scoreDiv.textContent = `Score: ${score}`;
    }
  }

  // Canvas temizle ve kuşu çiz
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  requestAnimationFrame(update);
}

// Game Over
function gameOver() {
  alert(`Game Over! Score: ${score}`);
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  scoreDiv.textContent = `Score: 0`;
}

birdImg.onload = () => {
  update();
};