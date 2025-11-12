<script setup lang="ts">
import type {PrimitiveProps} from "reka-ui"
import type {HTMLAttributes} from "vue"
import {cn} from "~/lib/utils";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
  speed?: number
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 0.005,
  opacity: 0.1
})

onMounted(() => {
  const $svg = document.querySelector('svg') as SVGSVGElement

  const size = 50
  const cx = 152
  const cy = 56
  let angleY = 0
  const angleX = -Math.PI / 6 // наклон сверху (~30°)

  const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1]
  ]

  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ]

  const edgeElements = edges.map(() => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
    line.setAttribute("stroke", "currentColor")
    line.setAttribute("stroke-width", "2")
    line.setAttribute("fill", "none")
    line.setAttribute("stroke-opacity", props.opacity.toString())
    $svg.querySelector('g')!.appendChild(line)
    return line
  })

  function project3D(x: number, y: number, z: number) {
    // Трёхточечная перспектива
    const f = 200
    const scale = f / (f + z)
    return {
      x: cx + (x) * size * scale,
      y: cy + (y) * size * scale
    }
  }

  function animateCube() {
    angleY += props.speed
    const cosY = Math.cos(angleY)
    const sinY = Math.sin(angleY)
    const cosX = Math.cos(angleX)
    const sinX = Math.sin(angleX)

    const projected = vertices.map(([x, y, z]) => {
      // Вращение вокруг Y
      let xr = x * cosY + z * sinY
      let zr = -x * sinY + z * cosY
      let yr = y * cosX - zr * sinX
      zr = y * sinX + zr * cosX
      return project3D(xr, yr, zr)
    })

    edges.forEach(([i,j], idx) => {
      const p1 = projected[i]
      const p2 = projected[j]
      edgeElements[idx].setAttribute("points", `${p1.x},${p1.y} ${p2.x},${p2.y}`)
    })

    requestAnimationFrame(animateCube)
  }

  animateCube()
})
</script>

<template>
  <svg viewBox="0 0 304 112" :class="cn('size-200', props.class)">
    <g></g>
  </svg>
</template>

<style scoped>

</style>