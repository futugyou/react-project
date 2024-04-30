import { DefaultToolbar, DefaultToolbarContent, TldrawUiMenuItem, useIsToolSelected, useTools } from "@tldraw/tldraw"

export const CustomToolbar = (props: {}) => {
	const tools = useTools()
	
	const isHearterSelected = useIsToolSelected(tools['hearter'])
	const isCardSelected = useIsToolSelected(tools['card'])
	const isScreenshotSelected = useIsToolSelected(tools['screenshot'])
	const isEhombus2Selected = useIsToolSelected(tools['rhombus-2'])
	const iseditableSelected = useIsToolSelected(tools['editable-shape'])
	const isPlayingCardSelected = useIsToolSelected(tools['PlayingCard'])

	return (
		<DefaultToolbar {...props}>
			<DefaultToolbarContent />
			<TldrawUiMenuItem {...tools['rhombus-2']} isSelected={isEhombus2Selected} />
			<TldrawUiMenuItem {...tools['hearter']} isSelected={isHearterSelected} />
			<TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
			<TldrawUiMenuItem {...tools['screenshot']} isSelected={isScreenshotSelected} />
			<TldrawUiMenuItem {...tools['editable-shape']} isSelected={iseditableSelected} />
			<TldrawUiMenuItem {...tools['PlayingCard']} isSelected={isPlayingCardSelected} />
		</DefaultToolbar>
	)
}
