/* eslint-disable import/no-extraneous-dependencies */

import { Editor, PositionedOnCanvas, TldrawEditor, createShapeId, track } from '@tldraw/editor'
import { MiniBoxShapeUtil } from './Shape/MiniBox/MiniBoxShape'
import { MiniSelectTool } from './Tools/MiniSelectTool'

const myTools = [MiniSelectTool]
const myShapeUtils = [MiniBoxShapeUtil]

const MiniApp = () => {
    return (
        <div className="tldraw__editor">
            <TldrawEditor
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
            />
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

export default MiniApp
