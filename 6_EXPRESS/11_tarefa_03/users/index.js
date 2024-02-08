import express from "express"
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const basePath = path.join(__dirname, '../pages')

router.use(express.urlencoded({
    extended: true
}))

router.use(express.json())


router.post('/save', (req, res) => {
    console.log(req.body)
    res.sendFile(`${basePath}/users.html`)
})

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/usersform.html`)
})

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/users.html`)

})

export default router