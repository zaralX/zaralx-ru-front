<script setup lang="ts">
import { animate, stagger, svg } from 'animejs'
import type { HandshakePerson } from '~/types/handshake'
import { handshakesSeed } from '~/data/handshakes'
import PersonAvatar from '~/components/handshakes/PersonAvatar.vue'

useSeoMeta({
  title: 'Рукопожатия - zaralx.ru',
  description: 'Карта знакомств zaralX: кто с кем знаком и через сколько рукопожатий.',
})

const STORAGE_KEY = 'zaralx-handshakes'

function cloneSeed(): HandshakePerson[] {
  return handshakesSeed.map(p => ({ ...p, contacts: p.contacts ? { ...p.contacts } : undefined }))
}

const persons = ref<HandshakePerson[]>(cloneSeed())
const selectedId = ref<string | null>(null)
const viewport = ref<HTMLElement>()

const byId = computed(() => new Map(persons.value.map(p => [p.id, p])))

const childrenOf = computed(() => {
  const m = new Map<string, HandshakePerson[]>()
  for (const p of persons.value) {
    if (p.via && byId.value.has(p.via)) {
      if (!m.has(p.via)) m.set(p.via, [])
      m.get(p.via)!.push(p)
    }
  }
  return m
})

const roots = computed(() => persons.value.filter(p => !p.via || !byId.value.has(p.via)))

// --- Раскладка дерева ---
const NODE_W = 128
const NODE_H = 116
const LEVEL_H = 176
const PAD = 56

interface LaidNode { p: HandshakePerson; x: number; y: number; depth: number }
interface LaidEdge { childId: string; x1: number; y1: number; x2: number; y2: number }

const layout = computed(() => {
  const nodes: LaidNode[] = []
  const pos = new Map<string, { x: number; y: number }>()
  const visited = new Set<string>()
  let cursor = 0
  let maxDepth = 0

  function place(p: HandshakePerson, depth: number): number {
    if (visited.has(p.id)) return cursor * NODE_W
    visited.add(p.id)
    maxDepth = Math.max(maxDepth, depth)
    const kids = childrenOf.value.get(p.id) ?? []
    let x: number
    if (!kids.length) {
      x = cursor * NODE_W + NODE_W / 2
      cursor++
    } else {
      const xs = kids.map(k => place(k, depth + 1))
      x = (Math.min(...xs) + Math.max(...xs)) / 2
    }
    const y = depth * LEVEL_H
    nodes.push({ p, x, y, depth })
    pos.set(p.id, { x, y })
    return x
  }

  for (const r of roots.value) place(r, 0)

  const edges: LaidEdge[] = []
  for (const p of persons.value) {
    if (!p.via) continue
    const from = pos.get(p.via)
    const to = pos.get(p.id)
    if (!from || !to) continue
    edges.push({
      childId: p.id,
      x1: from.x + PAD, y1: from.y + PAD + 68,
      x2: to.x + PAD, y2: to.y + PAD + 4,
    })
  }

  return {
    nodes: nodes.map(n => ({ ...n, px: n.x + PAD - NODE_W / 2, py: n.y + PAD })),
    edges,
    width: Math.max(cursor * NODE_W, NODE_W) + PAD * 2,
    height: (maxDepth + 1) * LEVEL_H - (LEVEL_H - NODE_H) + PAD * 2,
  }
})

function edgePath(e: LaidEdge): string {
  const my = (e.y2 - e.y1) / 2
  return `M ${e.x1} ${e.y1} C ${e.x1} ${e.y1 + my}, ${e.x2} ${e.y2 - my}, ${e.x2} ${e.y2}`
}

// --- Выделение и цепочка ---
const selected = computed(() => selectedId.value ? byId.value.get(selectedId.value) ?? null : null)

const chain = computed<HandshakePerson[]>(() => {
  const out: HandshakePerson[] = []
  let cur = selected.value
  let guard = 0
  while (cur && guard++ < 50) {
    out.unshift(cur)
    cur = cur.via ? byId.value.get(cur.via) ?? null : null
  }
  return out
})

const chainIds = computed(() => new Set(chain.value.map(p => p.id)))

function handshakeWord(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return 'рукопожатие'
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'рукопожатия'
  return 'рукопожатий'
}

const selectedDepth = computed(() => chain.value.length - 1)

