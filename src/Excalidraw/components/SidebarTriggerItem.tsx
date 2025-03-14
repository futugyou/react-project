
import { Sidebar } from "@excalidraw/excalidraw"
import React from "react"
import { JSX } from 'react/jsx-runtime'

export const SidebarTriggerItem: React.FC<{
    name: string,
    text: string,
    icon?: JSX.Element,
    onToggle?: (open: boolean) => void,
}> = React.memo((props) => {

    return (
        <Sidebar.Trigger {...props}>
            {props.text}
        </Sidebar.Trigger>
    )
})
