import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import User from './models/User.js'

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

conn
    .sync()
    // .sync({ force: true}) /* force = true faz com que todas as tabelas sejam dropadas e criadas novamente */
    .then(() => {
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`)
        })
    })
    .catch(console.log)
