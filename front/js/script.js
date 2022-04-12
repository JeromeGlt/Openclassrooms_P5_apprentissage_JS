//-------------------------------------RECUPERATION DE LA SECTION-------------------------------------

let items = document.getElementById("items")

//-------------------------------------CREATION DES PRODUITS-------------------------------------

//La fonction, qui a les éléments de l'API comme argument, effectue une boucle
//pour créer la même chose pour chaque produit. Elle sera appelée dans la fonction suivante
const injectProductsIntoDOM = (products) => {
  for(let product of products){
    const newProduct = document.createElement('a')
    const newArticle = document.createElement('article')
    const imgProduct = document.createElement('img')
    const productName = document.createElement('h3')
    const productDescription = document.createElement('p')

		items.appendChild(newProduct)
    newProduct.appendChild(newArticle)
    newArticle.appendChild(imgProduct)
    newArticle.appendChild(productName)
    newArticle.appendChild(productDescription)

		imgProduct.setAttribute('alt', product.altTxt)
    imgProduct.src = product.imageUrl
    productName.textContent = product.name
    productDescription.textContent = product.description
    newProduct.href = "product.html?productId=" + product._id
	}
}

//La fonction getProduct récupère la liste de tous les produits disponibles sur l'API,
//parse le résultat et l'injecte à la fonction injectProductsIntoDOM
const getProduct = async () => {
  await fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => injectProductsIntoDOM(data))
    .catch(err => console.log(err))
}

//Appel de la fonction
getProduct()