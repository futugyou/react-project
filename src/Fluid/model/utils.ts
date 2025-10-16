
import { ConnectionState, IFluidContainer } from "fluid-framework"

import {
    AzureClient,
    AzureClientProps,
    AzureContainerServices,
    AzureLocalConnectionConfig,
    AzureRemoteConnectionConfig,
} from "@fluidframework/azure-client"
import { getRandomName } from "@fluidframework/server-services-client"
import { InsecureTokenProvider } from "@fluidframework/test-client-utils"

import { v4 as uuid } from "uuid"

import { containerSchema } from "./types"

export const useAzure = import.meta.env.REACT_APP_FLUID_CLIENT === "azure"

const userConfig = {
    id: uuid(),
    name: getRandomName(),
}

const remoteConnectionConfig: AzureRemoteConnectionConfig = {
    type: "remote",
    tenantId: import.meta.env.REACT_APP_FLUID_REMOTE_TENANT_ID, // REPLACE WITH YOUR TENANT ID
    tokenProvider: new InsecureTokenProvider("" /* REPLACE WITH YOUR PRIMARY KEY */, userConfig),
    endpoint: import.meta.env.REACT_APP_FLUID_REMOTE_ENDPOINT, // REPLACE WITH YOUR AZURE ENDPOINT
}

const localConnectionConfig: AzureLocalConnectionConfig = {
    type: "local",
    tokenProvider: new InsecureTokenProvider("", userConfig),
    endpoint: import.meta.env.REACT_APP_FLUID_LOCAL_ENDPOINT,
}

const connectionConfig: AzureClientProps = {
    connection: useAzure ? remoteConnectionConfig : localConnectionConfig,
}

const client = new AzureClient(connectionConfig)

export const createContainer = async () => {
    const { container, services } = await client.createContainer(containerSchema as any, "2")
    const id = await container.attach()
    return { container, services, id }
}

export const getContainer = async (containerId: string) => {
    let container: IFluidContainer = {} as any
    let services: AzureContainerServices = {} as any
    try {
        const { container, services } = await client.getContainer(containerId, containerSchema as any, "2")
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
        return { container, services }
    }
}
