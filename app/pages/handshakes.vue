<script setup lang="ts">
import { animate, svg, utils } from 'animejs'
import type { HandshakePerson } from '~/types/handshake'
import { handshakesSeed } from '~/data/handshakes'
import PersonAvatar from '~/components/handshakes/PersonAvatar.vue'
import {
  Select as ShSelect,
  SelectContent as ShSelectContent,
  SelectItem as ShSelectItem,
  SelectTrigger as ShSelectTrigger,
} from '~/components/ui/select'

useSeoMeta({
  title: 'Рукопожатия - zaralx.ru',
  description: 'Карта знакомств zaralX: кто с кем знаком и через сколько рукопожатий.',
})

const isDev = import.meta.dev
const STORAGE_KEY = 'zaralx-handshakes'

function cloneSeed(): HandshakePerson[] {
  return handshakesSeed.map(p => ({
    ...p,
    via: p.via ? [...p.via] : undefined,
    contacts: p.contacts ? { ...p.contacts } : undefined,
  }))
}

const persons = ref<HandshakePerson[]>(cloneSeed())
const selectedId = ref<string | null>(null)
const viewport = ref<HTMLElement>()

const byId = computed(() => new Map(persons.value.map(p => [p.id, p])))

function viasOf(p: HandshakePerson): string[] {
  return (p.via ?? []).filter(id => byId.value.has(id) && id !== p.id)
}

function primaryVia(p: HandshakePerson): string | undefined {
  return viasOf(p)[0]
}

// дети по основной (первой) связи - по ним строится дерево
const childrenOf = computed(() => {
  const m = new Map<string, HandshakePerson[]>()
  for (const p of persons.value) {
    const via = primaryVia(p)
    if (via) {
      if (!m.has(via)) m.set(via, [])
      m.get(via)!.push(p)
    }
  }
  return m
})

const roots = computed(() => persons.value.filter(p => !primaryVia(p)))

// --- Раскладка дерева ---
const NODE_W = 128
const NODE_H = 116
const LEVEL_H = 176
const PAD = 56

interface LaidNode { p: HandshakePerson; x: number; y: number; depth: number; px: number; py: number }
interface LaidEdge { id: string; childId: string; childDepth: number; x1: number; y1: number; x2: number; y2: number; bendY: number }

const layout = computed(() => {
  const nodes: LaidNode[] = []
  const pos = new Map<string, { x: number; y: number }>()
  const depthOf = new Map<string, number>()
  const visited = new Set<string>()
  let cursor = 0
  let maxDepth = 0

  const depthMemo = new Map<string, number>()
  const inProgress = new Set<string>()
  function dagDepth(id: string): number {
    if (depthMemo.has(id)) return depthMemo.get(id)!
    if (inProgress.has(id)) return 0 // цикл в данных - разрываем
    inProgress.add(id)
    const p = byId.value.get(id)
    const vias = p ? viasOf(p) : []
    const d = vias.length ? Math.max(...vias.map(dagDepth)) + 1 : 0
    inProgress.delete(id)
    depthMemo.set(id, d)
    return d
  }

  function place(p: HandshakePerson): number {
    if (visited.has(p.id)) return pos.get(p.id)?.x ?? cursor * NODE_W
    visited.add(p.id)
    const depth = dagDepth(p.id)
    maxDepth = Math.max(maxDepth, depth)
    const kids = childrenOf.value.get(p.id) ?? []
    let x: number
    if (!kids.length) {
      x = cursor * NODE_W + NODE_W / 2
      cursor++
    } else {
      const xs = kids.map(k => place(k))
      x = (Math.min(...xs) + Math.max(...xs)) / 2
    }
    const y = depth * LEVEL_H
    nodes.push({ p, x, y, depth, px: 0, py: 0 })
    pos.set(p.id, { x, y })
    depthOf.set(p.id, depth)
    return x
  }

  for (const r of roots.value) place(r)
  for (const p of persons.value) if (!visited.has(p.id)) place(p)

  const edges: LaidEdge[] = []
  const extraEdges: LaidEdge[] = []
  for (const p of persons.value) {
    const to = pos.get(p.id)
    if (!to) continue
    viasOf(p).forEach((viaId, i) => {
      const from = pos.get(viaId)
      if (!from) return
      const fromDepth = depthOf.get(viaId) ?? 0
      const edge = {
        id: `${viaId}->${p.id}`,
        childId: p.id,
        childDepth: depthOf.get(p.id) ?? 1,
        x1: from.x + PAD, y1: from.y + PAD + 68,
        x2: to.x + PAD, y2: to.y + PAD + 4,
        bendY: (fromDepth + 1) * LEVEL_H + PAD + 4,
      }
      if (i === 0) edges.push(edge)
      else extraEdges.push(edge)
    })
  }

  return {
    nodes: nodes.map(n => ({ ...n, px: n.x + PAD - NODE_W / 2, py: n.y + PAD })),
    edges,
    extraEdges,
    depthOf,
    width: Math.max(cursor * NODE_W, NODE_W) + PAD * 2,
    height: (maxDepth + 1) * LEVEL_H - (LEVEL_H - NODE_H) + PAD * 2,
  }
})

