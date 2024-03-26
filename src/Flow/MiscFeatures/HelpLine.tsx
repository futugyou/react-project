import { useState, forwardRef, useImperativeHandle } from 'react'

import { useStoreApi, useReactFlow, Node } from 'reactflow'

import { rendererPointToPoint } from '@/Flow/utils'

interface HelpLineProps {
}

export interface HelpLineHandler {
    execHelpLinePosition(node: Node): void
    clearHelpLinePosition(): void
}

const HelpLine = forwardRef<HelpLineHandler, HelpLineProps>((props, ref) => {
    const store = useStoreApi()
    const { getNodes } = useReactFlow()
    const { transform } = store.getState()

    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useImperativeHandle(ref, () => ({
        execHelpLinePosition(node: Node) {
            const nodes = getNodes()
            const xs = nodes.filter(p => p.id !== node.id)
                .map(p => [p.positionAbsolute?.x!, p.positionAbsolute?.x! + (p.width ?? 0), p.positionAbsolute?.x! + (p.width ?? 0) / 2])
                .flatMap(p => p)
                .map(p => p - node.positionAbsolute?.x!)
                .sort((a, b) => a - b)
                .filter(p => p < 3 && p > -3)
            if (xs.length > 0) {
                const p = rendererPointToPoint({ x: xs[0] + node.positionAbsolute?.x!, y: 0 }, transform)
                setLeft(p.x)
                setWidth(2)
            } else {
                setLeft(-1)
                setWidth(0)
            }

            const ys = nodes.filter(p => p.id !== node.id)
                .map(p => [p.positionAbsolute?.y!, p.positionAbsolute?.y! + (p.height ?? 0), p.positionAbsolute?.y! + (p.height ?? 0) / 2])
                .flatMap(p => p)
                .map(p => p - node.positionAbsolute?.y!)
                .sort((a, b) => a - b)
                .filter(p => p < 3 && p > -3)
            if (ys.length > 0) {
                const p = rendererPointToPoint({ y: ys[0] + node.positionAbsolute?.y!, x: 0 }, transform)
                setTop(p.y)
                setHeight(2)
            } else {
                setTop(-1)
                setHeight(0)
            }
        },

        clearHelpLinePosition() {
            setTop(-1)
            setLeft(-1)
            setWidth(0)
        }
    }))

    return <>
        <div style={{ position: 'absolute', zIndex: 1000, top: 0, bottom: 0, width: width, backgroundColor: 'blue', left: left }} ></div>
        <div style={{ position: 'absolute', zIndex: 1000, left: 0, right: 0, height: height, backgroundColor: 'blue', top: top }} ></div>
    </>
}
)
export default HelpLine