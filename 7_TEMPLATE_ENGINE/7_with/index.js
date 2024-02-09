import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a parender Node.js...',
        comments: 4
    }

    res.render('blogpost', { post })
})

app.get('/dashboard', (req, res) => {

    const items = [ "Item a", "Item b", "Item c"]

    res.render('dashboard', { items })
})

app.get('/', (req, res) => {
    
    const user = {
        name: 'Luiz Vitor',
        surname: 'Karpinski'
    }

    const palavra = 'Teste'

    const auth = true

    const approved = true

    res.render('home', { user: user, palavra, auth, approved })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})