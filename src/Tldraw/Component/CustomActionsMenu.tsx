import { DefaultActionsMenu, DefaultActionsMenuContent } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomActionsMenu = () => {
    return (
        <div>
            <DefaultActionsMenu>
                <DefaultActionsMenuContent />
                <MySiteMenuItem />
            </DefaultActionsMenu>
        </div>
    )
}
