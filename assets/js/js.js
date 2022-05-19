
// import { getProducts } from "./crud";

function printProducts(products) {
    // Identificar el contenedor
    const container = document.getElementById('products-container');
    // Generar el HTML
    let html = '';
    for(let i = 0; i < products.length; i++) {
        html += `<div class="shopping-cart">
                        <figure>
                    <div>
                        <img src="${products[i].image} " alt="bike">
                    </div>                  
                        </figure>
                    <p class="shopping-card-title">${products[i].name}</p>
                    <p>$ ${products[i].price}</p>
                    <div>
                        <button onclick="deleteProduct(${products[i].id})" class="icon1-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button onclick="editProduct(${products[i].id})" class="icon2-button">
                            <i class="fa-solid fa-pen"></i>
                        </button>   
                    </div>
                </div>`
    }
    // Imprimir el HTML
    container.innerHTML = html;
}



const baseURL='https://e-commerce-api-academlo.herokuapp.com/api'
let editingID = null;

function getProducts() {
    axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products')
        .then(function (response) {
            const products = response.data;
            printProducts(products);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createProduct() {
    const newProduct = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image-url').value
    }

    axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newProduct)
        .then(function (response) {
            alert('Se creo el producto correctamente');
            getProducts();
        })
        .catch(function (error) {
            alert('No se pudo crear el producto');
            console.log(error);
        })
}


function deleteProduct(id) {
    const confirmation = confirm('¿Estás seguro de eliminar la tarea?');
    if(!confirmation){
        return
    }
    //https://e-commerce-api-academlo.herokuapp.com/api/products/1
    axios.delete(`${baseURL}/products/${id}`)
        .then(function () {
            alert('La tarea se eliminó correctamente');
            getProducts();
        })
        .catch(function (error) {
            alert('No se pudo eliminar la tarea');
        })
}

function editProduct(id) {
    axios.get(`${baseURL}/products/${id}`)
        .then(function (response) {
            editingID = id;
            const product =  response.data;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('image-url').value = product.image;
        })
        .catch(function (error) {
            alert('No se pudo cargar la tarea');
        })
}

function updateProduct() {
    const productEdited = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image-url').value
    }

    axios.put(`${baseURL}/products/${editingID}`, productEdited)
        .then(function (response) {
            alert('Se editó la tarea correctamente');
            getProducts();
        })
        .catch(function (error) {
            alert('No se pudo editar la tarea');
        })
}


getProducts();
window.createProduct = createProduct;
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
window.updateProduct = updateProduct