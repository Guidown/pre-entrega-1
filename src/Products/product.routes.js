import {Router} from "express"
import productManager from "./productManager.js";


const product = new productManager("./src/models/products.json")
const productRouter = Router()


productRouter.get("/", async (req, res) => {
    res.send(await product.getProduct())
})

productRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    res.send(await product.getProductById(id))
})

productRouter.post("/", async (req, res) => {
    const newProduct = req.body
    res.send(await product.addProduct(newProduct))
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const updateProduct = req.body
    res.send(await product.updateProducts(id, updateProduct))
})


productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    res.send(await product.deleteProducts(id))
})

export default productRouter