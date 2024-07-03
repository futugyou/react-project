import { ReactElement, useState, useEffect } from "react"
import { ModelContext } from './fluidContext'
import { FluidModel, getContainer, createContainer } from '../model'
import { IFluidContainer } from "fluid-framework"
import { AzureContainerServices } from "@fluidframework/azure-client"

export const FluidProvider = (props: any): ReactElement => {
    const [model, setModel] = useState<FluidModel | undefined>()
    const { children } = props
    const containerId = location.hash.substring(1)
    useEffect(() => {
        const loadModel = async () => {
            let id
            let container: IFluidContainer = {} as any
            let services: AzureContainerServices = {} as any
            if (!!containerId) {
                ({ container, services } = await getContainer(containerId) as any)
            } else {
                ({ container, services, id } = await createContainer() as any)
                location.hash = id
            }

            setModel(new FluidModel(container, services))
        }
        loadModel()
    }, [containerId])

    if (!model) {
        return <div />
    }

    return (
        <ModelContext.Provider value={model}>
            {children}
        </ModelContext.Provider>
    )
}
