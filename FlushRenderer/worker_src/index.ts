import handleMessage from './handleMessage'

self.onmessage = function ({ data: message }) {
  handleMessage(message)
}
