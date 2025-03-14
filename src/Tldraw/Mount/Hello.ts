import { createShapeId, Editor, TLGeoShape, TLShapePartial, toRichText } from "@tldraw/tldraw"

export const Hello = (editor: Editor) => {
    const id = createShapeId('hello')
    const shape = editor.getShape<TLGeoShape>(id)
    if (!shape) {
        editor.createShapes<TLGeoShape>([
            {
                id,
                type: 'geo',
                x: 128 + Math.random() * 500,
                y: 128 + Math.random() * 500,
                props: {
                    geo: 'rectangle' as any,
                    w: 100,
                    h: 100,
                    dash: 'draw' as any,
                    color: 'blue' as any,
                    size: 'm' as any,
                },
            },
        ])
        const shape = editor.getShape<TLGeoShape>(id)!
        const shapeUpdate: TLShapePartial<TLGeoShape> = {
            id,
            type: 'geo',
            props: {
                h: shape.props.h * 3,
                richText: toRichText('hello world!'),
            },
        }

        editor.updateShapes([shapeUpdate])
        editor.select(id)
        editor.rotateShapesBy([id], Math.PI / 8)
        editor.selectNone()
        editor.zoomToFit()
    }
}