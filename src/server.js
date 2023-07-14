import  Express  from "express";
import productRouter from "./Products/product.routes.js";
import cartRouter from "./Carts/cart.routes.js"

const app = Express();
const PORT = 8080;

//CONFIGURACION EXPRESS
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter )

app.listen(PORT, () => {
    console.log(`🚀SERVIDOR LEVANTADO EN EL PUERTO: ${PORT} 🚀`)
})