function edgePath(e: LaidEdge): string {
  const my = (e.bendY - e.y1) / 2
  const curve = `M ${e.x1} ${e.y1} C ${e.x1} ${e.y1 + my}, ${e.x2} ${e.bendY - my}, ${e.x2} ${e.bendY}`
  return e.bendY < e.y2 ? `${curve} L ${e.x2} ${e.y2}` : curve
}

// --- Перемещение и масштаб ---
const DEFAULT_ZOOM = 0.4
const zoom = ref(DEFAULT_ZOOM)
const pan = reactive({ x: 0, y: 0 })
const MIN_ZOOM = 0.4
const MAX_ZOOM = 2.5

const canvasStyle = computed(() => ({
  width: layout.value.width + 'px',
  height: layout.value.height + 'px',
  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom.value})`,
  transformOrigin: '0 0',
}))

function zoomAt(cx: number, cy: number, factor: number) {
  const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value * factor))
  const k = next / zoom.value
  pan.x = cx - (cx - pan.x) * k
  pan.y = cy - (cy - pan.y) * k
  zoom.value = next
}

function zoomFromCenter(factor: number) {
  const vp = viewport.value
  if (!vp) return
  zoomAt(vp.clientWidth / 2, vp.clientHeight / 2, factor)
}

function centerMap() {
  const vp = viewport.value
  if (!vp) return
  zoom.value = DEFAULT_ZOOM
  pan.x = (vp.clientWidth - layout.value.width * DEFAULT_ZOOM) / 2
  pan.y = Math.max((vp.clientHeight - layout.value.height * DEFAULT_ZOOM) / 2, 16)
}

function onWheel(e: WheelEvent) {
  const vp = viewport.value
  if (!vp) return
  const rect = vp.getBoundingClientRect()
  zoomAt(e.clientX - rect.left, e.clientY - rect.top, Math.exp(-e.deltaY * 0.0015))
}

const pointers = new Map<number, { x: number; y: number }>()
const panning = ref(false)
let pinchDist = 0
let suppressClick = false

function pinchDistance(): number {
  const [a, b] = [...pointers.values()]
  return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0
}

function onPointerDown(e: PointerEvent) {
  if (pointers.size === 0) suppressClick = false
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  panning.value = true
  if (pointers.size === 2) pinchDist = pinchDistance()
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerMove(e: PointerEvent) {
  const prev = pointers.get(e.pointerId)
  if (!prev) return
  const cur = { x: e.clientX, y: e.clientY }
  pointers.set(e.pointerId, cur)

  if (pointers.size === 1) {
    const dx = cur.x - prev.x
    const dy = cur.y - prev.y
    if (Math.abs(dx) + Math.abs(dy) > 2) suppressClick = true
    pan.x += dx
    pan.y += dy
  } else if (pointers.size === 2) {
    suppressClick = true
    const vp = viewport.value
    if (!vp) return
    const next = pinchDistance()
    if (pinchDist > 0 && next > 0) {
      const [a, b] = [...pointers.values()]
      const rect = vp.getBoundingClientRect()
      zoomAt((a!.x + b!.x) / 2 - rect.left, (a!.y + b!.y) / 2 - rect.top, next / pinchDist)
    }
    pinchDist = next
  }
}

function onPointerUp(e: PointerEvent) {
  pointers.delete(e.pointerId)
  if (pointers.size < 2) pinchDist = 0
  if (pointers.size === 0) {
    panning.value = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }
}

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
})

// --- Выделение и цепочка ---
const selected = computed(() => selectedId.value ? byId.value.get(selectedId.value) ?? null : null)

const chain = computed<HandshakePerson[]>(() => {
  const out: HandshakePerson[] = []
  const seen = new Set<string>()
  let cur = selected.value
  while (cur && !seen.has(cur.id)) {
    seen.add(cur.id)
    out.unshift(cur)
    const via = primaryVia(cur)
    cur = via ? byId.value.get(via) ?? null : null
  }
  return out
})

const chainIds = computed(() => new Set(chain.value.map(p => p.id)))

const highlightIds = computed(() => {
  const s = new Set(chainIds.value)
  if (selected.value) for (const id of viasOf(selected.value)) s.add(id)
  return s
})

function isExtraHighlighted(e: LaidEdge): boolean {
  return selectedId.value === e.childId
}

const otherVias = computed(() => {
  if (!selected.value) return []
  return viasOf(selected.value).slice(1).map(id => byId.value.get(id)!).filter(Boolean)
})

function handshakeWord(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return 'рукопожатие'
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'рукопожатия'
  return 'рукопожатий'
}

const selectedDepth = computed(() => selected.value ? layout.value.depthOf.get(selected.value.id) ?? 0 : 0)

function onNodeClick(id: string) {
  if (suppressClick) return
  selectedId.value = selectedId.value === id ? null : id
}

// --- Контакты ---
function telegramLink(v: string) { return 'https://t.me/' + v.replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '') }
function telegramLabel(v: string) { return '@' + v.replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '') }
function githubLink(v: string) { return 'https://github.com/' + v.replace(/^https?:\/\/github\.com\//, '') }
function githubLabel(v: string) { return v.replace(/^https?:\/\/github\.com\//, '') }
function siteLink(v: string) { return /^https?:\/\//.test(v) ? v : 'https://' + v }
function siteLabel(v: string) { try { return new URL(siteLink(v)).hostname } catch { return v } }

// --- Форма добавления / редактирования (только dev) ---
const formOpen = ref(false)
const editId = ref<string | null>(null)
const form = reactive<{ name: string; image: string; telegram: string; github: string; site: string; note: string; via: string[] }>({
  name: '', image: '', telegram: '', github: '', site: '', note: '', via: [],
})

function descendantIds(id: string): Set<string> {
  const out = new Set<string>()
  const queue = [id]
  while (queue.length) {
    const cur = queue.shift()!
    for (const p of persons.value) {
      if (viasOf(p).includes(cur) && !out.has(p.id)) {
        out.add(p.id)
        queue.push(p.id)
      }
    }
  }
  return out
}

const viaOptions = computed(() => {
  if (!editId.value) return persons.value
  const blocked = descendantIds(editId.value)
  blocked.add(editId.value)
  return persons.value.filter(p => !blocked.has(p.id))
})

const viaSelectionLabel = computed(() => {
  if (!form.via.length) return 'Никого - корень карты'
  return form.via.map(id => byId.value.get(id)?.name ?? '?').join(', ')
})

function openAdd(viaId?: string) {
  editId.value = null
  Object.assign(form, { name: '', image: '', telegram: '', github: '', site: '', note: '', via: viaId ? [viaId] : roots.value[0] ? [roots.value[0].id] : [] })
  formOpen.value = true
}

function openEdit(p: HandshakePerson) {
  editId.value = p.id
  Object.assign(form, {
    name: p.name,
    image: p.image ?? '',
    telegram: p.contacts?.telegram ?? '',
    github: p.contacts?.github ?? '',
    site: p.contacts?.site ?? '',
    note: p.note ?? '',
    via: viasOf(p),
  })
  formOpen.value = true
}

function saveForm() {
  const name = form.name.trim()
  if (!name) return
  const contacts = {
    telegram: form.telegram.trim() || undefined,
    github: form.github.trim() || undefined,
    site: form.site.trim() || undefined,
  }
  const hasContacts = contacts.telegram || contacts.github || contacts.site
  const payload = {
    name,
    image: form.image.trim() || undefined,
    contacts: hasContacts ? contacts : undefined,
    note: form.note.trim() || undefined,
    via: form.via.length ? [...form.via] : undefined,
  }
  if (editId.value) {
    const p = byId.value.get(editId.value)
    if (p) Object.assign(p, payload)
    selectedId.value = editId.value
  } else {
    const id = payload.name.toLowerCase()
    persons.value.push({ id, ...payload })
    selectedId.value = id
  }
  formOpen.value = false
}

function removePerson(p: HandshakePerson) {
  if (!window.confirm(`Удалить \"${p.name}\" с карты? Его знакомые будут привязаны выше по цепочке.`)) return
  const parentVias = viasOf(p)
  for (const child of persons.value) {
    if (!child.via?.includes(p.id)) continue
    const merged = [...child.via.filter(id => id !== p.id), ...parentVias]
    const unique = [...new Set(merged)].filter(id => id !== child.id)
    child.via = unique.length ? unique : undefined
  }
  persons.value = persons.value.filter(x => x.id !== p.id)
  selectedId.value = null
}

