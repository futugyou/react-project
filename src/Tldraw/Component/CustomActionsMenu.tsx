import { DefaultActionsMenu, DefaultActionsMenuContent } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomActionsMenu = () => {
    return (
        <DefaultActionsMenu>
            <DefaultActionsMenuContent />
            <MySiteMenuItem />
        </DefaultActionsMenu>
    )
}
