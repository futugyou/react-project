import {
    HTMLContainer,
    BaseBoxShapeUtil,
    TLBaseShape,
} from '@tldraw/tldraw'

export type IDangerousHtmlShape = TLBaseShape<
    'html',
    {
        w: number
        h: number
        html: string
    }
>

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
}
