import {
  HTMLContainer,
  BaseBoxShapeUtil,
  TLBaseShape,
  TLShape,
  TLIndicatorPath,
} from '@tldraw/tldraw'

const DANGEROUS_HTML_TYPE = 'html'

declare module 'tldraw' {
  export interface TLGlobalShapePropsMap {
    [DANGEROUS_HTML_TYPE]: { w: number; h: number; html: string }
  }
}

export type IDangerousHtmlShape = TLShape<typeof DANGEROUS_HTML_TYPE>

export class HtmlShapeUtil extends BaseBoxShapeUtil<IDangerousHtmlShape> {
  static override type = 'html' as const

  override getDefaultProps() {
    return {
      type: 'html',
      w: 500,
      h: 300,
      html: '<div>hello</div>',
    }
  }

  override component(shape: IDangerousHtmlShape) {
    return (
      <HTMLContainer style={{ overflow: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: shape.props.html }}></div>
      </HTMLContainer>
    )
  }

  override indicator(shape: IDangerousHtmlShape) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }

  getIndicatorPath(shape: IDangerousHtmlShape) {
    const path = new Path2D()
    path.rect(0, 0, shape.props.w, shape.props.h)
    return path
  }
}
