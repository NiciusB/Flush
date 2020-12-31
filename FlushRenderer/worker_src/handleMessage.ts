import yoga, { Node } from 'yoga-layout-prebuilt'
import {
  FlushWorkerMessageAddRect,
  FlushWorkerMessageCanvas,
  FlushWorkerMessageResizeCanvas,
  FlushWorkerMessageTypes,
} from '../shared/workerMessages'
import FlushElement from './classes/FlushElement'
import redrawCanvas from './redrawCanvas'

let canvas: OffscreenCanvas = null
let ctxWorker: OffscreenCanvasRenderingContext2D = null
let rootElm: FlushElement = null

export default function handleMessage(message: { type: FlushWorkerMessageTypes; data: Object }) {
  console.log(`Received \`${message.type}\` on worker`, message.data)

  switch (message.type) {
    case FlushWorkerMessageTypes.Canvas: {
      const data = message.data as FlushWorkerMessageCanvas

      canvas = data.canvas
      ctxWorker = canvas.getContext('2d')

      rootElm = new FlushElement()
      rootElm.style = {
        width: canvas.width,
        height: canvas.height,
        backgroundColor: '#4a4',
        justifyContent: yoga.JUSTIFY_CENTER,
        alignItems: yoga.ALIGN_CENTER,
        flexWrap: yoga.WRAP_WRAP,
      }

      redrawCanvas(canvas, ctxWorker, rootElm)
      break
    }
    case FlushWorkerMessageTypes.ResizeCanvas: {
      const data = message.data as FlushWorkerMessageResizeCanvas

      canvas.width = data.width
      canvas.height = data.height

      rootElm.style.width = canvas.width
      rootElm.style.height = canvas.height

      redrawCanvas(canvas, ctxWorker, rootElm)
      break
    }
    case FlushWorkerMessageTypes.AddRect: {
      const data = message.data as FlushWorkerMessageAddRect

      const newElm = new FlushElement()
      newElm.style = {
        width: data.w,
        height: data.h,
        margin: 5,
        backgroundColor: data.color,
      }

      rootElm.append(newElm)

      redrawCanvas(canvas, ctxWorker, rootElm)
      break
    }
    default: {
      throw new Error('Unknown event')
    }
  }
}
