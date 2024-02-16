import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'

const app = express()

import Task from './models/Task.js'
import tasksRoutes from './routes/tasksRoutes.js'

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/tasks', tasksRoutes)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(console.log)