
import { XYPosition } from "reactflow"

export const initPosition = () => {
    const p: XYPosition = {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
    }
    return p
}

export const getRandomId = () => `random_id_${+new Date()}`