import { TLUiMenuGroup, TLUiOverrides, menuItem, toolbarItem, TLUiAssetUrlOverrides } from '@tldraw/tldraw'

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
        tools.speech = {
			id: 'speech-bubble',
			icon: 'speech-bubble',
			label: 'Speech Bubble',
			kbd: 's',
			readonlyOk: false,
			onSelect: () => {
				editor.setCurrentTool('speech-bubble')
			},
		}
        return tools
    },
    toolbar(_app, toolbar, { tools }) {
        // Add the tool item from the context to the toolbar.
        toolbar.splice(4, 0, toolbarItem(tools.card))
        toolbar.splice(4, 0, toolbarItem(tools.screenshot))
        toolbar.splice(4, 0, toolbarItem(tools.speech))
        return toolbar
    },
    keyboardShortcutsMenu(_app, keyboardShortcutsMenu, { tools }) {
        // Add the tool item from the context to the keyboard shortcuts dialog.
        const toolsGroup = keyboardShortcutsMenu.find(
            (group) => group.id === 'shortcuts-dialog.tools'
        ) as TLUiMenuGroup
        toolsGroup.children.push(menuItem(tools.card))
        toolsGroup.children.push(menuItem(tools.screenshot))
        toolsGroup.children.push(menuItem(tools.speech))
        return keyboardShortcutsMenu
    },
}

export const CustomAssetUrls: TLUiAssetUrlOverrides = {
    icons: {
        'tool-screenshot': './tldraw/tool-screenshot.svg',
        'speech-bubble': './tldraw/speech-bubble.svg',
    },
}