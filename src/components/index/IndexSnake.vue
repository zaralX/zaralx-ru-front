<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const grid = {w: 8, h: 15};
const snakeWindow = ref({w: 256, h: 480});

const cellSize = snakeWindow.value.w / grid.w;
const segmentPadding = 0.2 * cellSize; // отступ для уменьшения сегментов змейки
const canvas = ref(null);
const snakePositions = ref([]);
const foodPositions = ref([]);
const direction = ref("top");
const gameLoop = ref();
const gameStarted = ref(false)


function drawGrid(ctx) {
  ctx.strokeStyle = "#aaaaaa0a";
  ctx.beginPath();

  for (let x = 0.5; x < canvas.value.width; x += cellSize) {
    if (x === 0.5) continue;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.value.height);
  }
  for (let y = 0.5; y < canvas.value.height; y += cellSize) {
    if (y === 0.5) continue;
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.value.width, y);
  }

  ctx.stroke();
}

function drawSnake(ctx) {
  ctx.fillStyle = "#ffa600";

  for (let i = 0; i < snakePositions.value.length; i++) {
    const snakePos = snakePositions.value[i];
    const x = snakePos.x * cellSize + segmentPadding / 2;
    const y = snakePos.y * cellSize + segmentPadding / 2;
    const size = cellSize - segmentPadding;

    // Рисуем сегмент змейки с закругленными углами
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, size / 4);
    ctx.fill();

    // Рисуем соединение между сегментами (если это не первый сегмент)
    if (i > 0) {
      const prevPos = snakePositions.value[i - 1];
      drawConnection(ctx, prevPos, snakePos);
    }
  }
}

// для рисования соединений между сегментами
function drawConnection(ctx, prevPos, currentPos) {
  ctx.fillStyle = "#ffa600";

  const prevX = prevPos.x * cellSize + cellSize / 2;
  const prevY = prevPos.y * cellSize + cellSize / 2;
  const currX = currentPos.x * cellSize + cellSize / 2;
  const currY = currentPos.y * cellSize + cellSize / 2;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.lineWidth = cellSize - segmentPadding;
  ctx.strokeStyle = "#ffa600";
  ctx.stroke();
}

function drawFood(ctx) {
  ctx.fillStyle = "#ff3c00";

  for (const foodPos of foodPositions.value) {
    const x = foodPos.x * cellSize + segmentPadding / 2;
    const y = foodPos.y * cellSize + segmentPadding / 2;
    const size = cellSize - segmentPadding;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function move() {
  const newPosition = {x: snakePositions.value[0].x, y: snakePositions.value[0].y};
  switch (direction.value) {
    case "top":
      newPosition.y -= 1;
      break;
    case "bottom":
      newPosition.y += 1;
      break;
    case "left":
      newPosition.x -= 1;
      break;
    case "right":
      newPosition.x += 1;
      break;
  }

  if (
      newPosition.x < 0 || newPosition.y < 0 ||
      newPosition.x >= grid.w || newPosition.y >= grid.h
  ) {
    restartGame();
    return;
  }

  for (const snakePos of snakePositions.value) {
    if (snakePos.x === newPosition.x && snakePos.y === newPosition.y) {
      restartGame();
      return;
    }
  }

  let hasEaten = false;

  for (const food of foodPositions.value) {
    if (food.x === newPosition.x && food.y === newPosition.y) {
      hasEaten = true;
      foodPositions.value.pop();
      break;
    }
  }

  snakePositions.value.unshift(newPosition);

  if (!hasEaten) {
    snakePositions.value.pop();
  } else {
    createFood();
  }
}

function createFood() {
  const availableCells = [];

  for (let x = 0; x < grid.w; x++) {
    for (let y = 0; y < grid.h; y++) {
      let found = false;
      for (const snakePos of snakePositions.value) {
        if (snakePos.x === x && snakePos.y === y) {
          found = true;
          break;
        }
      }
      if (!found) {
        availableCells.push({x, y});
      }
    }
  }

  if (availableCells.length > 0) {
    const cell = availableCells[Math.floor(Math.random() * availableCells.length)];
    foodPositions.value.push(cell);
  }
}

function keydown(event) {
  const currentDirection = direction.value;
  let newDirection = currentDirection;
console.log(event)
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      newDirection = "top";
      break;
    case "ArrowRight":
    case "KeyD":
      newDirection = "right";
      break;
    case "ArrowDown":
    case "KeyS":
      newDirection = "bottom";
      break;
    case "ArrowLeft":
    case "KeyA":
      newDirection = "left";
      break;
  }

  if (
      (currentDirection === "top" && newDirection === "bottom") ||
      (currentDirection === "bottom" && newDirection === "top") ||
      (currentDirection === "left" && newDirection === "right") ||
      (currentDirection === "right" && newDirection === "left")
  ) {
    return;
  }

  direction.value = newDirection;
}

function restartGame() {
  snakePositions.value = [{x: Math.floor(grid.w / 2), y: Math.floor(grid.h / 2)}];
  foodPositions.value = [];
  createFood();
}

function startGame() {
  if (!gameStarted.value) {
    gameStarted.value = true
    restartGame()
  }
}

onMounted(() => {
  window.addEventListener("keydown", keydown);
  const ctx = canvas.value.getContext("2d");
  ctx.lineWidth = cellSize - segmentPadding;
  ctx.strokeStyle = "#ffa600";
  ctx.fillStyle = "#ffa600";
  gameLoop.value = setInterval(() => {
    if (!gameStarted.value) return;
    move();
    ctx.clearRect(0, 0, snakeWindow.value.w, snakeWindow.value.h);
    drawGrid(ctx);
    drawSnake(ctx);
    drawFood(ctx);
  }, 200);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydown);
  clearInterval(gameLoop.value);
});
</script>

<template>
  <div class="relative w-full h-full flex justify-center items-center">
    <canvas ref="canvas" :width="snakeWindow.w" :height="snakeWindow.h" class="w-full h-full"></canvas>
    <transition name="slide-fade">
      <Button v-if="!gameStarted" @click="startGame" class="absolute bottom-10 bg-red-500 rounded-lg shadow-lg py-1 px-4 text-black font-medium">Start</Button>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>