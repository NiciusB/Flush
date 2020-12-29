import FlushRenderer, { yoga, Node } from 'flush-renderer'

const canvas = document.getElementById('canvasA') as HTMLCanvasElement

// Resize to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false)
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()

FlushRenderer.render(canvas)
