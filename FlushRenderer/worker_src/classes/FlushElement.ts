import yoga, { Node } from 'yoga-layout-prebuilt'
import { FlushStyle } from '../../shared/FlushStyle'

export default class FlushElement {
  public id: string
  protected yogaNode: yoga.YogaNode
  private _style: FlushStyle
  protected children: FlushElement[] = []
  protected parent?: FlushElement

  constructor() {
    this.yogaNode = Node.create()
  }

  get style(): FlushStyle {
    return this._style
  }

  set style(newValue: FlushStyle) {
    this._style = new Proxy(newValue, {
      set: (obj, prop, value) => {
        obj[prop] = value
        this.updateYogaStyles()
        return true
      },
    })
    this.updateYogaStyles()
  }

  protected updateYogaStyles() {
    for (const key in this.style) {
      const value = this.style[key]
      switch (key) {
        case 'backgroundColor': {
          // Not for layout. ignore
          break
        }
        case 'width':
        case 'height':
        case 'justifyContent':
        case 'alignItems':
        case 'flexWrap': {
          // Simple, 1 argument setter functions
          const fnName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`
          this.yogaNode[fnName](value)
          break
        }
        case 'margin': {
          this.yogaNode.setMargin(yoga.EDGE_ALL, value)
          break
        }
        default: {
          console.error(`Unknown FlushStyle prop: ${key}`)
        }
      }
    }
  }

  appendTo(elm: FlushElement) {
    elm.append(this)
  }

  append(elm: FlushElement) {
    if (elm.parent) {
      throw new Error('Tried to append, but already children of a FlushElement')
    }

    elm.parent = this
    this.children.push(elm)

    this.yogaNode.insertChild(elm.yogaNode, this.yogaNode.getChildCount())
  }

  getChildren() {
    return this.children
  }

  getParent(): FlushElement | null {
    return this.parent
  }

  calculateLayout(width?: number, height?: number, direction?: yoga.YogaDirection) {
    this.yogaNode.calculateLayout(width, height, direction)
  }

  getComputedLayout() {
    return this.yogaNode.getComputedLayout()
  }
}
