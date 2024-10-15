<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const grid = {w: 16, h: 30}
const snakeWindow = ref({w: 256, h: 480})

const cellSize = snakeWindow.value.w / grid.w;
const canvas = ref(null)
const snakePositions = ref([])
const foodPositions = ref([])
const direction = ref("top")
const gameLoop = ref()

function drawGrid(ctx) {
  ctx.strokeStyle = "#aaaaaa0a";
  ctx.beginPath(); // Начинаем новый путь

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

  ctx.stroke(); // Теперь рисуем
}

function drawSnake(ctx) {
  ctx.fillStyle = "#ffa600";

  for (const snakePos of snakePositions.value) {
    ctx.fillRect(snakePos.x * cellSize, snakePos.y * cellSize, cellSize, cellSize);
  }
}

function drawFood(ctx) {
  ctx.fillStyle = "#ff3c00";

  for (const foodPos of foodPositions.value) {
    ctx.fillRect(foodPos.x * cellSize, foodPos.y * cellSize, cellSize, cellSize);
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
  if (newPosition.x < 0 || newPosition.y < 0 ||
      newPosition.x > grid.w - 1 || newPosition.y > grid.h - 1) {
    restartGame()
    return;
  }

  for (const snakePos of snakePositions.value) {
    if (snakePos.x === newPosition.x && snakePos.y === newPosition.y) {
      restartGame()
      return;
    }
  }

  let hasEat = false

  for (const food of foodPositions.value) {
    if (food.x === newPosition.x && food.y === newPosition.y) {
      // EAT
      hasEat = true;
      foodPositions.value.pop();
      break
    }
  }
  snakePositions.value.unshift(newPosition)

  if (!hasEat) {
    snakePositions.value.pop()
  } else {
    createFood()
  }
}

function createFood() {
  const availableCells = []
  for (let x = 0; x < grid.w; x++) {
    for (let y = 0; y < grid.h; y++) {
      console.log(123)
      let found = false;
      for (const snakePos of snakePositions.value) {
        if (snakePos.x === x && snakePos.y === y) {
          found = true;
          break;
        }
      }
      if (!found) {
        availableCells.push({ x: x, y: y });
      }
    }
  }

  const cell = availableCells[Math.floor(Math.random()*availableCells.length)];
  console.log(cell)
  foodPositions.value.push(cell);
}

function keydown(event) {
  const currentDirection = direction.value;
  let newDirection = currentDirection

  switch (event.key) {
    case "ArrowUp":
      newDirection = "top";
      break;
    case "w":
      newDirection = "top";
      break;
    case "ArrowRight":
      newDirection = "right";
      break;
    case "d":
      newDirection = "right";
      break;
    case "ArrowDown":
      newDirection = "bottom";
      break;
    case "s":
      newDirection = "bottom";
      break;
    case "ArrowLeft":
      newDirection = "left";
      break;
    case "a":
      newDirection = "left";
      break;
  }
  if ((currentDirection === "top" && newDirection === "bottom") ||
      (currentDirection === "bottom" && newDirection === "top") ||
      (currentDirection === "left" && newDirection === "right") ||
      (currentDirection === "right" && newDirection === "left")
  ) {
    return;
  }

    direction.value = newDirection;
}

function restartGame() {
  snakePositions.value = [{x: grid.w / 2, y: grid.h / 2}]
  foodPositions.value = []
  createFood()
}

onMounted(() => {
  window.addEventListener("keydown", keydown);
  const ctx = canvas.value.getContext('2d');
  console.log(ctx)
  restartGame()
  gameLoop.value = setInterval(() => {
    move()
    ctx.clearRect(0, 0, snakeWindow.value.w, snakeWindow.value.h);
    drawGrid(ctx)
    drawSnake(ctx)
    drawFood(ctx)
  }, 200)
})

onUnmounted(() => {
  window.removeEventListener("keydown", keydown);
})
</script>

<template>
  <canvas ref="canvas" :width="snakeWindow.w" :height="snakeWindow.h" class="w-full h-full">

  </canvas>
</template>