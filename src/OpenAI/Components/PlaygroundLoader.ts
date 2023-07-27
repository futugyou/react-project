
import set from '../Services/Example'

export const playgroundLoader = async ({ params, request }: any) => {
    return await set.getExample(params.parameter ?? "")
}