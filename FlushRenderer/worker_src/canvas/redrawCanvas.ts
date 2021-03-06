import FlushElement from '../classes/FlushElement'
import drawRect from './drawRect'

export default function redrawCanvas(
  canvas: OffscreenCanvas,
  ctx: OffscreenCanvasRenderingContext2D,
  rootElm: FlushElement
) {
  const renderRects = []
  const queue = [rootElm]

  do {
    const currElm = queue.shift()
    currElm.getChildren().forEach((child) => {
      queue.push(child)
    })

    renderRects.push({
      ...currElm.getComputedLayout(),
      color: currElm.style.backgroundColor,
      borderRadius: currElm.style.borderRadius ?? 0,
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

    const radius = renderRect.borderRadius
    drawRect(ctx, renderRect.left, renderRect.top, renderRect.width, renderRect.height, radius)
  })
}
