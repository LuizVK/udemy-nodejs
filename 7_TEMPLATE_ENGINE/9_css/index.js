import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine({
    partialsDir: ['views/partials']
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a parender Node.js...',
        comments: 4
    }

    res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: "Aprender Node.js",
            category: "JavaScript",
            body: "Teste",
            comments: 4
        },
        {
            title: "Aprender PHP",
            category: "PHP",
            body: "Teste",
            comments: 4
        },
        {
            title: "Aprender Python",
            category: "Python",
            body: "Teste",
            comments: 4
        }
    ]

    res.render('blog', { posts })
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