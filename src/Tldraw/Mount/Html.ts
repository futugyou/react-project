import { Editor, TLExternalContentSource, VecLike } from "@tldraw/tldraw"

export const Html = (editor: Editor, point?: VecLike, sources?: TLExternalContentSource[]) => {
    const htmlSource = sources?.find((s) => s.type === 'text' && s.subtype === 'html')

    if (htmlSource) {
        const center = point ?? editor.getViewportScreenCenter()

        editor.createShape({
            type: 'html',
            x: center.x - 250,
            y: center.y - 150,
            props: {
                html: htmlSource.data,
            },
        })
    }
}