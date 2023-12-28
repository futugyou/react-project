import { useMemo, ReactElement, useState, useEffect } from "react"
import { ModelContext, ModelContextProps } from './fluidContext'
import { FluidModel, getContainer, createContainer } from '../model'

export const FluidProvider = (props: any): ReactElement => {
    const [model, setModel] = useState<ModelContextProps>({} as ModelContextProps)
    const { children } = props
    const containerId = location.hash.substring(1)
    useEffect(() => {
        const loadModel = async () => {
            let id
            let { container, services } = await getContainer(containerId)
            if (!container || !services) {
                ({ container, services, id } = await createContainer())
                location.hash = id
            }

            setModel({ model: new FluidModel(container, services) })
        }
        loadModel()
    }, [containerId])

    // const memoModel = useMemo(() => {
    //     return model
    // }, [model])


    return (
        <ModelContext.Provider value={model}>
            {children}
        </ModelContext.Provider>
    )
}
