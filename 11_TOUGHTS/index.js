import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
import flash from 'express-flash'
import conn from './db/conn.js'
import path from 'path'
import os from 'os'

const FileStore = sessionFileStore(session)
const app = express()

// Models
import Tought from './models/Toughts.js'
import User from './models/User.js'

// Import Routes
import toughtsRoutes from './routes/toughtsRoutes.js'
import authRoutes from './routes/authRoutes.js'

// Import Controller
import ToughtController from './controllers/ToughtController.js'

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

// set session to res
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

// public path
app.use(express.static('public'))

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

conn
    .sync()
    // .sync({ force: true })
    .then(() => {
        app.listen(3000)
    })
    .catch(console.log)
