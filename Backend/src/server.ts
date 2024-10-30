import express from 'express'
import dotenv from 'dotenv'
import route from './Routes/route'
import db from './utils/db'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import Keycloak from 'keycloak-connect'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from '../src/utils/swaggerOptions'
import keycloakConfig from '../keycloak.json'

dotenv.config()

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Origine autorisée
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes autorisées
    credentials: true // Permet l'envoi des cookies, si nécessaire
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000

// Database connection
db.sync()
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error)
    })

// Middleware
app.use(bodyParser.json())
app.use(express.json())

// Session configuration for Keycloak
const memoryStore = new session.MemoryStore()
app.use(session({
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}))

// Keycloak setup
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
app.use(keycloak.middleware())

// Swagger configuration
const openapiSpecification = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

// Protected routes
app.use('/', keycloak.protect(), route)
app.use('/api-docs', keycloak.protect(), route)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Quelque chose s\'est mal passé !')
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})