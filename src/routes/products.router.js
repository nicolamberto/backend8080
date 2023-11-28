import { Router } from "express";
import ProductManager from '../ProductManager.js'
import { Product } from "../ProductManager.js";

const router = Router()

const manager = new ProductManager("./Products.json")

router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts()
        return res.status(200).json({ message: 'Products', products })
    } catch (error) {
        return error
    }
})


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const products = manager.getProducts()
    const product = products.find((product) => product.id === Number(pid))
    //const product = manager.getProductById(Number(id))

    if (product) {
        return res.json(product)
    }
    res.json({ error: "product not found" })
})


router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    try {
        const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails })
        if( !title || !description || !code || !price || !status || !stock || !category || !thumbnails){
            return res.status(500).json({message: 'Missing some data'})
        } else
        return res.status(200).json({ message: 'User Created', user: newProduct })
    } catch (error) {
        return res.status(500).json({ error })
    }
})


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    manager.updateProduct(Number(pid),req.body)

    res.status(200).json({
        status: "Actualizado"
    })
})


router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const response = await manager.deleteProduct(+pid)
        res.status(200).json({ message: 'Product deleted.' })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router