import diayData from '../../data/diaries'
import { NewDiaryEntry, DiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types'

const diaries: Array<DiaryEntry> = diayData as Array<DiaryEntry>

const getEntries = (): Array<DiaryEntry> => {
    return diaries
}

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }))
}

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
    const newdiary = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    }
    diaries.push(newdiary)
    return newdiary
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry
}

export default {
    getEntries, addEntry, getNonSensitiveDiaryEntries, findById
}