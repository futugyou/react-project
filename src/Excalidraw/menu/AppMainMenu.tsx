
import React from "react"
import { MainMenu } from "@excalidraw/excalidraw"

export const AppMainMenu: React.FC<{ children?: React.ReactNode }> = React.memo((props) => {

    return (
        <MainMenu>
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.SaveToActiveFile />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Help />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.Separator />
            <MainMenu.DefaultItems.Socials />
            <MainMenu.Separator />
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            {props.children ? <>
                <MainMenu.Separator />
                {props.children}
            </> : <></>}
        </MainMenu>
    )
})
