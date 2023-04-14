import { HistoryModel } from '../Models/HistoryModel';

const historyStoredKey: string = "playground/history/key"
const historyStoredKeyPrefix: string = "playground/history/"

const storeHistory = (model: HistoryModel) => {
    const key = new Date().toISOString().slice(0, 10).replace(/-/g, "")
    const itemkey = historyStoredKeyPrefix + key

    // store history keys
    const historyKeys = localStorage.getItem(historyStoredKey)
    if (historyKeys != null) {
        let historyKeyData = JSON.parse(historyKeys) as string[]
        if (historyKeyData.indexOf(key) == -1) {
            historyKeyData.push(key)
            localStorage.setItem(historyStoredKey, JSON.stringify(historyKeyData))
        }
    }

    // store histort
    const historys = localStorage.getItem(itemkey)
    let historyData: HistoryModel[] = []
    if (historys != null) {
        historyData = JSON.parse(historys) as HistoryModel[]
    }

    historyData.push(model)
    localStorage.setItem(itemkey, JSON.stringify(historyData))
}


export default {
    storeHistory: storeHistory,
}