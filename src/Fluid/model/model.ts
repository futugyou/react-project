import { IAzureAudience, AzureContainerServices }
    from "@fluidframework/azure-client"
import { ISharedCell, SharedCell } from "@fluidframework/cell/internal" 
import { TinyliciousMember } from "./types"
import { EventEmitter } from "events"
import { IValueChanged } from "@fluidframework/map/legacy"
import { IFluidContainer, ISharedMap, SharedString } from "fluid-framework/legacy"

export type EventPayload = {
    type: string
    changed?: IValueChanged
    data?: any
}

export class FluidModel extends EventEmitter {
    private sharedTimestamp: ISharedMap
    private dynamicMap: ISharedMap
    private audience: IAzureAudience
    private sharedString: SharedString
    constructor(
        private container: IFluidContainer,
        private services: AzureContainerServices,
    ) {
        super()
        this.sharedTimestamp = container.initialObjects.sharedTimestamp as ISharedMap
        this.dynamicMap = container.initialObjects.dynamicMap as ISharedMap
        this.audience = services.audience
        this.sharedString = container.initialObjects.sharedString as SharedString

        this.sharedTimestamp.on("valueChanged", (changed, local, target) => {
            const changeNodePayload: EventPayload = { type: "timestampChange", changed }
            this.emit("modelChanged", changeNodePayload)
        })

        this.audience.on("memberAdded", (members) => {
            const membersChangedPayload: EventPayload = { type: "membersChanged" }
            this.emit("modelChanged", membersChangedPayload)
        })

        this.audience.on("memberRemoved", (members) => {
            const membersChangedPayload: EventPayload = { type: "membersChanged" }
            this.emit("modelChanged", membersChangedPayload)
        })

        this.dynamicMap.on("valueChanged", (changed, local, target) => {
            const handle = this.dynamicMap.get(changed.key)
            handle.get().then((cell: ISharedCell) => {
                console.log("valueChanged on map: ", cell.get())
                cell.on("valueChanged", (d) => {
                    console.log("valueChanged on dynamic cell: ", d)
                })
            })
        })
    }

    public getAllNodeIds = (): string[] => {
        return Array.from(this.sharedTimestamp.keys())
    }

    private nodeExists = (id: string) => {
        return this.getAllNodeIds().includes(id)
    }

    public getMembers = (): TinyliciousMember[] => {
        const members = Array.from(this.audience.getMembers().values())
        return members as any
    }

    public setMembers = (userId: string, userName: string) => {
        let member = this.audience.getMembers().get(userId)
        if (member) {
            //TODO: this not work, tinylicious-client have no method to change member name.
            member.additionalDetails.userName = userName
            const memberPayload: EventPayload = { type: "memberChange", data: member }
            this.emit("modelChanged", memberPayload)
        }
    }

    public getMyself = (): TinyliciousMember | undefined => {
        return this.audience.getMyself() as any
    }

    public setDynamicRefData = async (key: string, value: string) => {
        const newCell = await this.container.create(SharedCell as any)
        //TODO: i do not found how to use
        // newCell.set(value)
        this.dynamicMap.set(key, newCell.handle)
    }

    public getDynamicData = async (key: string): Promise<string> => {
        const cell = await this.dynamicMap.get(key).get() as ISharedCell
        return (cell.get() ?? "")as any
    }

    public setDynamicData = async (key: string, value: string) => {
        const cell = await this.dynamicMap.get(key).get() as ISharedCell
        cell.set(value)
    }

    public setSharedTimestamp = () => {
        this.sharedTimestamp.set("time", Date.now().toString())
    }

    public getSharedTimestamp = (): string => {
        return this.sharedTimestamp.get("time") ?? ""
    }

    get getCollaborativeText() { return this.sharedString }
}