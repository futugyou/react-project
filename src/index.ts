import express from 'express'
import router from './routes/diaries'
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('xxxxx')
  res.send('pong')
})

app.use('/api/diaries', router)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})