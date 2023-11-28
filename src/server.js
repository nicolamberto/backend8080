import express, { urlencoded } from 'express'
import ProductsRouter from "./routes/products.router.js"
import CartRouter from "./routes/cart.router.js"

//import ProductManager from './ProductManager.js'

const app = express()

//const manager = new ProductManager("./Products.json")

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/products', ProductsRouter)
app.use('/carts', CartRouter)

const PORT = 8080

app.listen(PORT,()=>{
    console.log('escuchando al puerto 8080');
})