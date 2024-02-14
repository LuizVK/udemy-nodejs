import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
