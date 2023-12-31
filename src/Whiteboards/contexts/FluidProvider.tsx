import { ReactElement, useState, useEffect } from "react"
import { ModelContext } from './fluidContext'
import { FluidModel, getContainer, createContainer } from '../model'

export const FluidProvider = (props: any): ReactElement => {
    const [model, setModel] = useState<FluidModel | undefined>()
    const { children } = props
    const containerId = location.hash.substring(1)
    useEffect(() => {
        const loadModel = async () => {
            let id, container, services
            if (!!containerId) {
                ({ container, services } = await getContainer(containerId))
            }

            if (!container || !services) {
                ({ container, services, id } = await createContainer())
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
