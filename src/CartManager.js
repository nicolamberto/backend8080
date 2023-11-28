import fs from 'fs'
import { stringify } from 'querystring'

class CartManager {
    constructor(path) {
        this.path = path
    }


    async getCart() {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } else {
            return []
        }
    }

    async getOneCart(id) {
        const carts = await this.getCart()
        const cart = carts.find(i => i.id === id)
        return cart
    }

    async createCart() {
        const carts = await this.getCart()
        let id
        if (!carts.length) {
            id = 1
        } else {
            id = carts[carts.length - 1].id + 1
        }
        const newCart = { products:[], id }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return newCart
    }


    async addProduct(idCart, idProduct){
        const carts = await this.getCart()
        const carrito = carts.find(i=> i.id === idCart)

        const indexProd = carrito.products.findIndex(i=> i.product === idProduct)
        const indexCart = carts.findIndex(i=> i.id === idCart)
        if(indexProd === -1){
            carrito.products.push({"product": idProduct, "quantity": 1})

        } else {
            carrito.products[indexProd].quantity++
        } 
        /* const newCart = carts.splice(indexCart, 1, carrito) */
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return carrito
       /*  const cart = carts.find(i=>i.id===idCart)
        const prodIndex = cart.products.findIndex(i=>i.product===id)
       
        if(prodIndex === -1){
            cart.products.push({product:idProduct, quantity:1})
        } else {
            cart.products[prodIndex].quantity++
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cart))
        return cart */
    }

}



export default CartManager