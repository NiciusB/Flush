import yoga from 'yoga-layout-prebuilt'

export type LayoutItem = {
  node: yoga.YogaNode
  style: { backgroundColor: string }
  children: LayoutItem[]
}

export default function redrawCanvas(
  canvas: OffscreenCanvas,
  ctxWorker: OffscreenCanvasRenderingContext2D,
  layout: LayoutItem
) {
  layout.node.calculateLayout(canvas.width, canvas.height, yoga.DIRECTION_LTR)

  const renderRects = []
  const queue = [layout]

  do {
    const { node, style, children } = queue.shift()
    children.forEach((child) => {
      queue.push(child)
    })

    renderRects.push({
      ...node.getComputedLayout(),
      color: style.backgroundColor,
    })
  } while (queue.length)

  ctxWorker.clearRect(0, 0, canvas.width, canvas.height)

  renderRects.forEach((renderRect) => {
    ctxWorker.fillStyle = renderRect.color
    ctxWorker.fillRect(renderRect.left, renderRect.top, renderRect.width, renderRect.height)
  })
}
