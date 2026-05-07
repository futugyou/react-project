import { BaseBoxShapeUtil, HTMLContainer, TLBaseShape, TLIndicatorPath } from '@tldraw/tldraw'

export type MiniBoxShape = TLBaseShape<'box', { w: number; h: number; color: string }>

export class MiniBoxShapeUtil extends BaseBoxShapeUtil<MiniBoxShape> {
  static override type = 'box'

  override getDefaultProps(): MiniBoxShape['props'] {
    return { w: 100, h: 100, color: '#efefef' }
  }

  component(shape: MiniBoxShape) {
    return (
      <HTMLContainer>
        <div
          style={{
            width: shape.props.w,
            height: shape.props.h,
            border: '1px solid black',
            backgroundColor: shape.props.color,
            pointerEvents: 'all',
          }}
        />
      </HTMLContainer>
    )
  }

  getIndicatorPath(shape: MiniBoxShape) {
    const path = new Path2D()
    path.rect(0, 0, shape.props.w, shape.props.h)
    return path
  }
}
