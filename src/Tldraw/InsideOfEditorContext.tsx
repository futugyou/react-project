import { DefaultColorStyle, useEditor } from "@tldraw/tldraw"
import { useEffect } from "react"

export const InsideOfEditorContext = () => {
    const editor = useEditor()

    useEffect(() => {
        let i = 0

        const interval = setInterval(() => {
            const selection = [...editor.getSelectedShapeIds()]
            editor.selectAll()
            editor.setStyleForSelectedShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
            editor.setStyleForNextShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
            editor.setSelectedShapes(selection)
            i++
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [editor])

    return null
}
