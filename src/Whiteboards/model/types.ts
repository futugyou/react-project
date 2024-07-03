import { SharedCell } from "@fluidframework/cell/internal"
import { Signaler } from "@fluid-experimental/data-objects"
import { SharedMap, ContainerSchema, IMember, SharedString } from "fluid-framework"
import { AzureMember } from "@fluidframework/azure-client"

export const containerSchema: ContainerSchema = {
    initialObjects: {
        sharedTimestamp: SharedMap,
        dynamicMap: SharedMap,
        signaler: Signaler as any,
        sharedString: SharedString,
        map: SharedMap,
    },
    dynamicObjectTypes: [SharedCell as any],
} satisfies ContainerSchema

export interface TinyliciousMember extends IMember {
    userName: string
}

export type Position = Readonly<{ x: number; y: number }>

export type NoteData = Readonly<{
    id: any
    lastEdited: { userId: string; userName: string; time: number }
    text?: string
    author: AzureMember
    position: Position
    numLikesCalculated: number
    didILikeThisCalculated: boolean
    color: ColorId
}>

export type ColorId = "Blue" | "Green" | "Yellow" | "Pink" | "Purple" | "Orange"
