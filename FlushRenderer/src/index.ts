import yoga, { Node } from 'yoga-layout-prebuilt'
import drawCanvasOffscreen from './drawCanvasOffscreen'

function render(canvas: HTMLCanvasElement) {
  drawCanvasOffscreen(canvas)
}

export default {
  render,
}
export { yoga, Node }
