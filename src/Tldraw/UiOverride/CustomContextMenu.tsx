import { DefaultContextMenu, DefaultContextMenuContent, TLUiContextMenuProps } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomContextMenu = (props: TLUiContextMenuProps) => {
    return (
        <DefaultContextMenu {...props}>
            <MySiteMenuItem />
            <DefaultContextMenuContent />
        </DefaultContextMenu>
    )
}
