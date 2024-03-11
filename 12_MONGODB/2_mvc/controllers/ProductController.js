// import Product from "../models/Product"

export default class ProductController {
    static showProducts(req, res) {
        res.render('products/all')
    }
}