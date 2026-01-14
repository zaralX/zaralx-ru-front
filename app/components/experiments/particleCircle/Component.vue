<template>
  <div ref="container" class="overflow-hidden">
    <canvas ref="canvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  color: { type: String, default: '#ecf0f1' },
  fps: { type: Number, default: 120 },
  radius: { type: Number, default: 200 },
  emitters: { type: Number, default: 360 },
  size: { type: Number, default: 1 },
})

/* =======================
   Particle
======================= */
class Particle {
  constructor () {
    this.reset()
  }

  update () {
    this.position.x += Math.random() * 2 - 1
    this.position.y -= this.velocity.y
    this.alpha -= this.fadingSpeed

    if (this.alpha < 0) {
      this.reset()
    }
  }

  reset () {
    this.position = { x: 0, y: 0 }
    this.velocity = { x: 0, y: Math.random() - 0.4 }
    this.alpha = 1
    this.fadingSpeed = Math.random() * 0.03 + 0.005
  }
}

/* =======================
   ParticleEmitter
======================= */
class ParticleEmitter {
  constructor (x = 0, y = 0) {
    this.position = { x, y }
    this.particles = []
    this.particlesNumber = 6

    for (let i = 0; i < this.particlesNumber; i++) {
      this.particles.push(new Particle())
    }
  }

  update () {
    for (const particle of this.particles) {
      particle.update()
    }
  }
}

/* =======================
   Experience
======================= */
class Experience {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.fps = props.fps
    this.fpsInterval = 1000 / this.fps
    this.then = performance.now()

    this.radius = props.radius
    this.emitters = []

    for (let i = 0; i < props.emitters; i++) {
      this.emitters.push(new ParticleEmitter(0, this.radius))
    }

    this.resize()
    this.loop = this.loop.bind(this)
    window.addEventListener('resize', this.resize.bind(this))
    this.loop()
  }

  resize () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  render () {
    const { ctx, canvas } = this

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(canvas.width / 2, canvas.height / 2)

    this.emitters.forEach((emitter, index) => {
      ctx.save()
      ctx.rotate(index * Math.PI / 180)

      emitter.particles.forEach(particle => {
        particle.update()

        ctx.globalAlpha = particle.alpha
        ctx.beginPath()
        ctx.arc(
            particle.position.x,
            emitter.position.y - particle.position.y,
            props.size,
            0,
            Math.PI * 2
        )
        ctx.fillStyle = props.color
        ctx.fill()
      })

      ctx.restore()
    })

    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  loop (now = performance.now()) {
    this.raf = requestAnimationFrame(this.loop)

    const delta = now - this.then
    if (delta > this.fpsInterval) {
      this.render()
      this.then = now - (delta % this.fpsInterval)
    }
  }

  destroy () {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.resize)
  }
}

/* =======================
   Vue lifecycle
======================= */
const canvas = ref(null)
let experience = null

onMounted(() => {
  experience = new Experience(canvas.value)
})

onBeforeUnmount(() => {
  experience?.destroy()
})
</script>
