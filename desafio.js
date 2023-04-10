products=[]

class ProductManager {
    constructor(){
        this.products=products
    }
    addProduct(newProduct){
        //Para validar que solo exista un unico codigo y no se repita 
        const product = this.products.find(prod => prod.code === newProduct.code)
        if (product) {
            return 'Ya existe este codigo para otro producto'
        }
        //Id Autoincremental y tampoco se repita
        if (this.products.length === 0) {
            this.products.push( {id: 1, ...newProduct } )
        } else {
            this.products.push( {id: this.products[this.products.length-1].id + 1  , ...newProduct } )

        }
    }
    
    getProducts(){
        return this.products
    }
   
    getProductById(id){
        const product = this.products.find(prod => prod.id === id)
        if (!product) {
            return'Not found'
        }
        return product
    }
}

const productos = new ProductManager()

console.log(productos.addProduct(
    {
    id: 1,
    title: 'Vela de Soja',
    description: 'Vela de Soja con aroma a Lavanda',
    price: 1500,
    thumbnail: './vela1.jpg',
    code: '001',
    stock: '10',
    }))

console.log(productos.addProduct({
    title: 'Vela de Soja Redonda',
    description: 'Vela de Soja con aroma a Naranja',
    price: 4000,
    thumbnail: './vela2.jpg',
    code: '002',
    stock: '10',
    }))


console.log(productos.getProducts())

console.log(productos.getProductById(2))