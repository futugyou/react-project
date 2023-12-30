import { FluidModel } from "../model"
import { useGetStore } from "../hooks"

type ITimestampQueries = {
    getTimestamp: () => string
}

type ITimestampActions = {
    editTimestamp: () => void
}

const getTimestampState = (model: FluidModel) => model.getSharedTimestamp()

export const useGetTimestampStore = () =>
    useGetStore<string, ITimestampActions, ITimestampQueries>({
        // Establish initial state on load
        initialState: (model) => getTimestampState(model),

        // Specify stateful queries to use in the view
        queries: {
            getTimestamp: (state) => state,
        },

        // Specify actions, their payloads, and how they will interact with the model
        actions: {
            editTimestamp: (model) =>
                model.setSharedTimestamp(),
        },

        // Sync view state with Fluid state by loading default state or patching the key that changed
        reducer: (model, draft, { type, changed }) => {
            switch (type) {
                case "timestampChange":
                    return getTimestampState(model)
            }
        },
    }) 
