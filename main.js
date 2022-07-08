import './style.css'
import { 
  COLORS,
  MAX_RADIUS,
  OBJECTS_AMOUNT
} from './constants'

class Circle {
  constructor(x, y, dx, dy, radius, maxRadius, colors ) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.maxRadius = maxRadius 
    this.colors = colors 
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]

    this.draw = function(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    this.update = function(mousePosition, ctx) {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy
      }

      this.x += this.dx
      this.y += this.dy

      // Interaction
      if (
        mousePosition.x - this.x < 50 
          && mousePosition.x - this.x > -50 
          && mousePosition.y - this.y < 50 
          && mousePosition.y - this.y > -50
      ) {
          if (this.radius < this.maxRadius) {
              this.radius += 1
          }
      } else if (this.radius > this.minRadius) {
          this.radius -= 1
      }

      this.draw(ctx)
    }
  }
}

const animate = (objects, mousePosition, ctx) => {
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (var i = 0; i < objects.length; i++) {
    objects[i].update(mousePosition, ctx)
  }

  requestAnimationFrame(() => animate(objects, mousePosition, ctx))
}

const generateCircles = (amount, colors, maxRadius) => {
  const objects = []

  for (var i = 0; i < amount; i++) {
    const radius = Math.random() * 3 + 1
    const x = Math.random() * (innerWidth - radius * 2) + radius
    const y = Math.random() * (innerHeight - radius * 2) + radius
    const dx = (Math.random() - 0.5) 
    const dy = (Math.random() - 0.5) 

    objects.push(new Circle(x, y, dx, dy, radius, maxRadius, colors))
  }

  return objects
}

const resetMousePosition = mousePosition => {
  mousePosition.x = undefined
  mousePosition.y = undefined
}

const init = () => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const circles = generateCircles(OBJECTS_AMOUNT, COLORS, MAX_RADIUS)
  const mousePosition = {}

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  window.addEventListener('mousemove', function(event) {
    mousePosition.x = event.x
    mousePosition.y = event.y
  })

  window.addEventListener('mouseout', () => {
    resetMousePosition(mousePosition)
  })


  animate(circles, mousePosition, ctx)
}

init()
