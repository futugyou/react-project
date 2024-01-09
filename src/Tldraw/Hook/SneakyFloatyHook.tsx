import { useContainer, useEditor, VecLike } from "@tldraw/tldraw"
import { useEffect } from "react"

export const SneakyFloatyHook = () => {
    const editor = useEditor()
    const container = useContainer()

    useEffect(() => {
        if (!window.screenLeft) {
            window.screenLeft = window.screenX
            window.screenTop = window.screenY
        }

        let x = window.screenLeft ?? window.screenX
        let y = window.screenTop ?? window.screenY

        function updatePositions() {
            const sx = window.screenLeft ?? window.screenX
            const sy = window.screenTop ?? window.screenY
            if (sx !== x || sy !== y) {
                x = sx
                y = sy

                const vec: VecLike = {
                    x: -x, y: -y
                }
                editor.setCamera(vec)
            }
        }

        editor.on('tick', updatePositions)

        return () => {
            editor.off('tick', updatePositions)
        }
    }, [editor, container])

    return null
}
