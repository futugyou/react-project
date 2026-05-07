import { useState } from 'react'
import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLDefaultColorStyle,
  TLResizeInfo,
  TLShape,
  getColorValue,
  resizeBox,
} from 'tldraw'
import { cardShapeMigrations } from './card-shape-migrations'
import { cardShapeProps } from './card-shape-props'

const CARD_TYPE = 'card'

declare module 'tldraw' {
  export interface TLGlobalShapePropsMap {
    [CARD_TYPE]: { w: number; h: number; color: TLDefaultColorStyle }
  }
}

export type ICardShape = TLShape<typeof CARD_TYPE>

export class CardShapeUtil extends ShapeUtil<ICardShape> {
  static override type = CARD_TYPE
  static override props = cardShapeProps
  static override migrations = cardShapeMigrations

  override isAspectRatioLocked(shape: ICardShape) {
    return false
  }
  override canResize(shape: ICardShape) {
    return true
  }

  getDefaultProps(): ICardShape['props'] {
    return {
      w: 300,
      h: 300,
      color: 'black',
    }
  }

  getGeometry(shape: ICardShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape: ICardShape) {
    const { editor } = this
    const bounds = editor.getShapeGeometry(shape).bounds
    const theme = editor.getCurrentTheme()
    const colors = theme.colors[editor.getColorMode()]
    const { color } = shape.props

    const [count, setCount] = useState(0)

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
          backgroundColor: getColorValue(colors, color, 'semi'),
          color: getColorValue(colors, color, 'solid'),
        }}
      >
        <h2>Clicks: {count}</h2>
        <button
          onClick={() => setCount((count) => count + 1)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {bounds.w.toFixed()}x{bounds.h.toFixed()}
        </button>
      </HTMLContainer>
    )
  }

  getIndicatorPath(shape: ICardShape) {
    const path = new Path2D()
    path.rect(0, 0, shape.props.w, shape.props.h)
    return path
  }

  override onResize(shape: ICardShape, info: TLResizeInfo<ICardShape>) {
    return resizeBox(shape, info)
  }
}
