import { ITinyliciousAudience, TinyliciousContainerServices }
    from "@fluidframework/tinylicious-client"
import { SharedCell } from "@fluidframework/cell"
import { ISharedMap, IFluidContainer, IValueChanged } from "fluid-framework"
import { TinyliciousMember } from "./types"
import { EventEmitter } from "events"

export type EventPayload = {
    type: string
    changed: IValueChanged
    data?: any
}

export class FluidModel extends EventEmitter {
    private sharedTimestamp: ISharedMap
    private dynamicMap: ISharedMap
    private audience: ITinyliciousAudience
    constructor(
        private container: IFluidContainer,
        private services: TinyliciousContainerServices,
    ) {
        super()
        this.sharedTimestamp = container.initialObjects.sharedTimestamp as ISharedMap
        this.dynamicMap = container.initialObjects.dynamicMap as ISharedMap
        this.audience = services.audience

        this.sharedTimestamp.on("valueChanged", (changed, local, target) => {
            console.log("valueChanged: ", changed, local, target)
        })

        this.audience.on("memberAdded", (members) => {
            console.log("memberAdded: ", members)
        })

        this.audience.on("memberRemoved", (members) => {
            console.log("memberRemoved: ", members)
        })

        this.dynamicMap.on("valueChanged", (changed, local, target) => {
            const handle = this.dynamicMap.get(changed.key)
            handle.get().then((cell: SharedCell) => {
                console.log("valueChanged on map: ", cell.get())
                cell.on("valueChanged", (d) => {
                    console.log("valueChanged on dynamic cell: ", d)
                })
            })
        })
    }

    public getMembers = (): TinyliciousMember[] => {
        const members = Array.from(this.audience.getMembers().values())
        return members
    }

    public getMyself = (): TinyliciousMember | undefined => {
        return this.audience.getMyself()
    }

    public setDynamicRefData = async (key: string, value: string) => {
        const newCell = await this.container.create(SharedCell)
        newCell.set(value)
        this.dynamicMap.set(key, newCell.handle)
    }

    public setDynamicData = async (key: string, value: string) => {
        const cell = await this.dynamicMap.get("cell-id").get() as SharedCell
        cell.set(Date.now().toString())
    }

    public setSharedTimestamp = () => {
        this.sharedTimestamp.set("time", Date.now().toString())
    }

    public getSharedTimestamp = () => {
        return this.sharedTimestamp.get("time")
    }
}