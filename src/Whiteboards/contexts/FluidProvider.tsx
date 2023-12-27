import { useMemo, ReactElement, useState, useEffect } from "react"
import { ModelContext, ModelContextProps } from './fluidContext'
import { FluidModel, getContainer, createContainer } from '../model'

export const FluidProvider = (props: any): ReactElement => {
    const [model, setModel] = useState<ModelContextProps>({} as ModelContextProps)
    const { children, id } = props
    useEffect(() => {
        const loadModel = async () => {
            let container, services
            if (id) {
                ({ container, services } = await createContainer())
            } else {
                ({ container, services } = await getContainer(id))
            }

            setModel({ model: new FluidModel(container, services) })
        }
        loadModel()
    }, [id])

    const memoModel = useMemo(() => {
        return model
    }, [model])


    return (
        <ModelContext.Provider value={memoModel}>
            {children}
        </ModelContext.Provider>
    )
}
