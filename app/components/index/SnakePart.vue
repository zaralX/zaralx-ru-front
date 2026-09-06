<script setup lang="ts">
interface Point {
  x: number
  y: number
}

const GRID = 15
const CELL = 20
const RECORD_KEY = 'zaralx-snake-record'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const state = ref<'idle' | 'playing' | 'over'>('idle')
const score = ref(0)
const record = ref(0)

let snake: Point[] = []
let direction: Point = {x: 1, y: 0}
let queued: Point[] = []
let food: Point = {x: 0, y: 0}
let timer: ReturnType<typeof setInterval> | undefined

const speed = computed(() => Math.max(70, 140 - score.value * 3))

function readRecord() {
  try {
    return Number(localStorage.getItem(RECORD_KEY)) || 0
  } catch {
    return 0
  }
}

function saveRecord(value: number) {
  localStorage.setItem(RECORD_KEY, String(value))
}

function placeFood() {
  const free: Point[] = []

  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (!snake.some(part => part.x === x && part.y === y)) free.push({x, y})
    }
  }

  food = free[Math.floor(Math.random() * free.length)] ?? {x: 0, y: 0}
}

function start() {
  snake = [{x: 7, y: 7}, {x: 6, y: 7}, {x: 5, y: 7}]
  direction = {x: 1, y: 0}
  queued = []
  score.value = 0
  state.value = 'playing'

  placeFood()
  restartTimer()
  draw()
}

function restartTimer() {
  clearInterval(timer)
  timer = setInterval(tick, speed.value)
}

function stop() {
  clearInterval(timer)
  timer = undefined
  state.value = 'over'

  if (score.value > record.value) {
    record.value = score.value
    saveRecord(score.value)
  }

  draw()
}

function tick() {
  const next = queued.shift()
  if (next && (next.x !== -direction.x || next.y !== -direction.y)) direction = next

  const head = {x: snake[0]!.x + direction.x, y: snake[0]!.y + direction.y}

  const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID
  const hitSelf = snake.some(part => part.x === head.x && part.y === head.y)

  if (hitWall || hitSelf) return stop()

  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    score.value += 1
    placeFood()
    restartTimer()
  } else {
    snake.pop()
  }

  draw()
}

function turn(next: Point) {
  if (state.value !== 'playing') return

  const last = queued[queued.length - 1] ?? direction
  if (last.x === next.x && last.y === next.y) return
  if (last.x === -next.x && last.y === -next.y) return

  if (queued.length < 2) queued.push(next)
}

function draw() {
  const context = canvas.value?.getContext('2d')
  if (!context) return

  context.fillStyle = '#0c0a09'
  context.fillRect(0, 0, GRID * CELL, GRID * CELL)

  context.fillStyle = '#f97316'
  context.fillRect(food.x * CELL + 5, food.y * CELL + 5, CELL - 10, CELL - 10)

  snake.forEach((part, index) => {
    context.fillStyle = index === 0 ? '#fcd34d' : '#d97706'
    context.globalAlpha = index === 0 ? 1 : Math.max(0.35, 1 - index / (snake.length + 4))
    context.fillRect(part.x * CELL + 2, part.y * CELL + 2, CELL - 4, CELL - 4)
  })

  context.globalAlpha = 1
}

const keys: Record<string, Point> = {
  ArrowUp: {x: 0, y: -1}, w: {x: 0, y: -1}, ц: {x: 0, y: -1},
  ArrowDown: {x: 0, y: 1}, s: {x: 0, y: 1}, ы: {x: 0, y: 1},
  ArrowLeft: {x: -1, y: 0}, a: {x: -1, y: 0}, ф: {x: -1, y: 0},
  ArrowRight: {x: 1, y: 0}, d: {x: 1, y: 0}, в: {x: 1, y: 0},
}

function onKeydown(event: KeyboardEvent) {
  if (state.value !== 'playing') return

  const next = keys[event.key] ?? keys[event.key.toLowerCase()]
  if (!next) return

  event.preventDefault()
  turn(next)
}

let touchStart: Point | null = null

function onTouchStart(event: TouchEvent) {
  const touch = event.changedTouches[0]
  touchStart = touch ? {x: touch.clientX, y: touch.clientY} : null
}

function onTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0]
  if (!touchStart || !touch) return

  const dx = touch.clientX - touchStart.x
  const dy = touch.clientY - touchStart.y

  if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return

  turn(Math.abs(dx) > Math.abs(dy)
      ? {x: Math.sign(dx), y: 0}
      : {x: 0, y: Math.sign(dy)})
}

onMounted(() => {
  record.value = readRecord()
  window.addEventListener('keydown', onKeydown)
  draw()
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="px-4 md:px-8 lg:px-32 xl:px-64">
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg border border-stone-800 bg-stone-900 p-6 md:flex-row md:items-stretch md:p-8">
      <div class="flex flex-col justify-center md:flex-1">
        <h2 class="font-unbounded text-2xl">Сыграем?</h2>
        <p class="mt-3 text-sm text-stone-400">
          Да, это просто змейка.
        </p>

        <div class="mt-5 flex items-center gap-6">
          <div>
            <p class="text-xs text-stone-500">Счёт</p>
            <p class="font-unbounded text-2xl tabular-nums">{{ score }}</p>
          </div>
          <div>
            <p class="text-xs text-stone-500">Рекорд</p>
            <ClientOnly>
              <p class="font-unbounded text-2xl tabular-nums text-amber-400">{{ record }}</p>
              <template #fallback><p class="font-unbounded text-2xl tabular-nums text-amber-400">0</p></template>
            </ClientOnly>
          </div>
        </div>

        <button type="button" @click="start"
                class="mt-5 w-fit cursor-pointer rounded-md bg-stone-800 px-5 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-stone-700">
          {{ state === 'idle' ? 'Начать' : state === 'playing' ? 'Заново' : 'Ещё раз' }}
        </button>
      </div>

      <div class="relative shrink-0 touch-none select-none"
           @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
        <canvas ref="canvas" :width="GRID * CELL" :height="GRID * CELL"
                class="rounded-md border border-stone-800 bg-stone-950"
                :style="{ width: '300px', maxWidth: '100%', aspectRatio: '1' }"></canvas>

        <div v-if="state !== 'playing'"
             class="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md bg-stone-950/80 text-center backdrop-blur-[1px]">
          <p class="font-unbounded" :class="state === 'over' ? 'text-orange-400' : 'text-stone-300'">
            {{ state === 'over' ? 'Всё, приехали' : 'Змейка' }}
          </p>
          <p class="text-xs text-stone-500">
            {{ state === 'over' ? `Счёт: ${score}` : 'Нажмите «Начать»' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
