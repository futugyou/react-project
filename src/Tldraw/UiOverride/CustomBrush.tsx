import { TLBrushProps, toDomPrecision, useTransform } from "@tldraw/tldraw"
import { useRef } from "react"

export const CustomBrush = ({ brush }: TLBrushProps) => {
    const rSvg = useRef<SVGSVGElement>(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
    useTransform(rSvg, brush.x, brush.y)

    const w = toDomPrecision(Math.max(1, brush.w))
    const h = toDomPrecision(Math.max(1, brush.h))

    return (
        <svg ref={rSvg} className="tl-overlays__item" >
            <rect className="tl-brush" stroke="red" fill="none" width={w} height={h} />
        </svg>
    )
}
