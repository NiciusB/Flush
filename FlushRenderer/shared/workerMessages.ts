export enum FlushWorkerMessageTypes {
  Canvas = 'Canvas',
  AddRect = 'AddRect',
}

export type FlushWorkerMessageCanvas = {
  canvas: OffscreenCanvas
}

export type FlushWorkerMessageAddRect = {
  w: number
  h: number
  color: string
}
