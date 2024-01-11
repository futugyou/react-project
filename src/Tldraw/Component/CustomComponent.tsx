import { Tldraw, TLEditorComponents } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import CountComponent from './CountComponent'
import ScreenshotBox from './ScreenshotBox'

export const components: TLEditorComponents = {
	Brush: ({ brush }) => {
		return (
			<svg className="tl-overlays__item">
				<rect
					className="tl-brush"
					stroke="red"
					fill="none"
					width={Math.max(1, brush.w)}
					height={Math.max(1, brush.h)}
					transform={`translate(${brush.x},${brush.y})`}
				/>
			</svg>
		)
	},
	Scribble: ({ scribble, opacity, color }) => {
		return (
			<svg className="tl-overlays__item">
				<polyline
					points={scribble.points.map((p) => `${p.x},${p.y}`).join(' ')}
					stroke={color ?? 'black'}
					opacity={opacity ?? '1'}
					fill="none"
				/>
			</svg>
		)
	},
	SnapLine: null,
	InFrontOfTheCanvas: ScreenshotBox,
	OnTheCanvas: CountComponent,
}
