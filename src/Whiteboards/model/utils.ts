import { TinyliciousClient } from "@fluidframework/tinylicious-client"
import { ConnectionState } from "fluid-framework"
import { containerSchema } from "./types"

const client = new TinyliciousClient()

export const createContainer = async () => {
    const { container, services } = await client.createContainer(containerSchema)
    const id = await container.attach()
    return { container, services, id }
}

export const getContainer = async (containerId: string) => {
    try {
        const { container, services } = await client.getContainer(containerId, containerSchema)
        if (container.connectionState !== ConnectionState.Connected) {
            await new Promise<void>((resolve) => {
                container.once("connected", () => {
                    resolve()
                })
            })
        }
        
        return { container, services }
    } catch (error) {
        console.log(error)
        return { container: undefined, services: undefined }
    }
}