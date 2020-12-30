import generateInlineWorker from './generateInlineWorker'
import { FlushWorkerMessageTypes } from '../shared/workerMessages'

export default class FlushRenderer {
  private _worker: Worker

  constructor(canvas: HTMLCanvasElement) {
    if (!('OffscreenCanvas' in window)) {
      throw new Error('Oh! Looks like your browser does not support OffscreenCanvas :(')
    }

    this._worker = generateInlineWorker()

    var offCanvas = canvas.transferControlToOffscreen()
    this._worker.postMessage({ type: FlushWorkerMessageTypes.Canvas, data: { canvas: offCanvas } }, [offCanvas])

    this._worker.addEventListener('message', (msg: any) => {
      console.log('incoming message from worker, msg:', msg)
    })
  }

  addRect(w: number, h: number, color: string) {
    this._worker.postMessage({
      type: FlushWorkerMessageTypes.AddRect,
      data: { w, h, color },
    })
  }
}
