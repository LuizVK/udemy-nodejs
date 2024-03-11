import express from "express"
import ProductController from "../controllers/ProductController.js"

const router = express.Router()

router.get('/', ProductController.showProducts)
router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductSave)

export default router