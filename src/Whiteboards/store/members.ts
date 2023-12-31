import { TinyliciousMember } from "../model"
import { useGetStore } from "../hooks"
import { Draft } from "immer"

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
            updateName: (model, param) => model.setMembers(param.userId, param.userName)
        },

        reducer: (model, draft, { type, changed, data }) => {
            switch (type) {
                case "memberChange":
                    const todo = draft.find(todo => todo.userId === data.userId) as Draft<TinyliciousMember>
                    if (todo) {
                        todo.userName = data.userName
                    }

                    break
            }
        },
    }) 
