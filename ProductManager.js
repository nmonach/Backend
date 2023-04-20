const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
    }
    
    async addProduct(dataProduct) {
        try {
            const {title, description, price, thumbnail, code, stock} = dataProduct 
            if (!title || !description || !price || !thumbnail || !code || !stock){
                throw new Error ('Faltan campos para la creacion del producto')
            }
    
            const codeFound = await this.getProductByCode(code)
            if(codeFound){
                throw new Error ('No se pueden cargar productos con el mismo codigo')
            }
    
            const products = await this.getProducts()
            let newId = 1
    
            if (products.length > 0) {
                newId =products[products.length -1].id +1   
            } 
            const newProduct = {
                id: newId, title, description, price, thumbnail, code, stock
            }
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return newProduct
        } catch (error) {
            console.error(error.message)
        }
    }
    
    async getProducts(){
        try {
            const fileData = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(fileData)
        } catch (error) {
            return []
        }
    }
   
    async getProductById(id){
        try {
            const products = await this.getProducts()
            const found = products.find(product => product.id === id)
            if (!found) {
                throw new Error ('Producto no encontrado')
            }
            return found
        } catch (error) {
            console.error(error.message)
        }
    }
    async getProductByCode(code){
        try {
            const products = await this.getProducts()
            const found = products.find(product => product.code === code)
            if (!found) {
                throw new Error ('Producto no encontrado')
            }
            return found
        } catch (error) {
            console.error(error.message)
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const otherProducts = products.filter(product=>product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(otherProducts, null, 2))
        } catch (error) {
            console.error(error.message)
        }
    }
}

//IIFE function scope asincrono, funcion que se ejecuta inmediatamente despues de declararla
(async()=>{
    const productManager = new ProductManager('./productos.json')
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(1));
    console.log(await productManager.addProduct({
        title: "plancha", description: "plancha copada", price: 400, code: "001", stock: 20, thumbnail: "www.google.com"
    }));
    await productManager.deleteProduct(3)

})()

