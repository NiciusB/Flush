import yoga from 'yoga-layout-prebuilt'
import generateInlineWorker from './generateInlineWorker'

export default function drawCanvasOffscreen(canvas: HTMLCanvasElement) {
  if (!('OffscreenCanvas' in window)) {
    throw new Error('Oh! Looks like your browser does not support OffscreenCanvas :(')
  }

  const worker = generateInlineWorker()

  var offCanvas = canvas.transferControlToOffscreen()
  worker.postMessage({ canvas: offCanvas }, [offCanvas])

  /*worker.addEventListener('message', (msg: any) => {
        console.log('incoming message from worker, msg:', msg);
        if (msg.data.terminateSelf) {
            worker.terminate()
        }
    })*/
}
