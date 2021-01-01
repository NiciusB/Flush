import FlushRenderer from 'flush-renderer'

const canvas = document.getElementById('canvasA') as HTMLCanvasElement
const addRectButton = document.getElementById('addRect') as HTMLButtonElement

const flushRenderer = new FlushRenderer(canvas)

addRectButton.onclick = () => {
  flushRenderer.addRect(50 + Math.random() * 50, 50 + Math.random() * 50, getRandomColor(), Math.random() * 20)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
