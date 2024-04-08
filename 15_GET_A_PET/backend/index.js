import express from 'express'
import conn from './db/conn.js'
import cors from 'cors'

// Routes imports
import UserRoutes from './routes/UserRoutes.js'
import PetRoutes from './routes/PetRoutes.js'
import getToken from './helpers/get-token.js'
import getUserByToken from './helpers/get-user-by-token.js'

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

// Public folder for images
app.use(express.static('public'))

//Routes
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)