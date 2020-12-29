import yoga, { Node } from 'yoga-layout-prebuilt'

let canvas = null
let ctxWorker: CanvasRenderingContext2D = null

// Waiting to receive the OffScreenCanvas
self.onmessage = function (e) {
  console.log('received data on worker', e.data)

  canvas = e.data.canvas
  ctxWorker = canvas.getContext('2d')

  const root = generateLayout()
  root.calculateLayout(canvas.clientWidth, canvas.clientHeight, yoga.DIRECTION_LTR)

  const renderRects = []
  const queue = [root]

  do {
    const item = queue.shift()
    for (let k = 0; k < item.getChildCount(); k++) {
      queue.push(item.getChild(k))
    }

    renderRects.push({
      ...item.getComputedLayout(),
      color: getRandomColor(),
    })
  } while (queue.length)

  redrawCanvasB(renderRects)
}

// Redraw Canvas A text
function redrawCanvasB(renderRects) {
  ctxWorker.clearRect(0, 0, canvas.width, canvas.height)

  renderRects.forEach((renderRect) => {
    ctxWorker.fillStyle = renderRect.color
    ctxWorker.fillRect(renderRect.left, renderRect.top, renderRect.width, renderRect.height)
  })
}

function generateLayout() {
  // Create layout
  const root = Node.create()
  root.setWidth(500)
  root.setHeight(300)
  root.setJustifyContent(yoga.JUSTIFY_CENTER)
  root.setAlignItems(yoga.ALIGN_CENTER)

  const node1 = Node.create()
  node1.setWidth(50)
  node1.setHeight(50)

  const node2 = Node.create()
  node2.setWidth(100)
  node2.setHeight(100)

  root.insertChild(node1, 0)
  root.insertChild(node2, 1)

  return root
}
function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
