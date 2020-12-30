import FlushRenderer from 'flush-renderer'

const canvas = document.getElementById('canvasA') as HTMLCanvasElement
const addRectButton = document.getElementById('addRect') as HTMLButtonElement

// Resize to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false)
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()

const flushRenderer = new FlushRenderer(canvas)

addRectButton.onclick = () => {
  flushRenderer.addRect(50 + Math.random() * 50, 50 + Math.random() * 50, getRandomColor())
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
