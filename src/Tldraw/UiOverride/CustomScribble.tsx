import { TLScribbleProps } from "@tldraw/tldraw"

export const CustomScribble = ({ scribble, opacity, color }: TLScribbleProps) => {
    return (
        <svg className="tl-overlays__item" >
            <polyline
                points={scribble.points.map((p) => `${p.x},${p.y}`).join(' ')}
                stroke={color ?? 'blue'
                }
                opacity={opacity ?? '1'}
                fill="none"
            />
        </svg>
    )
}