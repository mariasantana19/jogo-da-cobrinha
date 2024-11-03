const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let direction = null; 
let score = 0;
let game;

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(segment.x, segment.y, box, box);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

function resetGame() {
  
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null; 
  score = 0;
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };

  // Reiniciar o loop do jogo
  game = setInterval(gameLoop, 100);
}

function gameLoop() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  // Verificar colisão com as bordas ou com o próprio corpo
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game); // Parar o loop do jogo

    // Exibir pontuação e reiniciar o jogo após o usuário clicar em "OK"
    alert(`Fim de jogo! Pontuação: ${score}`);
    resetGame();
    return;
  }

  snake.unshift(newHead);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
}

function collision(head, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      return true;
    }
  }
  return false;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Iniciar o jogo
game = setInterval(gameLoop, 100);
