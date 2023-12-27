import { createContext ,ReactElement} from "react"
import { FluidModel } from "../model"

export interface ModelContextProps {
    model: FluidModel
}

export const ModelContext = createContext<ModelContextProps>({} as ModelContextProps)
