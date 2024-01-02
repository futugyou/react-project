import React, { useState } from "react"
import { AzureMember } from "@fluidframework/azure-client"
import { useDrop } from "react-dnd"
import { NoteData, Position, BrainstormModel } from "../model"

export type NoteSpaceProps = Readonly<{
    model: BrainstormModel
    author: AzureMember
}>

export function NoteSpace(props: NoteSpaceProps) {
    const { model } = props
    const [notes, setNotes] = useState<readonly NoteData[]>([])
    const [time, setTime] = useState(Date.now())
    const [, drop] = useDrop(
        () => ({
            accept: "note",
            drop(item: any, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()!
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                model.MoveNote(item.id, {
                    x: left > 0 ? left : 0,
                    y: top > 0 ? top : 0,
                })
                return undefined
            },
        }),
        [model],
    )

    return (
        <div id="NoteSpace" ref={drop} >
        </div>
    )
}
