import {Router} from "express"
import cartManager from "../managers/cartManager.js";

const cartRouter = Router()
const manager = new cartManager("./src/models/carts.json")

cartRouter.post("/", async (req, res) => {
    res.send(await manager.addCart())
})

cartRouter.get("/", async (req, res) => {
    res.send(await manager.readCarts())
})
cartRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    res.send(await manager.getCartById(id))
})
cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    res.send(await manager.addProductInCart(cartId, productId))
})


export default cartRouter