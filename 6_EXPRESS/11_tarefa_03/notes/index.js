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

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/notes.html`)

})

export default router