import Product from "../models/Product.js"

export default class ProductController {
    static showProducts(req, res) {
        res.render('products/all')
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductSave(req, res) {
        const { name, price, description } = req.body

        const product = new Product(name, price, description)

        product.save()

        res.redirect('/products')
    }
}