import React from "react"

import { AzureMember } from "@fluidframework/azure-client"

import { BrainstormModel } from "../model"

export interface HeaderProps {
    model: BrainstormModel
    author: AzureMember
    members: AzureMember[]
}

export function Header(props: HeaderProps) {
    return <div />
}
