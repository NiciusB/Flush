import yoga, { Node } from 'yoga-layout-prebuilt'
import {
  FlushWorkerMessageAddRect,
  FlushWorkerMessageCanvas,
  FlushWorkerMessageResizeCanvas,
  FlushWorkerMessageTypes,
} from '../shared/workerMessages'
import redrawCanvas, { LayoutItem } from './redrawCanvas'

let canvas: OffscreenCanvas = null
let ctxWorker: OffscreenCanvasRenderingContext2D = null
let layout: LayoutItem = null

export default function handleMessage(message: { type: FlushWorkerMessageTypes; data: Object }) {
  console.log(`Received \`${message.type}\` on worker`, message.data)

  switch (message.type) {
    case FlushWorkerMessageTypes.Canvas: {
      const data = message.data as FlushWorkerMessageCanvas

      canvas = data.canvas
      ctxWorker = canvas.getContext('2d')

      const root = Node.create()
      root.setWidth(canvas.width)
      root.setHeight(canvas.height)
      root.setJustifyContent(yoga.JUSTIFY_CENTER)
      root.setAlignItems(yoga.ALIGN_CENTER)
      root.setFlexWrap(yoga.WRAP_WRAP)

      layout = { node: root, style: { backgroundColor: '#f1f1f1' }, children: [] }

      redrawCanvas(canvas, ctxWorker, layout)
      break
    }
    case FlushWorkerMessageTypes.ResizeCanvas: {
      const data = message.data as FlushWorkerMessageResizeCanvas

      canvas.width = data.width
      canvas.height = data.height

      redrawCanvas(canvas, ctxWorker, layout)
      break
    }
    case FlushWorkerMessageTypes.AddRect: {
      const data = message.data as FlushWorkerMessageAddRect

      const newNode = Node.create()
      newNode.setWidth(data.w)
      newNode.setHeight(data.h)
      newNode.setMargin(yoga.EDGE_ALL, 5)

      layout.node.insertChild(newNode, layout.node.getChildCount())
      layout.children.push({ node: newNode, style: { backgroundColor: data.color }, children: [] })

      redrawCanvas(canvas, ctxWorker, layout)
      break
    }
    default: {
      throw new Error('Unknown event')
    }
  }
}
