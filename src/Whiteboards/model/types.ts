import { SharedCell } from "@fluidframework/cell"
import { SignalManager } from "@fluid-experimental/data-objects"
import { SharedMap,  ContainerSchema, IMember } from "fluid-framework"

export const containerSchema: ContainerSchema = {
    initialObjects: {
        sharedTimestamp: SharedMap,
        dynamicMap: SharedMap,
        signalManager: SignalManager,
    },
    dynamicObjectTypes: [SharedCell],
}

export interface TinyliciousMember extends IMember {
    userName: string
}
