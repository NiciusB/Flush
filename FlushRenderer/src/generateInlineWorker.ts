import { readFileSync } from 'fs'

const JSCode = readFileSync(__dirname + '/../worker_dist/worker.txt', 'utf8')

export default function generateInlineWorker(): Worker {
  const blob = new Blob([JSCode], { type: 'text/javascript' })

  const worker = new Worker(window.URL.createObjectURL(blob))

  return worker
}
