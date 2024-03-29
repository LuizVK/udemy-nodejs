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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const {name, occupation } = req.body
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

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
