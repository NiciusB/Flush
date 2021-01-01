import redrawCanvas from './canvas/redrawCanvas'
import FlushElement from './classes/FlushElement'

export default function drawLoop(
  canvas: OffscreenCanvas,
  ctx: OffscreenCanvasRenderingContext2D,
  rootElm: FlushElement
) {
  try {
    redrawCanvas(canvas, ctx, rootElm)
  } finally {
    requestAnimationFrame(() => drawLoop(canvas, ctx, rootElm))
  }
}
