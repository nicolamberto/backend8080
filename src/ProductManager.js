import fs from "fs"

class ProductManager {
    constructor(fileName) {
      this.fileName = fileName;
      if (fs.existsSync(fileName)) {
        try {
          let products = fs.readFileSync(fileName, "utf-8");
          this.products = JSON.parse(products);
        } catch (error) {
          this.products = [];
        }
      } else {
        this.products = [];
      }
    }
  
    async saveFile(data) {
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(data, null, "\t")
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  
    async addProduct(product) {
      const products = await this.getProducts()
      let id
        if (!products.length) {
            id = 1
        } else {
            id = products[products.length - 1].id + 1
        }
        const newProduct = {...product, id}
        products.push(newProduct)
  
      const respuesta = await this.saveFile(this.products);
  
      if (respuesta) {
        console.log("Usuario creado");
        console.log(this.products);
      } else {
        console.log("Hubo un error al crear un usuario");
      }
    }
  
    getProducts() {
      console.log(this.products);
      return this.products;
    }

    async getProductById(id) {
      const product = this.products.find(item => item.id === id)
      return product
    }

    async deleteProduct(id){
      try {
          const prodsPrev = await this.products
          const prodsNewArray = prodsPrev.filter(u=> u.id !== id)
          await fs.promises.writeFile(this.fileName, JSON.stringify(prodsNewArray))
          console.log("product deleted");

      } catch (error) {
          return error
      }
  }

      async updateProduct(id, obj){
        try {
            const prodsPrev = await this.products
            const prodIndex = prodsPrev.findIndex(u=> u.id === id)
            if(prodIndex === -1){
                return 'El producto que quieres actualizar no se encuentra disponible'
            } 
            const product = prodsPrev[prodIndex]
            const prodUpdate = {...product, ...obj}
            prodsPrev[prodIndex] = prodUpdate
            await fs.promises.writeFile(this.fileName, JSON.stringify(prodsPrev))
        } catch (error) {
            return error
        }
    }

  }

  export class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
  }

  const product1 = new Product(1, "celular", "celular", 200, "aaa", "ac2fr", 10)
  const product2 = new Product(2, "eeeee", "celular", 200, "dddd", "ac2fr", 11)
  const product3 = new Product(3, "qqqqq", "celular", 200, "sssss", "ac2fr", 12)
  
  
  const manager = new ProductManager("./Products.json");

  //manager.updateProduct(2, product3)


  export default ProductManager