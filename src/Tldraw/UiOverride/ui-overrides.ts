import {
	TLUiAssetUrlOverrides,
	TLUiOverrides,
} from '@tldraw/tldraw'

export const UIOverrides: TLUiOverrides = {
    tools(editor, tools) {
        // Create a tool item in the ui's context.
        tools.card = {
            id: 'card',
            icon: 'color',
            label: 'Card',
            kbd: 'c',
            readonlyOk: false,
            onSelect: () => {
                editor.setCurrentTool('card')
            },
        }
        tools.screenshot = {
            id: 'screenshot',
            label: 'Screenshot',
            readonlyOk: false,
            icon: 'tool-screenshot',
            kbd: 'j',
            onSelect() {
                editor.setCurrentTool('screenshot')
            },
        }
        tools.hearter = {
			id: 'hearter',
			icon: 'heart-icon',
			label: 'Hearter',
			kbd: 'h',
			onSelect: () => {
				editor.setCurrentTool('hearter')
			},
		}
        return tools
    },
}

export const CustomAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'tool-screenshot': '/tldraw/tool-screenshot.svg',
        'heart-icon': '/tldraw/heart-icon.svg',
    },
}