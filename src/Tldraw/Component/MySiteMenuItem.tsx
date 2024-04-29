import { TldrawUiMenuItem } from "@tldraw/tldraw"

export const MySiteMenuItem = () => {
    return (
        <TldrawUiMenuItem
            id="react-app"
            label="MySite"
            icon="external-link"
            readonlyOk
            onSelect={() => {
                window.open('https://react-vishel.vercel.app/', '_blank')
            }}
        />
    )
}