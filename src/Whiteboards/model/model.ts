import { TinyliciousClient, ITinyliciousAudience, TinyliciousContainerServices }
    from "@fluidframework/tinylicious-client"
import { SharedCell } from "@fluidframework/cell"
import { ISharedMap, IFluidContainer } from "fluid-framework"
import { containerSchema, TinyliciousMember } from "./types"

export const getFluidData = async () => {
    // 1: Configure the container.
    const client = new TinyliciousClient()

    // 2: Get the container from the Fluid service.
    let container, services
    const containerId = location.hash.substring(1)
    if (!containerId) {
        ({ container, services } = await client.createContainer(containerSchema));
        (container.initialObjects.sharedTimestamp as ISharedMap).set("time", Date.now().toString())
        const id = await container.attach()
        location.hash = id
    } else {
        ({ container, services } = await client.getContainer(containerId, containerSchema))
    }

    const audience = services.audience

    const map = container.initialObjects.map as ISharedMap
    const newCell = await container.create(SharedCell)
    newCell.set("test data")
    map.set("cell-id", newCell.handle)

    // 3: Return the Fluid timestamp object.
    return { initialObjects: container.initialObjects, members: audience.getMembers(), getMyself: audience.getMyself() }
}


export class FluidModel {
    private sharedTimestamp: ISharedMap
    private audience: ITinyliciousAudience
    constructor(
        private container: IFluidContainer,
        private services: TinyliciousContainerServices,
    ) {
        this.sharedTimestamp = container.initialObjects.sharedTimestamp as ISharedMap
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
    }

    public getAudience = (): TinyliciousMember[] => {
        const members = Array.from(this.audience.getMembers().values())

        return members
    }
}