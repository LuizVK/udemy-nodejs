import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basePath = path.join(__dirname, 'templates')

const app = express()
const port = 3000

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users, resgatar um usuário do banco
    console.log(`Estamos buscando pelo usuário: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)    
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})