// --- Контакты ---
function telegramLink(v: string) { return 'https://t.me/' + v.replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '') }
function telegramLabel(v: string) { return '@' + v.replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '') }
function githubLink(v: string) { return 'https://github.com/' + v.replace(/^https?:\/\/github\.com\//, '') }
function githubLabel(v: string) { return v.replace(/^https?:\/\/github\.com\//, '') }
function siteLink(v: string) { return /^https?:\/\//.test(v) ? v : 'https://' + v }
function siteLabel(v: string) { try { return new URL(siteLink(v)).hostname } catch { return v } }

// --- Форма добавления / редактирования ---
const formOpen = ref(false)
const editId = ref<string | null>(null)
const form = reactive({ name: '', image: '', telegram: '', github: '', site: '', note: '', via: '' })

function descendantIds(id: string): Set<string> {
  const out = new Set<string>()
  const queue = [id]
  while (queue.length) {
    const cur = queue.shift()!
    for (const k of childrenOf.value.get(cur) ?? []) {
      if (!out.has(k.id)) { out.add(k.id); queue.push(k.id) }
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

function openAdd(viaId?: string) {
  editId.value = null
  Object.assign(form, { name: '', image: '', telegram: '', github: '', site: '', note: '', via: viaId ?? roots.value[0]?.id ?? '' })
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
    via: p.via ?? '',
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
    via: form.via || undefined,
  }
  if (editId.value) {
    const p = byId.value.get(editId.value)
    if (p) Object.assign(p, payload)
    selectedId.value = editId.value
  } else {
    const id = crypto.randomUUID()
    persons.value.push({ id, ...payload })
    selectedId.value = id
  }
  formOpen.value = false
}

function removePerson(p: HandshakePerson) {
  if (!window.confirm(`Удалить «${p.name}» с карты? Его знакомые будут привязаны выше по цепочке.`)) return
  for (const child of childrenOf.value.get(p.id) ?? []) child.via = p.via
  persons.value = persons.value.filter(x => x.id !== p.id)
  selectedId.value = null
}

// --- Сохранение ---
const copied = ref(false)

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const arr = JSON.parse(raw)
      if (Array.isArray(arr) && arr.length && arr.every(x => x && typeof x.id === 'string' && typeof x.name === 'string')) {
        persons.value = arr
      }
    }
  } catch { /* битые данные - остаёмся на сиде */ }

  nextTick(() => {
    const vp = viewport.value
    if (vp) vp.scrollTo({ left: (layout.value.width - vp.clientWidth) / 2 })
    try {
      animate('.hs-node', { opacity: [0, 1], duration: 500, ease: 'out(2)', delay: stagger(60) })
      animate(svg.createDrawable('.hs-edge'), { draw: '0 1', duration: 900, ease: 'out(2)', delay: stagger(80) })
    } catch { /* нет узлов - нечего анимировать */ }
  })
})

watch(persons, (v) => {
  if (import.meta.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
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
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <ShButton variant="ghost" class="bg-black/25" icon="lucide:user-plus" @click="openAdd()">Добавить человека</ShButton>
        <ShButton variant="ghost" class="bg-black/25" :icon="copied ? 'lucide:check' : 'lucide:copy'" @click="exportJson">
          {{ copied ? 'Скопировано!' : 'Экспорт JSON' }}
        </ShButton>
        <ShButton variant="ghost" class="bg-black/25" icon="lucide:rotate-ccw" @click="resetMap">Сбросить</ShButton>
        <p class="text-stone-600 text-xs ml-auto">Изменения сохраняются в вашем браузере</p>
      </div>

      <div ref="viewport"
           class="relative overflow-auto rounded-lg border border-stone-800 bg-stone-950/60 h-[65vh] min-h-96"
           style="background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px;">
        <div v-if="persons.length" class="relative mx-auto" :style="{ width: layout.width + 'px', height: layout.height + 'px' }">
          <svg class="absolute inset-0 pointer-events-none" :width="layout.width" :height="layout.height"
               :viewBox="`0 0 ${layout.width} ${layout.height}`" fill="none">
            <path v-for="e in layout.edges" :key="e.childId" :d="edgePath(e)"
                  class="hs-edge transition-[stroke] duration-300"
                  :stroke="chainIds.has(e.childId) ? '#fb923c' : '#44403c'"
                  :stroke-width="chainIds.has(e.childId) ? 2 : 1.5" />
          </svg>

          <button v-for="n in layout.nodes" :key="n.p.id"
                  class="hs-node absolute flex flex-col items-center gap-1.5 cursor-pointer group transition-[left,top,opacity] duration-300"
                  :style="{ left: n.px + 'px', top: n.py + 'px', width: NODE_W + 'px' }"
                  :class="{ 'opacity-40': selectedId && !chainIds.has(n.p.id) }"
                  @click="selectedId = selectedId === n.p.id ? null : n.p.id">
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
          <ShButton variant="ghost" class="bg-black/25" icon="lucide:user-plus" @click="openAdd()">Добавить первого человека</ShButton>
        </div>
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

        <div class="flex flex-wrap gap-1 pt-1 border-t border-stone-800">
          <ShButton variant="ghost" size="sm" icon="lucide:user-plus" @click="openAdd(selected.id)">Добавить знакомого</ShButton>
          <ShButton variant="ghost" size="sm" icon="lucide:pencil" @click="openEdit(selected)">Изменить</ShButton>
          <ShButton variant="ghost" size="sm" icon="lucide:trash-2" class="text-red-400/80" @click="removePerson(selected)">Удалить</ShButton>
        </div>
      </div>
    </Transition>

    <!-- Форма добавления / редактирования -->
    <Transition name="hs-card">
      <div v-if="formOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
            <p class="text-stone-500 text-xs mb-1">Знаком через</p>
            <select v-model="form.via"
                    class="w-full bg-stone-950 border border-stone-700 rounded-md px-3 py-2 text-sm outline-none focus:border-orange-500/60 duration-200">
              <option value="">Никого - корень карты</option>
              <option v-for="p in viaOptions" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
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
