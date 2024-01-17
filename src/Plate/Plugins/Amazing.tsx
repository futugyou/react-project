import {
    createPluginFactory, HotkeyPlugin,
    onKeyDownToggleElement, PlateRenderElementProps
} from "@udecode/plate-common"

export const KEY_AMAZING = 'amazing'

export const createAmazingPlugin = createPluginFactory<HotkeyPlugin>({
    key: KEY_AMAZING,
    isElement: true,
    handlers: {
        // Check for the hotkey on keydown
        onKeyDown: onKeyDownToggleElement,
    },
    options: {
        // Define the hotkeys here
        hotkey: ['mod+opt+0', 'mod+shift+0'],
    },
})

export const ParagraphElement = ({
    attributes,
    nodeProps,
    children,
}: PlateRenderElementProps) => {
    return (
        <p {...attributes} {...nodeProps}>
            <div>This is amazing plugin.</div>
            {/* The `children` prop must always be rendered */}
            {children}
        </p>
    );
};
