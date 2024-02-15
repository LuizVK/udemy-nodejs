import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'

import User from './models/User.js'
import Address from './models/Address.js'

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
    const { name, occupation } = req.body
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({ name, occupation, newsletter })

    res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ raw: true, where: { id: id } })

    res.render('userview', { user })
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id

    await User.destroy({ where: { id: id } })

    res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ raw: true, where: { id: id } })

    res.render('useredit', { user })
})

app.post('/users/update', async (req, res) => {
    const { id, name, occupation } = req.body
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: { id: id } })

    res.redirect('/')
})

app.get('/', async (req, res) => {

    const users = await User.findAll({ raw: true })

    res.render('home', { users })
})


conn
    // .sync()
    .sync({ force: true}) /* force = true faz com que todas as tabelas sejam dropadas e criadas novamente */
    .then(() => {
        app.listen(port, () => {
            console.log(`App rodando na porta ${port}`)
        })
    })
    .catch(console.log)