// --- Сохранение (только dev) ---
const copied = ref(false)

function normalize(arr: unknown): HandshakePerson[] | null {
  if (!Array.isArray(arr) || !arr.length) return null
  if (!arr.every(x => x && typeof x.id === 'string' && typeof x.name === 'string')) return null
  return arr.map(p => ({
    ...p,
    via: typeof p.via === 'string' ? [p.via] : Array.isArray(p.via) ? p.via : undefined,
  }))
}

onMounted(() => {
  if (isDev) {
    try {
      const stored = normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'))
      if (stored) persons.value = stored
    } catch { }
  }

  nextTick(() => {
    centerMap()
    playIntro()
  })
})

function playIntro() {
  const LEVEL_DELAY = 320
  const nodeEls = [...document.querySelectorAll<HTMLElement>('.hs-node')]
  const edgeEls = [...document.querySelectorAll<SVGPathElement>('.hs-edge')]
  const extraGroup = document.querySelector<SVGGElement>('.hs-extra-group')
  if (!nodeEls.length) return

  try {
    utils.set(nodeEls, { opacity: 0 })
    animate(nodeEls, {
      opacity: 1,
      duration: 450,
      ease: 'out(2)',
      delay: el => Number((el as HTMLElement).dataset.depth ?? 0) * LEVEL_DELAY,
      onComplete: () => nodeEls.forEach(el => { el.style.opacity = '' }),
    })

    for (const el of edgeEls) {
      const depth = Number(el.dataset.depth ?? 1)
      const drawable = svg.createDrawable(el)
      utils.set(drawable, { draw: '0 0' })
      animate(drawable, {
        draw: '0 1',
        duration: 420,
        ease: 'out(2)',
        delay: (depth - 1) * LEVEL_DELAY + 160,
      })
    }

    if (extraGroup) {
      const maxDepth = Math.max(0, ...nodeEls.map(el => Number(el.dataset.depth ?? 0)))
      utils.set(extraGroup, { opacity: 0 })
      animate(extraGroup, {
        opacity: [0, 1],
        duration: 700,
        ease: 'out(2)',
        delay: maxDepth * LEVEL_DELAY + 300,
      })
    }
  } catch { }
}

