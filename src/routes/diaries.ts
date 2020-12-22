import express from 'express'
import diaryService from '../services/diaryService' 
const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diaryService.getNonSensitiveDiaryEntries())
})

router.post('/', (req, res) => {
    const { date, weather, visibility, comment } = req.body
    const newdiary = diaryService.addEntry({
        date, weather, visibility, comment
    }
    )
    res.json(newdiary)
})

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id))
    if (diary) {
        res.send(diary)
    } else {
        res.sendStatus(404)
    }
})
export default router