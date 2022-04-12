//-------------------------------------RECUPERATION D'ELEMENTS ET DU LOCAL STORAGE-------------------------------------

const cartItems = document.getElementById('cart__items')
let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')
let orderButton = document.getElementById('order')

let cartProducts = JSON.parse(localStorage.getItem('cart'))

//-------------------------------------CREATION DE VARIABLES-------------------------------------

let deleteItem
let newArticle
let input

//-------------------------------------CALCUL QUANTITE TOTALE-------------------------------------

//Cette fonction crée un tableau dans lequel on insert les différentes quantités des produits.
//Puis, elle additionne et crée le total qu'elle inclue dans l'élément correspondant

const totalQuantityCalcul = () => {

  let totalQuantityArray = []

  for (let i = 0; i < cartProducts.length; i++) {
    totalQuantityArray.push(cartProducts[i].quantity)
  }

  const reducerQuantity = (accumulator, currentValue) => accumulator + currentValue
  const totalQuantityProducts = totalQuantityArray.reduce(reducerQuantity, 0)

  totalQuantity.textContent = totalQuantityProducts
}

//-------------------------------------CALCUL PRIX TOTAL-------------------------------------

//Cette fonction crée un tableau dans lequel on insert les prix des produits multipliés par les
//quantités correspondantes. Puis, elle additionne et crée le total qu'elle inclue dans l'élément correspondant
const totalCalcul = () => {
  let totalPriceArray = []
  
  for (let i = 0; i < cartProducts.length; i++) {
    totalPriceArray.push(cartProducts[i].price * cartProducts[i].quantity)
  }
  
  const reducerPrice = (accumulator, currentValue) => accumulator + currentValue
  const totalPriceProducts = totalPriceArray.reduce(reducerPrice, 0)
      
  totalPrice.textContent = totalPriceProducts
}

//-------------------------------------CREATION PRODUIT-------------------------------------


//La fonction utilise une boucle pour créer des éléments en fonction de ce que contient le local storage et
//crée une écoute d'évènement ainsi que d'autres fonctions
const productCreation = () => {
  
  for (let couch of cartProducts) {

    let index = cartProducts.indexOf(couch)
    
    newArticle = document.createElement('article')
    let imgDiv = document.createElement('div')
    let imgProduct = document.createElement('img')
    let optionsDiv = document.createElement('div')
    let titlePriceDiv = document.createElement('div')
    let productName = document.createElement('h2')
    let productPrice = document.createElement('p')
    let settingsDiv = document.createElement('div')
    let quantityDiv = document.createElement('div')
    let quantity = document.createElement('p')
    let productColor = document.createElement('p')
    let deleteDiv = document.createElement('div')
    input = document.createElement('input')
    deleteItem = document.createElement('p')
    
    newArticle.className += 'cart__item'
    imgDiv.className += 'cart__item__img'
    optionsDiv.className += 'cart__item__content'
    titlePriceDiv.className += 'cart__item__content__titlePrice'
    settingsDiv.className += 'cart__item__content__settings'
    quantityDiv.className += 'cart__item__content__settings__quantity'
    deleteDiv.className += 'cart__item__content__settings__delete'
    deleteItem.className += 'deleteItem'
    input.className += 'itemQuantity'
    
    input.setAttribute('type', 'number')
    input.setAttribute('min', '1')
    input.setAttribute('max', '100')
    input.setAttribute('name', 'itemQuantity')
    input.setAttribute('value', couch.quantity)
    input.setAttribute('data-id', index)
    deleteItem.setAttribute('role', 'button')
    deleteItem.setAttribute('data-id', index)
    
    cartItems.appendChild(newArticle)
    newArticle.appendChild(imgDiv)
    imgDiv.appendChild(imgProduct)
    newArticle.appendChild(optionsDiv)
    optionsDiv.appendChild(titlePriceDiv)
    titlePriceDiv.appendChild(productName)
    titlePriceDiv.appendChild(productPrice)
    optionsDiv.appendChild(settingsDiv)
    settingsDiv.appendChild(quantityDiv)
    settingsDiv.appendChild(productColor)
    quantityDiv.appendChild(quantity)
    quantityDiv.appendChild(input)
    settingsDiv.appendChild(deleteDiv)
    deleteDiv.appendChild(deleteItem)
    
    quantity.textContent = 'Qté : '
    deleteItem.textContent = 'Supprimer'

//Nous assignons les différents détails dont nous avons besoin sur la page

    productName.textContent = couch.name
    productPrice.textContent = couch.price + ' €'
    imgProduct.src = couch.imageUrl
    imgProduct.setAttribute('alt', couch.altTxt)
    productColor.textContent = 'Couleur : ' + couch.color

//-------------------------------------CHANGEMENT QUANTITE-------------------------------------


//Une écoute d'évènements de type 'change' est placée sur la quantité de chaque élément pour suivre
//un éventuel changement. Si c'est le cas et que la valeur est acceptée, l'élément en question voit
//son ancienne valeur et sa nouvelle s'additionner
    input.addEventListener('change', function (event) {
      if(event.target.value != 0 && event.target.value <= 100) {
        let itemIndex = event.target.getAttribute('data-id')
        cartProducts[itemIndex].quantity = +event.target.value
        localStorage.setItem('cart', JSON.stringify(cartProducts))
        totalCalcul()
        totalQuantityCalcul()
      }
    })

//-------------------------------------SUPPRESSION D'ELEMENTS-------------------------------------


//Une fonction qui ajoute une écoute d'évènements sur les boutons 'supprimer', elle supprime l'élément
//en question dans le local storage et rafraichit la page afin que l'élément n'apparaisse plus
    const removeItem = () => {
      deleteItem.addEventListener('click', function(event) {
          let item = event.target.getAttribute('data-id')
          cartProducts.splice(item, 1)
          localStorage.setItem('cart', JSON.stringify(cartProducts))
          window.location.reload(true)
      })
    }

//Appel de la dernière fonction
    removeItem()
  }
}

