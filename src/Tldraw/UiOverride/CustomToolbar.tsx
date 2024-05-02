import { DefaultToolbar, DefaultToolbarContent, TldrawUiMenuItem, useIsToolSelected, useTools } from "@tldraw/tldraw"

export const CustomToolbar = ({ children }: any) => {
	const tools = useTools()
	const isEhombus2Selected = useIsToolSelected(tools['rhombus-2'])

	return (
		<DefaultToolbar >
			<DefaultToolbarContent />
			<TldrawUiMenuItem {...tools['rhombus-2']} isSelected={isEhombus2Selected} />
			{children}
		</DefaultToolbar>
	)
}
