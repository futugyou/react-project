import { DefaultToolbar, DefaultToolbarContent, TldrawUiMenuItem, useIsToolSelected, useTools  } from "@tldraw/tldraw" 

export const CustomToolbar = (props:{}) => {
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
}
