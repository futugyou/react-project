import { track, useEditor } from '@tldraw/tldraw'
import { MyFilterStyle } from './CardShape/card-shape-types'

export const FilterStyleUi = track(function FilterStyleUi() {
    const editor = useEditor()
    const filterStyle = editor.getSharedStyles().get(MyFilterStyle)
    if (!filterStyle) return null

    return (
        <div
            className="tlui-style-panel__wrapper"
            style={{
                position: 'absolute',
                zIndex: 300,
                top: 50,
                left: 8,
                padding: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            filter:{' '}
            <select
                value={filterStyle.type === 'mixed' ? 'mixed' : filterStyle.value as any}
                // [3]
                onChange={(e) => {
                    editor.batch(() => {
                        if (editor.isIn('select')) {
                            editor.setStyleForSelectedShapes(MyFilterStyle, e.target.value)
                        }
                        editor.setStyleForNextShapes(MyFilterStyle, e.target.value)
                    })
                }}
            >
                <option value="mixed" disabled>
                    Mixed
                </option>
                <option value="none">None</option>
                <option value="invert">Invert</option>
                <option value="grayscale">Grayscale</option>
                <option value="blur">Blur</option>
            </select>
        </div>
    )
})
