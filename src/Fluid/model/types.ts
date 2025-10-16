import { SharedCell } from "@fluidframework/cell/internal" 
import { AzureMember } from "@fluidframework/azure-client"
import { ContainerSchema, IMember } from "fluid-framework"
import { SharedMap, SharedString } from "fluid-framework/legacy"

export const containerSchema: ContainerSchema = {
    initialObjects: {
        sharedTimestamp: SharedMap,
        dynamicMap: SharedMap, 
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
