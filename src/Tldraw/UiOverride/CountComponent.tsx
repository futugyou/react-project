import {
    stopEventPropagation,
} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useState } from 'react'

const CountComponent = () => {
    const [state, setState] = useState(0)

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 50,
                    width: 'fit-content',
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: 'goldenrod',
                    zIndex: 0,
                    pointerEvents: 'all',
                    userSelect: 'unset',
                }}
                onPointerDown={stopEventPropagation}
                onPointerMove={stopEventPropagation}
            >
                The count is {state}! <button onClick={() => setState((s) => s - 1)}>-1</button>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 150,
                    left: 150,
                    width: 128,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: 'pink',
                    zIndex: 99999999,
                    pointerEvents: 'all',
                    userSelect: 'unset',
                }}
                onPointerDown={stopEventPropagation}
                onPointerMove={stopEventPropagation}
            >
                The count is {state}! <button onClick={() => setState((s) => s + 1)}>+1</button>
            </div>
        </>
    )
}

export default CountComponent
