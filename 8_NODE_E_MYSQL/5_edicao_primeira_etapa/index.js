import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())


app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title, pageqty) VALUES('${title}', '${pageqty}')`
    conn.query(query, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const query = "SELECT * FROM books;"

    conn.query(query, function(err, data) {
        if (err){
            console.log(err)
            return
        }

        const books = data

        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = ${id}`
    conn.query(query, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = ${id}`
    conn.query(query, function(err, data) {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', { book })
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql1'
})

conn.connect(function(err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectou ao MySQL!')

    app.listen(port, () => {
        console.log(`App rodando na porta ${port}`)
    })
})
