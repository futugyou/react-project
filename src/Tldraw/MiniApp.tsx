/* eslint-disable import/no-extraneous-dependencies */

import { Editor, PositionedOnCanvas, TldrawEditor, createShapeId, track } from '@tldraw/editor'
import { MiniBoxShapeUtil } from './Shape/MiniBox/MiniBoxShape'
import { MiniSelectTool } from './Tools/MiniSelectTool'

import { useYjsStore } from './Store/useYjsStore'
import { Tldraw, useEditor } from '@tldraw/tldraw'

const myTools = [MiniSelectTool]
const myShapeUtils = [MiniBoxShapeUtil]

const MiniApp = () => {
    const store = useYjsStore({
        roomId: 'yjs-demo',
    })

    return (
        <div className="tldraw__editor">
            <TldrawEditor
                autoFocus store={store}
                tools={myTools}
                shapeUtils={myShapeUtils}
                initialState="select"
                onMount={(editor: Editor) => {
                    editor
                        .selectAll()
                        .deleteShapes(editor.getSelectedShapeIds())
                        .createShapes([
                            {
                                id: createShapeId(),
                                type: 'box',
                                x: 100,
                                y: 100,
                            },
                        ])
                }}
                components={{
                    Background: BackgroundComponent,
                }}
            >
                <NameEditor />
            </TldrawEditor>
        </div>
    )
}

/**
 * This one will move with the camera, just like shapes do.
 */
const BackgroundComponent = track(() => {
    return (
        <PositionedOnCanvas x={16} y={16}>
            <p>Double click to create shapes.</p>
            <p>Click or Shift+Click to select shapes.</p>
            <p>Click and drag to move shapes.</p>
        </PositionedOnCanvas>
    )
})


const NameEditor = track(() => {
    const editor = useEditor()

    const { color, name } = editor.user.getUserPreferences()

    return (
        <div style={{ pointerEvents: 'all', display: 'flex' }}>
            <input
                type="color"
                value={color}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        color: e.currentTarget.value,
                    })
                }}
            />
            <input
                value={name}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        name: e.currentTarget.value,
                    })
                }}
            />
        </div>
    )
})

export default MiniApp
