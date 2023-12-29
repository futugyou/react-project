import { createContext } from "react"
import { FluidModel } from "../model"

export const ModelContext = createContext<FluidModel>({} as FluidModel)
