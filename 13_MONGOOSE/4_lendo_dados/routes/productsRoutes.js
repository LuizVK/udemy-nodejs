import express from "express"
import ProductController from "../controllers/ProductController.js"

const router = express.Router()

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductSave)
// router.post('/remove/:id', ProductController.removeProduct)
// router.get('/edit/:id', ProductController.editProduct)
// router.post('/edit/', ProductController.editProductPost)
// router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)

export default router