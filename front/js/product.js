//-------------------------------------RECUPERATION DE L'ID DANS L'URL-------------------------------------

const params = new URLSearchParams(window.location.search)
const productId = params.get('productId')

//-------------------------------------RECUPERATION ET CREATION D'ELEMENTS-------------------------------------

const price = document.getElementById('price')
const title = document.getElementById('title')
const description = document.getElementById('description')
const colors = document.getElementById('colors')
const button = document.getElementById('addToCart')
const quantity = document.getElementById('quantity')

const image = document.getElementsByClassName('item__img')
const firstImage = image[0]

const imageProduct = document.createElement('img')
firstImage.appendChild(imageProduct)

//-------------------------------------RECUPERATION ET INJECTION DES INFORMATIONS DES PRODUITS-------------------------------------

let productData

//Cette fonction récupère les détails du produit ciblé et les assigne à
//la variable ProductData
const getProductDetails = async () => {
  await fetch("http://localhost:3000/api/products/" + productId)
    .then(res => res.json())
    .then(data => {
        injectProductIntoDOM(data)
        productData = data
    })
    .catch(err => console.log(err))
}

//Cette fonction, qui a les détails du produit en argument, injecte les informations
//du produit afin qu'il s'affiche sur la page. La boucle sert à stipuler la création
//d'une option pour chaque couleur existante du produit
const injectProductIntoDOM = (product) => {

  imageProduct.src = product.imageUrl
  title.textContent = product.name
  price.textContent = product.price
  description.textContent = product.description
  imageProduct.setAttribute('alt', product.altTxt)

  for(let color of product.colors){
    const newColor = document.createElement('option')
    newColor.textContent = color
    colors.appendChild(newColor)
}}

// Appel de la fonction
getProductDetails()

//-------------------------------------RECUPERATION DE LA COULEUR EN CHAINE DE CARACTERES-------------------------------------

colors.value = colors.options[colors.selectedIndex].text

//-------------------------------------RECUPERATION DU LOCAL STORAGE-------------------------------------

let cartProducts = JSON.parse(localStorage.getItem('cart'))

//-------------------------------------ECOUTE D'EVENEMENT POUR AJOUTER LE PRODUIT AU PANIER-------------------------------------

button.addEventListener('click', function() {

  //Nous souhaitons ajouter un produit seulement si la quantité respecte le minimum et le maximum autorisés
	if(quantity.value != 0 && quantity.value <= 100 && colors.value) {

    //Si présence d'un panier et qu'un élément à ajouter a le même id et la même couleur, nous ne changeons que la quantité
    //à limite de 100 maximum par produit
    if(cartProducts) {
      let indexFound = null

	    for(let [index, element] of cartProducts.entries()){
	      if (element.id === productId && element.color === colors.value) {
	        indexFound = index
	      }
	    }

    	if(indexFound !== null) {

        if(+cartProducts[indexFound].quantity + +quantity.value > 100) {
          cartProducts[indexFound].quantity = 100
        }else{
          cartProducts[indexFound].quantity = +cartProducts[indexFound].quantity + +quantity.value
        }

      //Si ce n'est pas le cas, nous ajoutons un nouvel élément et nous trions le panier pour que les mêmes produits se regroupent
    	}else{
        let newProductInCart = {
          id: productId,
          quantity: +quantity.value,
          color: colors.value,
          price: productData.price,
          imageUrl: productData.imageUrl,
          name: productData.name,
          altTxt: productData.altTxt
        }

      cartProducts.push(newProductInCart)

			cartProducts.sort(function(a, b){
				if(a.id < b.id) { return -1 }
				if(a.id > b.id) { return 1 }
				return 0
			})
  	}

      localStorage.setItem('cart', JSON.stringify(cartProducts))

	  //S'il n'y a pas de local storage, nous créons un nouvel élément dans le panier
	  }else{
  	  let newProductInCart = {
  	    id: productId,
        quantity: +quantity.value,
        color: colors.value,
        price: productData.price,
        imageUrl: productData.imageUrl,
        name: productData.name,
        altTxt: productData.altTxt
  	  }

      cartProducts = []

      cartProducts.push(newProductInCart)

  	  localStorage.setItem('cart', JSON.stringify(cartProducts))
  	}
	}
})