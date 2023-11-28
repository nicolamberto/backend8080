import { Router } from "express";
import CartManager from '../CartManager.js'


const router = Router()

const manager = new CartManager("./Carts.json")

router.get('/:cid', async(req, res)=>{
    const {cid} = req.params 
    try {
       const cart = await manager.getOneCart(+cid)
       return res.status(200).json({message:'Cart', cart})
    } catch (error) {
        return res.status(500).json({error})
    }
})


router.post('/', async (req, res)=>{
    try {
        const createCart = await manager.createCart()
        return res.status(200).json({message:'Cart', cart:createCart})
    } catch (error) {
        return res.status(500).json({error})
    }
})


router.post('/:idCart/product/:idProduct', async (req, res)=>{
    const {idCart, idProduct} = req.params
    console.log(req.params);
    try {
        const addProduct = await manager.addProduct(Number(idCart), Number(idProduct))
        return res.status(200).json({message:'Product-Cart', product:addProduct})
    } catch (error) {
        return res.status(500).json({message: error })
        
    }
})

export default router