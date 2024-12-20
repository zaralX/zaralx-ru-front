<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import {getHexColor} from "../../providers/minecraft/minecraftIdColor.js";
import * as minecraftColor from "../../providers/minecraft/minecraftIdColor.js";

const chunks = ref([]);
const canvas = ref();
const zoom = ref(1); // Начальный уровень зума
const gridSize = 32; // Размер ячейки сетки в пикселях при масштабе 1
const hoverCoordinates = ref({ x: 0, y: 0 });
const offset = ref({ x: 0, y: 0 }); // Смещение карты
const isDragging = ref(false); // Состояние зажатия ЛКМ
const dragStart = ref({ x: 0, y: 0 }); // Начальная точка перетаскивания

onMounted(async () => {
  window.addEventListener("resize", renderMap);
  window.addEventListener("wheel", handleZoom);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);

  chunks.value = (await axios.get("http://localhost:3001/v1/chunk/all")).data.chunks;
  renderMap();
});

onUnmounted(() => {
  window.removeEventListener("resize", renderMap);
  window.removeEventListener("wheel", handleZoom);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mousedown", handleMouseDown);
  window.removeEventListener("mouseup", handleMouseUp);
});

function renderMap() {
  const ctx = canvas.value.getContext("2d");
  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;
  canvas.value.width = width;
  canvas.value.height = height;

  // Очищаем холст
  ctx.clearRect(0, 0, width, height);

  // Отрисовка сетки
  const scaledGridSize = gridSize * zoom.value;
  ctx.strokeStyle = "#444"; // Цвет линии сетки
  ctx.lineWidth = 0.5;

  for (let x = -offset.value.x % scaledGridSize; x < width; x += scaledGridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = -offset.value.y % scaledGridSize; y < height; y += scaledGridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Пример отрисовки чанков (если есть данные)
  if (chunks.value.length > 0) {
    chunks.value.forEach((chunk) => {
      if (zoom.value < 3) {
        const x = chunk.x * scaledGridSize - offset.value.x;
        const y = chunk.z * scaledGridSize - offset.value.y;
        const size = scaledGridSize;
        ctx.fillStyle = intToHex(chunk.color) || "#888";
        ctx.fillRect(x, y, size, size);
      } else {
        for (const block of chunk.blocks) {
          const x = chunk.x * scaledGridSize - offset.value.x;
          const y = chunk.z * scaledGridSize - offset.value.y;
          const size = scaledGridSize / 16;
          ctx.fillStyle = minecraftColor.getHexColor(block.id) || "#f00";
          ctx.fillRect(x + size * block.x, y + size * block.z, size, size);
        }
      }
    });
  }
}

function handleZoom(event) {
  // Регулировка масштаба (зум)
  const zoomStep = 0.1;
  const minZoom = 0.5;
  const maxZoom = 3;

  if (event.deltaY < 0) {
    zoom.value = Math.min(maxZoom, zoom.value + zoomStep);
  } else {
    zoom.value = Math.max(minZoom, zoom.value - zoomStep);
  }

  console.log("ZOOM", zoom.value)

  renderMap();
}

function intToHex(color) {
  // Преобразуем число в шестнадцатеричный формат
  const hex = color.toString(16);
  // Убедимся, что строка имеет длину 6 символов (формат RGB)
  return `#${hex.padStart(6, '0')}`;
}

function handleMouseMove(event) {
  if (isDragging.value) {
    // Перемещение карты
    const deltaX = event.clientX - dragStart.value.x;
    const deltaY = event.clientY - dragStart.value.y;

    dragStart.value.x = event.clientX;
    dragStart.value.y = event.clientY;

    offset.value.x -= deltaX / zoom.value;
    offset.value.y -= deltaY / zoom.value;

    // Ограничение перемещения по X
    if (offset.value.x / zoom.value < -10000) {
      offset.value.x = -10000 * zoom.value;
    }
    if (offset.value.x / zoom.value > 10000) {
      offset.value.x = 10000 * zoom.value;
    }

    // Ограничение перемещения по Y
    if (offset.value.y / zoom.value < -10000) {
      offset.value.y = -10000 * zoom.value;
    }
    if (offset.value.y / zoom.value > 10000) { // Здесь была ошибка (< вместо >)
      offset.value.y = 10000 * zoom.value;
    }

    renderMap();
  }

  const rect = canvas.value.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const x = Math.floor(
      (event.clientX - rect.left + offset.value.x - centerX) / (gridSize * zoom.value)
  );
  const y = Math.floor(
      (event.clientY - rect.top + offset.value.y - centerY) / (gridSize * zoom.value)
  );

  hoverCoordinates.value = { x, y };
}

function handleMouseDown(event) {
  if (event.button === 0) {
    isDragging.value = true;
    dragStart.value = { x: event.clientX, y: event.clientY };
  }
}

function handleMouseUp(event) {
  if (event.button === 0) {
    isDragging.value = false;
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 bg-neutral-800 text-white p-2 select-none">
    X: {{ hoverCoordinates.x }} Z: {{ hoverCoordinates.y }}
  </div>
  <canvas ref="canvas" class="w-full h-full bg-black"></canvas>
</template>
