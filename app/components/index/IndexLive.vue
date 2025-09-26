<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
const ctx = ref(null);
const cellSize = 20;
let rows, cols, grid;
let isDrawing = false;
let drawMode = 1; // 1 - рисовать, 0 - удалять
let isRunning = true;
let animationFrameId;

const initGrid = () => {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = Math.random() > 0.8 ? 1 : 0;
    }
  }
};

const drawGrid = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.strokeStyle = 'rgba(42,42,42,0.3)';
  ctx.value.fillStyle = 'rgba(47,47,47,0.34)';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        ctx.value.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      ctx.value.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
};

const getNextState = () => {
  let newGrid = grid.map(arr => [...arr]);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
            neighbors += grid[ny][nx];
          }
        }
      }
      if (grid[y][x] === 1) {
        newGrid[y][x] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[y][x] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  grid = newGrid;
};

const liveTick = () => {
  if (!isRunning) return;
  getNextState();
  drawGrid();
  animationFrameId = requestAnimationFrame(liveTick);
};

const handleGlobalMouseDown = (event) => {
  if (event.target.tagName !== 'CANVAS') return;
  isRunning = false;
  cancelAnimationFrame(animationFrameId);
  isDrawing = true;
  drawMode = event.button === 2 ? 0 : 1;
  handleMouseMove(event);
};

const handleGlobalMouseUp = () => {
  isDrawing = false;
  isRunning = true;
  liveTick();
};

const handleMouseMove = (event) => {
  if (!isDrawing) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    grid[y][x] = drawMode;
    drawGrid();
  }
};

onMounted(() => {
  rows = Math.floor(window.innerHeight / cellSize);
  cols = Math.floor(window.innerWidth / cellSize);
  canvas.value.width = cols * cellSize;
  canvas.value.height = rows * cellSize;
  ctx.value = canvas.value.getContext('2d');
  initGrid();
  drawGrid();
  liveTick();

  window.addEventListener('mousedown', handleGlobalMouseDown);
  window.addEventListener('mouseup', handleGlobalMouseUp);
  window.addEventListener('mousemove', handleMouseMove);
  canvas.value.addEventListener('contextmenu', (e) => e.preventDefault());
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('mousedown', handleGlobalMouseDown);
  window.removeEventListener('mouseup', handleGlobalMouseUp);
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div>
    <canvas ref="canvas" class="absolute inset-0 bg-bg-main-dark -z-10"></canvas>
  </div>
</template>
