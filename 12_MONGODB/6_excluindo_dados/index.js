import express from 'express'
import exphbs from 'express-handlebars'
import conn from "./db/conn.js"
import ProductController from './controllers/ProductController.js'
import productsRoutes from './routes/productsRoutes.js'

const app = express()

// config template engine - handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// body parser
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'))

app.use('/products', productsRoutes)

app.get('/', ProductController.showProducts)

app.listen(3000)