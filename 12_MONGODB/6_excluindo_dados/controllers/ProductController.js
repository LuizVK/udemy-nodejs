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
        
        console.log('1 - ' + id)

        const product = await Product.getProductById(id.trim())

        if(!product)
            return res.sendStatus(404)

        res.render('products/product', { product })
    }

    static async removeProduct(req, res) {
        const { id } = req.params

        await Product.removeProductById(id.trim())

        res.redirect('/products')
    }
}