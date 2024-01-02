import styles from './Header.module.css'

import React from "react"
import Button from "@cloudscape-design/components/button"

import { AzureMember } from "@fluidframework/azure-client"

import { BrainstormModel, NoteData, ColorId } from "../model"

export interface HeaderProps {
    model: BrainstormModel
    author: AzureMember
    members: AzureMember[]
}

export const NOTE_SIZE = {
    width: 300,
    height: 100,
}

const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export function Header(props: HeaderProps) {
    const [color, setColor] = React.useState<ColorId>("Blue")

    const onAddNote = () => {
        const { scrollHeight, scrollWidth } = document.getElementById("NoteSpace")!
        const id = uuidv4()
        const newCardData: NoteData = {
            id,
            position: {
                x: Math.floor(Math.random() * (scrollWidth - NOTE_SIZE.width)),
                y: Math.floor(Math.random() * (scrollHeight - NOTE_SIZE.height)),
            },
            lastEdited: {
                userId: props.author.userId,
                userName: props.author.userName,
                time: Date.now(),
            },
            author: props.author,
            numLikesCalculated: 0,
            didILikeThisCalculated: false,
            color,
        }
        props.model.SetNote(id, newCardData)
    }
    return (
        <div className={styles.header} >
            <div >
                <Button onClick={onAddNote}>
                    Add note
                </Button>
            </div>
            <div >Default Color</div>
        </div>
    )
}
