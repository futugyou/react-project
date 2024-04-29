
import { useRef } from 'react'
import { TLComponents, toDomPrecision, useTransform } from '@tldraw/tldraw'

import { CustomActionsMenu } from './CustomActionsMenu'
import { CustomContextMenu } from './CustomContextMenu'
import { CustomHelpMenu } from './CustomHelpMenu'
import { CustomKeyboardShortcutsDialog } from './CustomKeyboardShortcutsDialog'
import { CustomMainMenu } from './CustomMainMenu'
import { CustomQuickActions } from './CustomQuickActions'
import { CustomToolbar } from './CustomToolbar'
import { CustomZoomMenu } from './CustomZoomMenu'

import CountComponent from './CountComponent'
import ScreenshotBox from './ScreenshotBox'

export const CustomeComponents: TLComponents = {
	ActionsMenu: CustomActionsMenu,
	ContextMenu: CustomContextMenu,
	HelpMenu: CustomHelpMenu,
	KeyboardShortcutsDialog: CustomKeyboardShortcutsDialog,
	MainMenu: CustomMainMenu,
	QuickActions: CustomQuickActions,
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
	Toolbar: CustomToolbar,
	ZoomMenu: CustomZoomMenu,
}