//Appel de la fonction de création des produits lors du chargement de la page ainsi que des fonctions de calculs
productCreation()
totalCalcul()
totalQuantityCalcul()

//-------------------------------------RECUPERATION DES ELEMENTS DU FORMULAIRE-------------------------------------

let inputFirstName = document.getElementById('firstName')
let inputLastName = document.getElementById('lastName')
let inputAddress = document.getElementById('address')
let inputCity = document.getElementById('city')
let inputEmail = document.getElementById('email')

let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let addressErrorMsg = document.getElementById('addressErrorMsg')
let cityErrorMsg = document.getElementById('cityErrorMsg')
let emailErrorMsg = document.getElementById('emailErrorMsg')

//-------------------------------------ECOUTE D'EVENEMENTS DES CHAMPS DU FORMULAIRE-------------------------------------

//Une écoute d'évènements de type 'change' permet d'analyser la donnée saisie dans le champ et de vérifier
//qu'elle respecte bien le regex. Si non, un message d'erreur apparaît
inputFirstName.addEventListener('change', function(e) {
  if(!/[^a-zâáàäçêéèëîíìïôóòöûúùü-]/i.test(e.target.value)) {
    firstNameErrorMsg.textContent = ''
  }else{
    firstNameErrorMsg.textContent = 'Veuillez renseigner votre prénom'
  }
})

inputLastName.addEventListener('change', function(e) {
  if(!/[^a-zâáàäçêéèëîíìïôóòöûúùü-]/i.test(e.target.value)) {
    lastNameErrorMsg.textContent = ''
  }else{
    lastNameErrorMsg.textContent = 'Veuillez renseigner votre nom'
  }
})

inputAddress.addEventListener('change', function(e) {
  if(/[0-9]{1,5}(?=[,. ]{1,2}(?=[a-zâáàäçêéèëîíìïôóòöûúùü]))/gi.test(e.target.value)) {
    addressErrorMsg.textContent = ''
  }else{
    addressErrorMsg.textContent = 'Veuillez renseigner votre adresse, par exemple \"18 rue des Peupliers\"'
  }
})

inputCity.addEventListener('change', function(e) {
  if(!/[^a-zâáàäçêéèëîíìïôóòöûúùü-]/i.test(e.target.value)) {
    cityErrorMsg.textContent = ''
  }else{
    cityErrorMsg.textContent = 'Veuillez renseigner votre ville'
  }
})

inputEmail.addEventListener('change', function(e) {
  if(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/i.test(e.target.value)) {
    emailErrorMsg.textContent = ''
  }else{
    emailErrorMsg.textContent = 'Veuillez renseigner votre adresse mail au format xxxxxx@xxxxx.xx'
  }
})

//-------------------------------------ENVOI DU FORMULAIRE-------------------------------------

//Une écoute d'évènements de type 'click' permet de créer un objet comprenant les données saisies
//dans les champs du formulaire ainsi qu'un tableau contenant les IDs des produits seulement si le
//formulaire est intégralement et correctement rempli
orderButton.addEventListener('click', function(event) {
  event.preventDefault()

  if(!inputFirstName.value || firstNameErrorMsg.textContent || !inputLastName.value || lastNameErrorMsg.textContent || !inputAddress.value
  || addressErrorMsg.textContent || !inputCity.value || cityErrorMsg.textContent || !inputEmail.value || emailErrorMsg.textContent) {
    window.alert('Merci de remplir complètement/correctement le formulaire')
    return
  }

  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value,
  }
  let products = cartProducts.map(function(item) {
    return item.id
  })
  
//On utilise fetch pour envoyer tout ceci à l'API et après avoir parsé ce qu'elle nous a renvoyé,
//nous rajoutons une partie de la réponse dans l'URL tout en envoyant l'utilisateur sur
//la page de confirmation de commande
  fetch('http://localhost:3000/api/products/order', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact, products})
  })
  .then(res => res.json())
  .then(data => window.location.href = 'confirmation.html?orderId=' + data.orderId)
  .catch(err => console.log(err))
  console.log(contact)
  console.log(products)
})