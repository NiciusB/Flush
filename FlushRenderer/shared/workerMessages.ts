export enum FlushWorkerMessageTypes {
  Canvas = 'Canvas',
  ResizeCanvas = 'ResizeCanvas',
  AddRect = 'AddRect',
}

export type FlushWorkerMessageCanvas = {
  canvas: OffscreenCanvas
}

export type FlushWorkerMessageResizeCanvas = {
  width: number
  height: number
}

export type FlushWorkerMessageAddRect = {
  w: number
  h: number
  color: string
}
