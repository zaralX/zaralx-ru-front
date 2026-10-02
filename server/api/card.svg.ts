import type {ContributionDay, ContributionsResponse} from "~/types/contributions";

/**
 * Анимированная SVG-карточка со сводной активностью GitHub + GitLab для README профиля.
 * Оба сервиса показывают её через <img>, поэтому внутри нет скриптов и внешних ресурсов
 * (шрифтов, картинок) - только встроенный CSS и системный моноширинный шрифт.
 */

const PAD = 24
const RADIUS = 10

const NUMBER_Y = 54
const DIGIT_W = 21
const DIGIT_H = 40

const STEP = 14
const CELL = 11
const GRID_X = PAD + 30
const GRID_Y = 114

const TILE_Y = 226
const TILE_H = 54
const TILE_GAP = 10

const HEIGHT = TILE_Y + TILE_H + PAD

const GLINT_W = 160
const RUNNER = 90

const LEVELS = ["#292524", "#78350f", "#b45309", "#f59e0b", "#fcd34d"]
const GITHUB_COLOR = "#e7e5e4"
const GITLAB_COLOR = "#fc6d26"
const ACCENT = "#f59e0b"

/** Контуры из набора Lucide - те же иконки, что и на сайте */
const ICONS = {
    github: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2",
    gitlab: "m22 13.29l-3.33-10a.4.4 0 0 0-.14-.18a.38.38 0 0 0-.22-.11a.4.4 0 0 0-.23.07a.4.4 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.4.4 0 0 0-.1-.18a.38.38 0 0 0-.26-.08a.4.4 0 0 0-.23.07a.4.4 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83",
    flame: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0a5 5 0 0 1 1-3a1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
}

/** Подписи сформулированы так, чтобы не склонять их под число */
const TEXTS = {
    en: {
        locale: "en-US",
        caption: "contributions in the last year",
        weekdays: ["Mon", "Wed", "Fri"],
        days: "d",
        current: "current streak",
        longest: "longest streak",
        best: "best day",
        active: "active days"
    },
    ru: {
        locale: "ru-RU",
        caption: "вклады за последний год",
        weekdays: ["Пн", "Ср", "Пт"],
        days: "дн.",
        current: "текущая серия",
        longest: "лучшая серия",
        best: "лучший день",
        active: "активных дней"
    }
}

type Texts = typeof TEXTS.en

export default defineEventHandler(async event => {
    const lang = getQuery(event).lang === "ru" ? "ru" : "en"
    const data = await $fetch<ContributionsResponse>("/api/contributions")

    // Прокси картинок GitHub держит копию столько, сколько разрешает этот заголовок.
    // Если источник отвалился, карточка неполная - не даём ей залипнуть надолго.
    const healthy = data.sources.github && data.sources.gitlab

    setHeader(event, "Content-Type", "image/svg+xml; charset=utf-8")
    setHeader(event, "Cache-Control", `public, max-age=${healthy ? 60 * 30 : 60 * 5}`)

    return render(data, TEXTS[lang])
});

