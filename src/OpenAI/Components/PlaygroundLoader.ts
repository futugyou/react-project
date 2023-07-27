
import set from '../services/Example'

export const playgroundLoader = async ({ params, request }: any) => {
    return await set.getExample(params.parameter ?? "")
}