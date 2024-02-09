import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine({
    partialsDir: ['views/partials']
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const products = [
    {
        id: 1,
        description: "Caneta Vermelha",
        price: 2.5
    },
    {
        id: 2,
        description: "Lápis",
        price: 1.5
    },
    {
        id: 3,
        description: "Lapiseira",
        price: 5
    }
]

app.get('/productDetail/:id', (req, res) => {
    const id = req.params.id
    const product = products.filter((item) => item.id === +id)[0]
    product.price = parseFloat(product.price).toFixed(2)
    
    res.render('productDetail', { product })
})

app.get('/', (req, res) => {
    res.render('home', { products })
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
