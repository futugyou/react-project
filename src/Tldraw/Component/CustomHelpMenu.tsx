import { DefaultHelpMenu, DefaultHelpMenuContent } from "@tldraw/tldraw"
import { MySiteMenuItem } from "./MySiteMenuItem"

export const CustomHelpMenu = () => {
    return (
        <div>
            <DefaultHelpMenu>
                <DefaultHelpMenuContent />
                <MySiteMenuItem />
            </DefaultHelpMenu>
        </div>
    )
}
