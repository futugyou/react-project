import { DefaultKeyboardShortcutsDialog, DefaultKeyboardShortcutsDialogContent, DefaultToolbar, DefaultToolbarContent, TLComponents, Tldraw, TldrawUiMenuItem, TLEditorComponents, toDomPrecision, useIsToolSelected, useTools, useTransform } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useRef } from 'react'
import CountComponent from './CountComponent'
import ScreenshotBox from './ScreenshotBox'

export const components: TLComponents = {
	Brush: ({ brush }) => {
		const rSvg = useRef<SVGSVGElement>(null)

		useTransform(rSvg, brush.x, brush.y)

		const w = toDomPrecision(Math.max(1, brush.w))
		const h = toDomPrecision(Math.max(1, brush.h))

		return (
			<svg ref={rSvg} className="tl-overlays__item">
				<rect className="tl-brush" stroke="red" fill="none" width={w} height={h} />
			</svg>
		)
	},
	Scribble: ({ scribble, opacity, color }) => {
		return (
			<svg className="tl-overlays__item">
				<polyline
					points={scribble.points.map((p) => `${p.x},${p.y}`).join(' ')}
					stroke={color ?? 'blue'}
					opacity={opacity ?? '1'}
					fill="none"
				/>
			</svg>
		)
	},
	InFrontOfTheCanvas: ScreenshotBox,
	OnTheCanvas: CountComponent,
	Toolbar: (props) => {
		const tools = useTools()
		const isHearterSelected = useIsToolSelected(tools['hearter'])
		const isCardSelected = useIsToolSelected(tools['card'])
		const isScreenshotSelected = useIsToolSelected(tools['screenshot'])
		return (
			<DefaultToolbar {...props}>
				<DefaultToolbarContent />
				<TldrawUiMenuItem {...tools['hearter']} isSelected={isHearterSelected} />
				<TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
				<TldrawUiMenuItem {...tools['screenshot']} isSelected={isScreenshotSelected} />
			</DefaultToolbar>
		)
	},
	KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<DefaultKeyboardShortcutsDialogContent />
				<TldrawUiMenuItem {...tools['hearter']} />
				<TldrawUiMenuItem {...tools['card']} />
				<TldrawUiMenuItem {...tools['screenshot']} />
			</DefaultKeyboardShortcutsDialog>
		)
	},
}
