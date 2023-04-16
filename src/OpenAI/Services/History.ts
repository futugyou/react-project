import { HistoryModel } from '../Models/HistoryModel';

const historyStoredKey: string = "playground/history/key"
const historyStoredKeyPrefix: string = "playground/history/"

const storeHistory = (model: HistoryModel) => {
    const key = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    model.Date = key
    const itemkey = historyStoredKeyPrefix + key

    // store history keys
    const historyKeys = localStorage.getItem(historyStoredKey)
    let historyKeyData = JSON.parse(historyKeys ?? '[]') as string[]
    if (historyKeyData.indexOf(key) == -1) {
        historyKeyData.push(key)
    }

    localStorage.setItem(historyStoredKey, JSON.stringify(historyKeyData))

    // store histort
    const historys = localStorage.getItem(itemkey)
    let historyData: HistoryModel[] = []
    if (historys != null) {
        historyData = JSON.parse(historys) as HistoryModel[]
    }

    historyData.push(model)
    localStorage.setItem(itemkey, JSON.stringify(historyData))
}

const getHistory = (): HistoryModel[] => {
    let result: HistoryModel[] = []
    const historyKeys = localStorage.getItem(historyStoredKey)
    if (historyKeys == null) {
        return result
    }

    let historyKeyData = JSON.parse(historyKeys) as string[]
    for (const kd of historyKeyData) {
        const itemkey = historyStoredKeyPrefix + kd
        const historys = localStorage.getItem(itemkey)
        let historyData: HistoryModel[] = []
        if (historys != null) {
            historyData = JSON.parse(historys) as HistoryModel[]
        }

        if (historyData.length > 0) {
            result.push(...historyData)
        }
    }

    return result.sort((a, b) => b.createdAt - a.createdAt)
}

export default {
    storeHistory: storeHistory,
    getHistory: getHistory,
}