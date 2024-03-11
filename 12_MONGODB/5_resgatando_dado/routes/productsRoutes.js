import express from "express"
import ProductController from "../controllers/ProductController.js"

const router = express.Router()

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductSave)
router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)

export default router