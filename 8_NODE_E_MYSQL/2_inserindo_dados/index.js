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

        res.redirect('/')
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
