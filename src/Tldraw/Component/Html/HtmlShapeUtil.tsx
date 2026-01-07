import {
    HTMLContainer,
    BaseBoxShapeUtil,
    TLBaseShape,
    TLShape,
} from '@tldraw/tldraw'

const DANGEROUS_HTML_TYPE = 'html'

declare module 'tldraw' {
	export interface TLGlobalShapePropsMap {
		[DANGEROUS_HTML_TYPE]: { w: number; h: number; html: string }
	}
}

// There's a guide at the bottom of this page!

// [1]
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
}
