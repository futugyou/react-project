import React, { useState } from "react"
import { AzureMember } from "@fluidframework/azure-client"

import { NoteData, Position, BrainstormModel } from "../model"

export type NoteSpaceProps = Readonly<{
    model: BrainstormModel
    author: AzureMember
}>

export function NoteSpace(props: NoteSpaceProps) {
    const { model } = props
    const [notes, setNotes] = useState<readonly NoteData[]>([])
    const [time, setTime] = useState(Date.now())


    return (
        <div id="NoteSpace" >
        </div>
    )
}
