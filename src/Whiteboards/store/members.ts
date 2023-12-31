import { TinyliciousMember } from "../model"
import { useGetStore } from "../hooks"

type IMembersQueries = {
    getMembers: () => TinyliciousMember[]
}

type IMembersActions = {
    updateName: (param: { userId: string; userName: string }) => void
}

export const useGetMembersStore = () =>
    useGetStore<TinyliciousMember[], IMembersActions, IMembersQueries>({
        initialState: (model) => model.getMembers(),

        queries: {
            getMembers: (state) => state,
        },

        actions: {
            updateName: (model, param) => model.getMembers
        },

        reducer: (model, draft, { type, changed }) => {
            return model.getMembers()
        },
    }) 
