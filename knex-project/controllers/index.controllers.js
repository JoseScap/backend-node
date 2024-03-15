const db = require("../db")

const createProduct = async (req, res) => {
    await db.table('products').insert({ name: 'Milk' })

    res.json({ data: 'Create product', error: null })
}

const listAllProducts = async (req, res) => {
    try {
        const products = await db.table('products')
        res.json({ data: products, error: null })
    } catch (error) {
        console.log(error)
        res.json({ data: null, error: 'Something went wrong' })
    }
}

module.exports = {
    createProduct,
    listAllProducts
}