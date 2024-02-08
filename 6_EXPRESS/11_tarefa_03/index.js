import express from "express"
import notes from './notes/index.js'
import users from './users/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static('public'))

const basePath = path.join(__dirname, '/pages')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use('/notes', notes)
app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}...`)
})