function render(data: ContributionsResponse, text: Texts): string {
    const days = data.weeks.flat().filter((day): day is ContributionDay => day !== null)

    const gridWidth = data.weeks.length * STEP - (STEP - CELL)
    const width = GRID_X + gridWidth + PAD
    const perimeter = round(2 * (width - 1 + HEIGHT - 1) - 8 * RADIUS + 2 * Math.PI * RADIUS)

    const number = new Intl.NumberFormat(text.locale)
    const dayFormatter = new Intl.DateTimeFormat(text.locale, {day: "numeric", month: "short", timeZone: "UTC"})
    const monthFormatter = new Intl.DateTimeFormat(text.locale, {month: "short", timeZone: "UTC"})

    // --- Шапка ---------------------------------------------------------------

    const total = odometer(number.format(data.total))
    const captionX = PAD + total.width + 14

    const gitlabX = width - PAD - 70
    const githubX = gitlabX - 84

    const barWidth = width - PAD * 2
    const githubWidth = data.total ? Math.round(barWidth * data.totals.github / data.total) : 0

    const bar = data.total ? `<g class="grow">`
        + `<rect x="${PAD}" y="78" width="${Math.max(0, githubWidth - 1)}" height="4" rx="2" fill="${GITHUB_COLOR}"/>`
        + `<rect x="${PAD + githubWidth + 1}" y="78" width="${Math.max(0, barWidth - githubWidth - 1)}" height="4" rx="2" fill="${GITLAB_COLOR}"/>`
        + `</g>` : ""

    // --- Сетка ---------------------------------------------------------------

    const months = data.months.map(month => {
        const week = data.weeks[month.column]!.filter(day => day !== null)
        // Месяц начинается где-то внутри этой недели, поэтому смотрим на её последний день.
        // Нулевая колонка подписывает месяц, с которого открывается окно.
        const day = month.column === 0 ? week[0]! : week[week.length - 1]!
        const label = monthFormatter.format(new Date(day.date)).replace(".", "")

        return `<text x="${GRID_X + month.column * STEP}" y="${GRID_Y - 8}">${label}</text>`
    }).join("")

    const weekdays = text.weekdays
        .map((label, index) => `<text x="${PAD}" y="${GRID_Y + (index * 2 + 1) * STEP + 9}">${label}</text>`)
        .join("")

    const columns = data.weeks.map((week, column) => {
        const cells = week
            .map((day, row) => day
                ? `<rect class="l${day.level}" x="${GRID_X + column * STEP}" y="${GRID_Y + row * STEP}" width="${CELL}" height="${CELL}" rx="2"/>`
                : "")
            .join("")

        return `<g class="col" style="animation-delay:${column * 18}ms">${cells}</g>`
    }).join("")

    // Блик ходит только по клеткам: маска - тот же узор сетки, обрезанный по реальным дням
    const mask = data.weeks.map((week, column) => {
        const rows = week.flatMap((day, row) => day ? [row] : [])
        if (!rows.length) return ""

        const from = rows[0]!
        const to = rows[rows.length - 1]!

        return `<rect x="${GRID_X + column * STEP}" y="${GRID_Y + from * STEP}" width="${STEP}" height="${(to - from + 1) * STEP}" fill="url(#cell)"/>`
    }).join("")

    // --- Плитки --------------------------------------------------------------

    const streaks = getStreaks(days)
    const best = days.reduce((top, day) => day.count > top.count ? day : top, days[0]!)

    const tiles = [
        {value: `${streaks.current} ${text.days}`, label: text.current, flame: streaks.current > 0},
        {value: `${streaks.longest} ${text.days}`, label: text.longest},
        {value: number.format(best.count), label: `${text.best} · ${dayFormatter.format(new Date(best.date))}`},
        {value: number.format(days.filter(day => day.count > 0).length), label: text.active}
    ]

    const tileWidth = (width - PAD * 2 - TILE_GAP * (tiles.length - 1)) / tiles.length

    const tilesSvg = tiles.map((tile, index) => {
        const x = round(PAD + index * (tileWidth + TILE_GAP))

        return `<g class="tile" style="animation-delay:${1000 + index * 120}ms">`
            + `<rect x="${x}" y="${TILE_Y}" width="${round(tileWidth)}" height="${TILE_H}" rx="6" fill="#1c1917" stroke="#292524"/>`
            + `<text class="b" x="${x + 14}" y="${TILE_Y + 24}" font-size="17" fill="#f5f5f4">${tile.value}</text>`
            + `<text x="${x + 14}" y="${TILE_Y + 41}" font-size="10" fill="#78716c">${tile.label}</text>`
            + (tile.flame ? `<g class="flame">${icon("flame", round(x + tileWidth - 34), TILE_Y + 17, 20, ACCENT)}</g>` : "")
            + `</g>`
    }).join("")

    const css = `
text{font-family:ui-monospace,SFMono-Regular,'Cascadia Mono',Consolas,'DejaVu Sans Mono','Liberation Mono',monospace}
.b{font-weight:700}
${LEVELS.map((color, level) => `.l${level}{fill:${color}}`).join("")}
.col{animation:rise .5s ease-out both}
.tile{animation:rise .6s ease-out both}
.fade{animation:fade .8s ease-out both}
.roll{animation:roll 1.8s cubic-bezier(.16,1,.3,1) both}
.grow{transform-box:fill-box;transform-origin:0 50%;animation:grow 1.2s cubic-bezier(.16,1,.3,1) .2s both}
.dot{animation:pulse 2s ease-in-out infinite}
.flame{transform-box:fill-box;transform-origin:50% 100%;animation:flicker 1.4s ease-in-out infinite}
.glint{animation:glint 6s linear 1.6s infinite}
.runner{animation:run 8s linear infinite}
@keyframes rise{from{opacity:0;transform:translateY(6px)}}
@keyframes fade{from{opacity:0}}
@keyframes roll{from{transform:translateY(0)}}
@keyframes grow{from{transform:scaleX(0)}}
@keyframes pulse{50%{opacity:.25}}
@keyframes flicker{50%{opacity:.6;transform:scale(.9)}}
@keyframes glint{50%,to{transform:translateX(${gridWidth + GLINT_W}px)}}
@keyframes run{to{stroke-dashoffset:${-perimeter}}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
`

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" role="img">`
        + `<title>GitHub + GitLab: ${number.format(data.total)}</title>`
        + `<style>${css}</style>`
        + `<defs>`
        + `<clipPath id="digits"><rect x="0" y="${NUMBER_Y - 31}" width="${width}" height="${DIGIT_H}"/></clipPath>`
        + `<pattern id="cell" x="${GRID_X}" y="${GRID_Y}" width="${STEP}" height="${STEP}" patternUnits="userSpaceOnUse">`
        + `<rect width="${CELL}" height="${CELL}" rx="2" fill="#fff"/></pattern>`
        + `<mask id="cells" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${HEIGHT}">${mask}</mask>`
        + `<linearGradient id="glint"><stop offset="0" stop-color="#fef3c7" stop-opacity="0"/>`
        + `<stop offset=".5" stop-color="#fef3c7" stop-opacity=".55"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></linearGradient>`
        + `</defs>`
        + `<rect x=".5" y=".5" width="${width - 1}" height="${HEIGHT - 1}" rx="${RADIUS}" fill="#0c0a09" stroke="#292524"/>`
        + `<rect class="runner" x=".5" y=".5" width="${width - 1}" height="${HEIGHT - 1}" rx="${RADIUS}" fill="none" stroke="${ACCENT}"`
        + ` stroke-linecap="round" stroke-dasharray="${RUNNER} ${round(perimeter - RUNNER)}"/>`
        + `<g clip-path="url(#digits)" transform="translate(${PAD} 0)">${total.svg}</g>`
        + `<g class="fade">`
        + `<circle class="dot" cx="${captionX + 3}" cy="34" r="3" fill="${ACCENT}"/>`
        + `<text x="${captionX + 12}" y="38" font-size="10" letter-spacing="1.5" fill="#78716c">GITHUB + GITLAB</text>`
        + `<text x="${captionX}" y="${NUMBER_Y}" font-size="13" fill="#d6d3d1">${text.caption}</text>`
        + source("github", githubX, GITHUB_COLOR, number.format(data.totals.github), data.sources.github)
        + source("gitlab", gitlabX, GITLAB_COLOR, number.format(data.totals.gitlab), data.sources.gitlab)
        + `</g>`
        + `<rect x="${PAD}" y="78" width="${barWidth}" height="4" rx="2" fill="#292524"/>`
        + bar
        + `<g class="fade" font-size="10" fill="#78716c">${months}${weekdays}</g>`
        + columns
        + `<g mask="url(#cells)"><rect class="glint" x="${GRID_X - GLINT_W}" y="${GRID_Y}" width="${GLINT_W}" height="${STEP * 7}" fill="url(#glint)"/></g>`
        + tilesSvg
        + `</svg>`
}

