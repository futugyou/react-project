import { DefaultKeyboardShortcutsDialog, DefaultKeyboardShortcutsDialogContent, TldrawUiMenuItem, TLUiKeyboardShortcutsDialogProps, useTools } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomKeyboardShortcutsDialog = (props: TLUiKeyboardShortcutsDialogProps) => {
    const tools = useTools()

    return (
        <DefaultKeyboardShortcutsDialog {...props}>
            <DefaultKeyboardShortcutsDialogContent />
            <TldrawUiMenuItem {...tools['hearter']} />
            <TldrawUiMenuItem {...tools['card']} />
            <TldrawUiMenuItem {...tools['screenshot']} />
            <MySiteMenuItem />
        </DefaultKeyboardShortcutsDialog>
    )
}
