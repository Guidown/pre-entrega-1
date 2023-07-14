import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import productManager from "../Products/productManager.js"

const productAll = new productManager("./src/models/products.json")

export default class cartManager {
    constructor(path) {
        this.path = path
    }

    async readCarts() {
        const carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    async writeCarts(cart) {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    async existCart(id){
        const Carts = await this.readCarts()
        return Carts.find(cart => cart.id === id)
    }

    async addCart() {
        const oldCarts = await this.readCarts()
        const id = nanoid(16)
        const cartsConcat = [{id: id, products:[]}, ...oldCarts]
        await this.writeCarts(cartsConcat)
        return `Carrito agregado!`
    }

    async getCartById(id){
        const cartById = await this.existCart(id)
        if(!cartById){
            return `El carrito con el id: ${id}, no se encontro`
        }
        return cartById
    }

    async addProductInCart(cartId, productId) {
        const cartById = await this.existCart(cartId)
        if(!cartById){
            return `Carrito con el id: ${cartId}, no encontrado.`
        }
        const productById = await productAll.exist(productId)
        if(!cartById){
            return `Producto con el id: ${productId}, no encontrado.`
        }
        const allCarts = await this.readCarts();
        const cartFilter = allCarts.filter((cart) => cart.id != cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
            const moreProductInCart = cartById.products.find((prod) => prod.id === productId)
            moreProductInCart.quantity++
            const cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "producto sumado correctamente!" 
        }
        cartById.products.push({id:cartId, products: [{id: productById.id, quantity: 1}]})
        const cartConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartConcat)
        return "producto agregado correctamente!"
    }


}