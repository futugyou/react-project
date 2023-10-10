
import { Node, XYPosition } from "reactflow"

export const initPosition = () => {
    const p: XYPosition = {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
    }
    return p
}

export const getRandomId = () => `random_id_${+new Date()}`

export const getAllChildrens = (list: Node[], parentNode: Node) => {
    let result: Node[] = list.filter(p => p.parentNode == parentNode.id)

    for (const sub of result) {
        result = result.concat(getAllChildrens(list, sub))
    }
    return result
}