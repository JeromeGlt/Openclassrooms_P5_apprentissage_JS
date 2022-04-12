//-------------------------------------RECUPERATION DU NUMERO DE COMMANDE DE L'URL-------------------------------------

const params = new URLSearchParams(window.location.search)
const urlOrderId = params.get('orderId')

//-------------------------------------RECUPERATION DE L'ELEMENT CONTENANT-------------------------------------
let orderId = document.getElementById('orderId')

//-------------------------------------ASSIGNATION DU RESULTAT A L'ELEMENT-------------------------------------
orderId.innerHTML = "<br>" + urlOrderId

//-------------------------------------SUPPRESSION DU LOCAL STORAGE-------------------------------------

localStorage.removeItem('cart')