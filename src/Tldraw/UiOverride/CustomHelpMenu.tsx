import { DefaultHelpMenu, DefaultHelpMenuContent } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomHelpMenu = () => {
    return (
        <DefaultHelpMenu>
            <DefaultHelpMenuContent />
            <MySiteMenuItem />
        </DefaultHelpMenu>
    )
}
