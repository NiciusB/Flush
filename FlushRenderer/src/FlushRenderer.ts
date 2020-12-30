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
    this.postWorkerMessage(FlushWorkerMessageTypes.Canvas, { canvas: offCanvas }, [offCanvas])

    this._worker.addEventListener('message', (msg: any) => {
      this.onWorkerMessageReceived(msg)
    })
  }

  private onWorkerMessageReceived(msg) {
    console.log('Incoming message from worker', msg)
  }

  private postWorkerMessage(type: FlushWorkerMessageTypes, data, transfer = []) {
    this._worker.postMessage(
      {
        type,
        data,
      },
      transfer
    )
  }

  addRect(w: number, h: number, color: string) {
    this.postWorkerMessage(FlushWorkerMessageTypes.AddRect, {
      w,
      h,
      color,
    })
  }
}
