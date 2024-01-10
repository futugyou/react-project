import { TLShape, track, useEditor } from "@tldraw/tldraw";

type ShapeWithMyMeta = TLShape & { meta: { updatedBy: string; updatedAt: string } }

export const MetaUi = track(() => {
    const editor = useEditor()
    const onlySelectedShape = editor.getOnlySelectedShape() as ShapeWithMyMeta | null

    return (
        <pre style={{ position: 'absolute', zIndex: 300, top: 64, left: 12, margin: 0, textAlign: 'left' }}>
            {onlySelectedShape
                ? JSON.stringify(onlySelectedShape.meta, null, 2)
                : 'Select one shape to see its meta data.'}
        </pre>
    )
})