const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
document.querySelector(".score").textContent = `Score: ${score}`;

class Basket {
  constructor() {
    this.width = 100;
    this.height = 20;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 15;
  }

  draw() {
    ctx.fillStyle = "#ff6347";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction === "left" && this.x > 0) this.x -= this.speed;
    if (direction === "right" && this.x + this.width < canvas.width) this.x += this.speed;
  }

  moveTo(x) {
    this.x = Math.max(0, Math.min(x - this.width / 2, canvas.width - this.width));
  }
}

class FallingObject {
  constructor() {
    this.radius = 15;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = -this.radius;
    this.speed = Math.random() * 5 + 2 + Math.floor(score / 5); // Increase speed based on score
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#1e90ff";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.speed;
  }
}

const basket = new Basket();
let fallingObjects = [];
let gameInterval;

function spawnObject() {
  fallingObjects.push(new FallingObject());
}

function detectCollision(obj) {
  return (
    obj.y + obj.radius >= basket.y &&
    obj.x >= basket.x &&
    obj.x <= basket.x + basket.width
  );
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  basket.draw();

  fallingObjects.forEach((obj, index) => {
    obj.update();
    obj.draw();

    if (detectCollision(obj)) {
      score += 1;
      document.querySelector(".score").textContent = `Score: ${score}`;
      fallingObjects.splice(index, 1);
    }

    if (obj.y - obj.radius > canvas.height) {
      clearInterval(gameInterval);
      alert(`Game Over! Final Score: ${score}`);
      window.location.reload();
    }
  });

  requestAnimationFrame(updateGame);
}

function handleKeydown(event) {
  if (event.key === "ArrowLeft") basket.move("left");
  if (event.key === "ArrowRight") basket.move("right");
}

function handleTouchMove(event) {
  const touchX = event.touches[0].clientX;
  basket.moveTo(touchX);
}

window.addEventListener("keydown", handleKeydown);
canvas.addEventListener("touchmove", handleTouchMove);

// Increase the spawn rate as the score increases
function adjustSpawnRate() {
  return Math.max(500, 1000 - Math.floor(score / 2) * 100); // Decrease interval as score increases
}

function startGame() {
  gameInterval = setInterval(spawnObject, adjustSpawnRate());
  updateGame();
}

startGame();
