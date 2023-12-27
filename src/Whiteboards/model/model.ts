import { TinyliciousClient } from "@fluidframework/tinylicious-client"
import { SharedCell } from "@fluidframework/cell"
import { SharedMap } from "fluid-framework"
import { containerSchema } from "./types"

export const getFluidData = async () => {
    // 1: Configure the container.
    const client = new TinyliciousClient()

    // 2: Get the container from the Fluid service.
    let container, services
    const containerId = location.hash.substring(1)
    if (!containerId) {
        ({ container, services } = await client.createContainer(containerSchema));
        (container.initialObjects.sharedTimestamp as SharedMap).set("time", Date.now().toString());
        const id = await container.attach()
        location.hash = id
    } else {
        ({ container, services } = await client.getContainer(containerId, containerSchema))
    }

    const audience = services.audience

    const map = container.initialObjects.map as SharedMap
    const newCell = await container.create(SharedCell)
    newCell.set("test data")
    map.set("cell-id", newCell.handle)

    // 3: Return the Fluid timestamp object.
    return { initialObjects: container.initialObjects, members: audience.getMembers(), getMyself: audience.getMyself() }
}
