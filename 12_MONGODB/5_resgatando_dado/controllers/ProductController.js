import Product from "../models/Product.js"

export default class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts()

        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductSave(req, res) {
        const { name, image, price, description } = req.body

        const product = new Product(name, image, price, description)

        product.save()

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }
}