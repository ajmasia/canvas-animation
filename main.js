import './style.css'

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

const generateCircles = (amount, colors) => {
  const objects = []

  for (var i = 0; i < amount; i++) {
    const radius = Math.random() * 3 + 1
    const x = Math.random() * (innerWidth - radius * 2) + radius
    const y = Math.random() * (innerHeight - radius * 2) + radius
    const dx = (Math.random() - 0.5) 
    const dy = (Math.random() - 0.5) 

    objects.push(new Circle(x, y, dx, dy, radius, 40, colors))
  }

  return objects
}

const resetMousePosition = mousePosition => {
  mousePosition.x = undefined
  mousePosition.y = undefined
}

const init = () => {
  const mousePosition = {}
  const colors = [ '#ffaa33 ', '#99ffaa', '#00ff00', '#4411aa', '#ff1100' ]
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('mousemove', function(event) {
    mousePosition.x = event.x
    mousePosition.y = event.y
  })

  window.addEventListener('mouseout', () => {
    resetMousePosition(mousePosition)
  })

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  const circles = generateCircles(400, colors )

  animate(circles, mousePosition, ctx)
}


init()


// Drawing
// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
// ctx.fillRect(100, 100, 100, 100)
// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
// ctx.fillRect(400, 100, 100, 100)
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
// ctx.fillRect(300, 300, 100, 100)


// Drawing lines
// ctx.beginPath()
// ctx.moveTo(50,300)
// ctx.lineTo(300,100)
// ctx.lineTo(400,300)
// ctx.strokeStyle = "#fa34a3"
// ctx.stroke()

// Drawing circles
// for (var i = 0; i < 3000; i++) {
//   const x = Math.random() * window.innerWidth
//   const y = Math.random() * window.innerHeight

//   ctx.beginPath()
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false)
//   ctx.strokeStyle = 'blue'
//   ctx.stroke()
// }