/**
 * Счётчик-одометр: каждая цифра - лента 0-9, повторённая дважды, чтобы даже ноль
 * прокрутился на полный оборот. Конечное положение задано стилем, анимация едет к нему от нуля.
 */
function odometer(value: string): {svg: string; width: number} {
    const strip = Array.from({length: 20}, (_, index) =>
        `<tspan x="${DIGIT_W / 2}" dy="${index ? DIGIT_H : 0}">${index % 10}</tspan>`).join("")

    let svg = ""
    let x = 0
    let slot = 0

    for (const char of value) {
        if (/\d/.test(char)) {
            const offset = (10 + Number(char)) * DIGIT_H

            svg += `<g transform="translate(${x} 0)"><text class="roll b" y="${NUMBER_Y}" font-size="34" fill="#fafaf9" text-anchor="middle"`
                + ` style="transform:translateY(-${offset}px);animation-delay:${slot++ * 90}ms">${strip}</text></g>`
            x += DIGIT_W
            continue
        }

        // Разделитель разрядов: запятую рисуем, пробел оставляем просветом.
        // Знак в моноширинном шрифте занимает целую клетку, поэтому ставим его по центру узкого слота.
        const gap = DIGIT_W * 0.4

        if (char === ",") {
            svg += `<text class="b" x="${x + gap / 2}" y="${NUMBER_Y}" font-size="34" fill="#fafaf9" text-anchor="middle">,</text>`
        }

        x += gap
    }

    return {svg, width: Math.round(x)}
}

function source(name: "github" | "gitlab", x: number, color: string, count: string, alive: boolean): string {
    return `<g${alive ? "" : ` opacity=".4"`}>${icon(name, x, 31, 15, color)}`
        + `<text x="${x + 21}" y="43" font-size="13" fill="#d6d3d1">${count}</text></g>`
}

function icon(name: keyof typeof ICONS, x: number, y: number, size: number, color: string): string {
    return `<path transform="translate(${x} ${y}) scale(${size / 24})" d="${ICONS[name]}" fill="none" stroke="${color}"`
        + ` stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
}

function getStreaks(days: ContributionDay[]): {current: number; longest: number} {
    let run = 0
    let current = 0
    let longest = 0

    days.forEach((day, index) => {
        run = day.count > 0 ? run + 1 : 0
        longest = Math.max(longest, run)

        // Сегодняшний день ещё не закончился - пока он пустой, серию не обрываем
        if (run > 0 || index < days.length - 1) current = run
    })

    return {current, longest}
}

function round(value: number): number {
    return Math.round(value * 100) / 100
}
