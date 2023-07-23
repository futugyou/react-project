import set from '../Services/Example'
import { ExampleModel } from '../Models/ExampleModel'

export const examplesLoader = async ({ params, request }: any) => {
    const list = await set.getAllExamples()
    return list
        .filter((p: ExampleModel) => p.title != undefined && p.title.length > 0)
        .sort((a: ExampleModel, b: ExampleModel) => {
            if (a.key > b.key) {
                return 1
            }
            if (a.key < b.key) {
                return -1
            }
            return 0
        })
}