watch(persons, (v) => {
  if (isDev && import.meta.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
}, { deep: true })

async function exportJson() {
  await navigator.clipboard.writeText(JSON.stringify(persons.value, null, 2))
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function resetMap() {
  if (!window.confirm('Сбросить карту к опубликованной версии? Ваши локальные изменения будут удалены.')) return
  localStorage.removeItem(STORAGE_KEY)
  persons.value = cloneSeed()
  selectedId.value = null
}
</script>

<template>
  <div class="px-4 sm:px-8 md:px-32 pb-24">
    <div class="py-16 text-center">
      <h1 class="text-3xl font-unbounded">Рукопожатия</h1>
      <p class="text-slate-400 text-lg">Карта знакомств: кто с кем знаком и через сколько рукопожатий</p>
    </div>

    <div class="max-w-7xl mx-auto">
      <div v-if="isDev" class="flex flex-wrap items-center gap-2 mb-3">
        <ShButton variant="ghost" class="bg-black/25" icon="lucide:user-plus" @click="openAdd()">Добавить человека</ShButton>
        <ShButton variant="ghost" class="bg-black/25" :icon="copied ? 'lucide:check' : 'lucide:copy'" @click="exportJson">
          {{ copied ? 'Скопировано!' : 'Экспорт JSON' }}
        </ShButton>
        <ShButton variant="ghost" class="bg-black/25" icon="lucide:rotate-ccw" @click="resetMap">Сбросить</ShButton>
        <p class="text-stone-600 text-xs ml-auto">Dev-режим: изменения сохраняются в браузере, "Экспорт" - чтобы вставить в data/handshakes.ts</p>
      </div>

      <div ref="viewport"
           class="relative overflow-hidden rounded-lg border border-stone-800 bg-stone-950/60 h-[65vh] min-h-96 select-none touch-none"
           :class="panning ? 'cursor-grabbing' : 'cursor-grab'"
           style="background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px;"
           @wheel.prevent="onWheel"
           @pointerdown="onPointerDown">
        <div v-if="persons.length" class="absolute top-0 left-0" :style="canvasStyle">
          <svg class="absolute inset-0 pointer-events-none" :width="layout.width" :height="layout.height"
               :viewBox="`0 0 ${layout.width} ${layout.height}`" fill="none">
            <g class="hs-extra-group">
              <path v-for="e in layout.extraEdges" :key="e.id" :d="edgePath(e)"
                    class="transition-[stroke,opacity] duration-300" stroke-dasharray="4 5"
                    :stroke="isExtraHighlighted(e) ? '#fb923c' : '#57534e'"
                    :stroke-width="isExtraHighlighted(e) ? 2 : 1.5"
                    :opacity="isExtraHighlighted(e) ? 1 : 0.7" />
            </g>
            <path v-for="e in layout.edges" :key="e.id" :d="edgePath(e)"
                  class="hs-edge transition-[stroke] duration-300"
                  :data-depth="e.childDepth"
                  :stroke="chainIds.has(e.childId) ? '#fb923c' : '#44403c'"
                  :stroke-width="chainIds.has(e.childId) ? 2 : 1.5" />
          </svg>

          <button v-for="n in layout.nodes" :key="n.p.id"
                  class="hs-node absolute flex flex-col items-center gap-1.5 cursor-pointer group transition-[left,top,opacity] duration-300"
                  :data-depth="n.depth"
                  :style="{ left: n.px + 'px', top: n.py + 'px', width: NODE_W + 'px' }"
                  :class="{ 'opacity-40': selectedId && !highlightIds.has(n.p.id) }"
                  @click="onNodeClick(n.p.id)">
            <div class="relative">
              <PersonAvatar :person="n.p"
                            class="ring-2 transition-all duration-300 group-hover:ring-orange-400/70 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.25)]"
                            :class="selectedId === n.p.id ? 'ring-orange-500 shadow-[0_0_24px_rgba(251,146,60,0.35)]' : 'ring-stone-700'" />
              <span v-if="n.depth > 0"
                    class="absolute -top-1 -right-1 text-[10px] leading-none bg-stone-800 border border-stone-600 text-stone-300 rounded-full w-5 h-5 flex items-center justify-center">
                {{ n.depth }}
              </span>
            </div>
            <p class="text-xs text-center text-stone-300 leading-tight line-clamp-2 px-1">{{ n.p.name }}</p>
          </button>
        </div>

        <div v-else class="h-full flex flex-col items-center justify-center gap-3 text-stone-500">
          <Icon name="lucide:users" class="text-3xl" />
          <p>Карта пуста</p>
          <ShButton v-if="isDev" variant="ghost" class="bg-black/25" icon="lucide:user-plus" @click="openAdd()">Добавить первого человека</ShButton>
        </div>

        <!-- Управление масштабом -->
        <div class="absolute bottom-3 right-3 flex flex-col gap-1.5">
          <button class="w-9 h-9 rounded-md bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 duration-200 flex items-center justify-center"
                  aria-label="Приблизить" @click.stop="zoomFromCenter(1.25)" @pointerdown.stop>
            <Icon name="lucide:plus" />
          </button>
          <button class="w-9 h-9 rounded-md bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 duration-200 flex items-center justify-center"
                  aria-label="Отдалить" @click.stop="zoomFromCenter(0.8)" @pointerdown.stop>
            <Icon name="lucide:minus" />
          </button>
          <button class="w-9 h-9 rounded-md bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 duration-200 flex items-center justify-center"
                  aria-label="По центру" @click.stop="centerMap" @pointerdown.stop>
            <Icon name="lucide:maximize" />
          </button>
        </div>
        <p class="absolute bottom-3 left-3 text-stone-600 text-xs pointer-events-none hidden sm:block">
          {{ Math.round(zoom * 100) }}% · колесо - масштаб, зажми и тяни - перемещение
        </p>
      </div>

      <div class="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-3">
        <p class="text-stone-400 text-sm">
          Знаком со мной, но тебя нет на карте? Или хочешь изменить свою карточку?
          <span class="text-stone-500">Напиши мне - добавлю связь.</span>
        </p>
        <ShButton as="a" href="https://t.me/zWork1" target="_blank" variant="ghost" class="bg-black/25 shrink-0" icon="iconoir:telegram">
          Написать в Telegram
        </ShButton>
      </div>
    </div>

    <!-- Карточка выбранного человека -->
    <Transition name="hs-card">
      <div v-if="selected" class="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-8 sm:w-96 z-40
                                  bg-stone-900/95 backdrop-blur border border-stone-700 rounded-lg p-4 shadow-xl space-y-3">
        <div class="flex items-start gap-3">
          <PersonAvatar :person="selected" size-class="w-14 h-14" class="ring-2 ring-orange-500/60" />
          <div class="flex-1 min-w-0">
            <p class="font-unbounded truncate">{{ selected.name }}</p>
            <p class="text-stone-500 text-xs">
              {{ selectedDepth === 0 ? 'Корень карты' : `${selectedDepth} ${handshakeWord(selectedDepth)} от ${chain[0]?.name}` }}
            </p>
          </div>
          <button class="text-stone-500 hover:text-stone-200 duration-200" aria-label="Закрыть" @click="selectedId = null">
            <Icon name="lucide:x" />
          </button>
        </div>

        <div v-if="chain.length > 1" class="flex flex-wrap items-center gap-1 text-xs text-stone-400">
          <template v-for="(p, i) in chain" :key="p.id">
            <Icon v-if="i > 0" name="lucide:chevron-right" class="text-stone-600" />
            <button class="hover:text-orange-400 duration-200"
                    :class="{ 'text-orange-400': p.id === selected.id }"
                    @click="selectedId = p.id">{{ p.name }}</button>
          </template>
        </div>

        <div v-if="otherVias.length" class="flex flex-wrap items-center gap-1 text-xs text-stone-500">
          <span>Также знаком через:</span>
          <template v-for="(p, i) in otherVias" :key="p.id">
            <span v-if="i > 0" class="text-stone-700">·</span>
            <button class="text-stone-400 hover:text-orange-400 duration-200" @click="selectedId = p.id">{{ p.name }}</button>
          </template>
        </div>

        <p v-if="selected.note" class="text-stone-400 text-sm italic">{{ selected.note }}</p>

        <div v-if="selected.contacts" class="space-y-1 text-sm">
          <a v-if="selected.contacts.telegram" :href="telegramLink(selected.contacts.telegram)" target="_blank"
             class="flex items-center gap-2 text-stone-300 hover:text-orange-400 duration-200 w-fit">
            <Icon name="iconoir:telegram" /> {{ telegramLabel(selected.contacts.telegram) }}
          </a>
          <a v-if="selected.contacts.github" :href="githubLink(selected.contacts.github)" target="_blank"
             class="flex items-center gap-2 text-stone-300 hover:text-orange-400 duration-200 w-fit">
            <Icon name="lucide:github" /> {{ githubLabel(selected.contacts.github) }}
          </a>
          <a v-if="selected.contacts.site" :href="siteLink(selected.contacts.site)" target="_blank"
             class="flex items-center gap-2 text-stone-300 hover:text-orange-400 duration-200 w-fit">
            <Icon name="lucide:globe" /> {{ siteLabel(selected.contacts.site) }}
          </a>
        </div>

        <div v-if="isDev" class="flex flex-wrap gap-1 pt-1 border-t border-stone-800">
          <ShButton variant="ghost" size="sm" icon="lucide:user-plus" @click="openAdd(selected.id)">Добавить знакомого</ShButton>
          <ShButton variant="ghost" size="sm" icon="lucide:pencil" @click="openEdit(selected)">Изменить</ShButton>
          <ShButton variant="ghost" size="sm" icon="lucide:trash-2" class="text-red-400/80" @click="removePerson(selected)">Удалить</ShButton>
        </div>
      </div>
    </Transition>

    <!-- Форма добавления / редактирования (только dev) -->
    <Transition name="hs-card">
      <div v-if="isDev && formOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
           @click.self="formOpen = false">
        <div class="w-full max-w-md bg-stone-900 border border-stone-700 rounded-lg p-5 space-y-3 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between">
            <p class="font-unbounded">{{ editId ? 'Изменить человека' : 'Новый человек' }}</p>
            <button class="text-stone-500 hover:text-stone-200 duration-200" aria-label="Закрыть" @click="formOpen = false">
              <Icon name="lucide:x" />
            </button>
          </div>

          <div class="flex items-center gap-3">
            <PersonAvatar :person="{ name: form.name || '?', image: form.image || undefined }" size-class="w-14 h-14" class="ring-2 ring-stone-700" />
            <div class="flex-1 space-y-2">
              <input v-model="form.name" placeholder="Имя *" maxlength="40"
                     class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />
              <input v-model="form.image" placeholder="Картинка: /img/people/… или https://…"
                     class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />
            </div>
          </div>

          <div>
            <p class="text-stone-500 text-xs mb-1">Знаком через (первый в списке - основная связь)</p>
            <ShSelect v-model="form.via" multiple>
              <ShSelectTrigger class="w-full bg-stone-950 border-stone-700">
                <span class="flex-1 text-left truncate" :class="form.via.length ? 'text-stone-200' : 'text-stone-500'">
                  {{ viaSelectionLabel }}
                </span>
              </ShSelectTrigger>
              <ShSelectContent>
                <ShSelectItem v-for="p in viaOptions" :key="p.id" :value="p.id">{{ p.name }}</ShSelectItem>
              </ShSelectContent>
            </ShSelect>
          </div>

          <div>
            <p class="text-stone-500 text-xs mb-1">Контакты (опционально)</p>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <Icon name="iconoir:telegram" class="text-stone-500 shrink-0" />
                <input v-model="form.telegram" placeholder="Telegram: @username"
                       class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:github" class="text-stone-500 shrink-0" />
                <input v-model="form.github" placeholder="GitHub: username"
                       class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:globe" class="text-stone-500 shrink-0" />
                <input v-model="form.site" placeholder="Сайт: example.com"
                       class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />
              </div>
            </div>
          </div>

          <input v-model="form.note" placeholder="Заметка (опционально)" maxlength="120"
                 class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200" />

          <div class="flex justify-end gap-2 pt-1">
            <ShButton variant="ghost" size="sm" @click="formOpen = false">Отмена</ShButton>
            <ShButton size="sm" :disabled="!form.name.trim()" @click="saveForm">
              {{ editId ? 'Сохранить' : 'Добавить' }}
            </ShButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hs-card-enter-active,
.hs-card-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hs-card-enter-from,
.hs-card-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
