
import React from "react"
import { WelcomeScreen } from "@excalidraw/excalidraw"

export interface AppWelcomeScreenProps {
    children?: React.ReactNode
    items?: MenuItemStruct[]
}

export interface MenuItemStruct {
    onSelect: () => any
    text: string
}

export const AppWelcomeScreen: React.FC<AppWelcomeScreenProps> = React.memo((props) => {
    let items: any = []
    if (props.items && props.items.length > 0) {
        items = props.items.map(p => <WelcomeScreen.Center.MenuItem key={p.text} onSelect={p.onSelect}>{p.text}</WelcomeScreen.Center.MenuItem>)
    }
    return (
        <WelcomeScreen>
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
                <WelcomeScreen.Center.Logo />
                <WelcomeScreen.Center.Heading>
                    Welcome Screen Heading!
                </WelcomeScreen.Center.Heading>
                <WelcomeScreen.Center.Menu>
                    <WelcomeScreen.Center.MenuItemLoadScene />
                    {items}
                    <WelcomeScreen.Center.MenuItemHelp />
                </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
        </WelcomeScreen>
    )
})
