import express from 'express'
import exphbs from 'express-handlebars'
import conn from "./db/conn.js"

const app = express()

// config template engine - handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// body parser
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Teste")
})

app.listen(3000)