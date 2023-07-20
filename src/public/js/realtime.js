import {io} from "socket.io-client"

const socketClient = io()

socketClient.on("products", (obj) => {
    updateproducts(obj)
}) 

function updateproducts(products) {
    let cont = document.getElementById("list-products")
    let productos = ""
   

    products.forEach((product) => {
        productos += `
        <article>
        <div class="card" style="width: 18rem;">
  <img src="${product.thumbnail}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
    <a href="#" class="btn btn-primary">Buy</a>
  </div>
</div>
</article>
        `
    });
    cont.innerHTML = productos
}
