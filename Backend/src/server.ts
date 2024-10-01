import express from 'express'
import dotenv from 'dotenv'
import route from './Routes/route'
import connectToDatabase from './utils/connect'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
connectToDatabase()

app.use(express.json())

app.use('/', route)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Quelque chose s\'est mal passé !')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
