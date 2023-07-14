import {promises  as fs} from "fs"
import {nanoid} from "nanoid"

export default class productManager {
    constructor(path){
        this.products = [],
        this.path = path
    }

    async readProducts() {
        const products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    async exist (id) {
        const products = await this.readProducts();
        return products.find(prod => prod.id === id)
    }
    async writeProducts(product) {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    async addProduct(product) {
        const productsOld = await this.readProducts()
        product.id = nanoid(4)
        const productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "producto agregado"
    }

    async getProduct() {
        return await this.readProducts()
    }

    async getProductById(id) {
        const getProductById = await this.exist(id)
        if(!getProductById){
            console.log("Producto no encontrado")
        }else{
            return getProductById
        }
        return getProductById


    }
    async updateProducts(id, product) {
        const exist = this.exist(id)
        if(!exist){
            return (`Producto con el id: ${id}, no encontrado`)
        }else{
            await this.deleteProducts(id)
            const productOld = await this.readProducts()
            const products = [{...product, id:id}, ...productOld]
            await this.writeProducts(products)
            return (`Producto con el id: ${id}, actualizado`)
        }
}
    async deleteProducts(id) {
        const products = await this.readProducts();
        const existProduct = products.some(prod => prod.id === id)
        if(existProduct){
            const filterProduct = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProduct)
            return `Producto con el id: ${id}, eliminado correctamente`
        }else{
            return `El producto con el id: ${id}, no existe`
        }
    }


}
