import yoga from 'yoga-layout-prebuilt'

export type LayoutItem = {
  node: yoga.YogaNode
  style: { backgroundColor: string }
  children: LayoutItem[]
}

export default function redrawCanvas(
  canvas: OffscreenCanvas,
  ctx: OffscreenCanvasRenderingContext2D,
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

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Fill gb with gradient
  var grd = ctx.createLinearGradient(0, 0, 0, canvas.height)
  grd.addColorStop(0.3, '#FFFFFF')
  grd.addColorStop(1, '#AAAAAA')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Render every rect
  renderRects.forEach((renderRect) => {
    ctx.fillStyle = renderRect.color
    ctx.fillRect(renderRect.left, renderRect.top, renderRect.width, renderRect.height)
  })
}
