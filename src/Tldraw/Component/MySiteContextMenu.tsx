import { TldrawUiMenuItem, DefaultContextMenu, DefaultContextMenuContent, TLUiContextMenuProps } from "@tldraw/tldraw"

export const MySiteContextMenu = (props: TLUiContextMenuProps) => {
    return (
        <DefaultContextMenu {...props}>
            <TldrawUiMenuItem
                id="react-app"
                label="MySite"
                icon="external-link"
                readonlyOk
                onSelect={() => {
                    window.open('https://react-vishel.vercel.app/', '_blank')
                }}
            />
            <DefaultContextMenuContent />
        </DefaultContextMenu>
    )
}
