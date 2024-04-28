import { DefaultActionsMenu, TldrawUiMenuItem, DefaultActionsMenuContent } from "@tldraw/tldraw"

export const MySiteActionsMenu = () => {
    return (
        <div>
            <DefaultActionsMenu>
                <DefaultActionsMenuContent />
                <div>
                    <TldrawUiMenuItem
                        id="react-app"
                        label="MySite"
                        icon="external-link"
                        readonlyOk
                        onSelect={() => {
                            window.open('https://react-vishel.vercel.app/', '_blank')
                        }}
                    />
                </div>
            </DefaultActionsMenu>
        </div>
    )
}
