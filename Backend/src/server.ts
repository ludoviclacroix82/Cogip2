import express from 'express'
import dotenv from 'dotenv'
import route from './Routes/route'
import connectToDatabase from './utils/_connect'
import db from './utils/db'
import { error } from 'console'
const cors = require('cors')
// Activer CORS pour toutes les origines


//docs Api
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc  =  require ( 'swagger-jsdoc' )
const {options} = require('../src/utils/swaggerOptions')

dotenv.config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000
// connectToDatabase()
db.sync()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })


app.use(express.json())

const openapiSpecification = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))



app.use('/', route)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Quelque chose s\'est mal passé !')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
