// Permet de récupérer l'URL de la page
function getCurrentURL () {
    return window.location.href;
  }
const url = getCurrentURL ();
console.log(url);
addEventListener('load', getCurrentURL);


// Utilise l'URL de la page pour retrouver l'ID du produit
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);


// Affiche les éléments du produit selon l'ID récupérée
let product = 'http://localhost:3000/api/products/'+id;
console.log(product);
fetch(product)
    .then(res => res.json())
    .then((result) => { 
      console.log(result);
        document.getElementById('title').innerText = result.name;
        document.getElementById('price').innerText = result.price;
        document.getElementById('description').innerText = result.description;
        let imgLink = new URL(result.imageUrl);
        imgLocation = decodeURIComponent(imgLink.pathname);
        let imgPos = document.querySelector(".item__img > img");
        imgPos.src = result.imageUrl;
        imgPos.alt = result.altTxt;
        for (const shade of result.colors) {
          var option = document.createElement('option');
          option.value = shade;
          option.text = shade;
          document.getElementById('colors').add(option);
        }
        
      error => {
        console.log(error);
      }
    });


// Enregistre le produit dans le panier
let cart = [];
function buy() {
let item = new Array(id, document.getElementById('colors').value, document.getElementById('quantity').value);
// Ajoute l'objet dans le localStorage si ce dernier existe déjà
  if ((document.getElementById('quantity').value > 0) && (localStorage.getItem('merch') !== null)) {
    cart = JSON.parse(localStorage.getItem("merch"));
    let newItem = true;
    for (let i = 0; i < cart.length; i++) {
    let itemInCart = cart[i];
      // Vérifie si l'objet en question existe dans le localStorage et modifie la quantité
      if ((itemInCart.includes(item[0])) && (itemInCart.includes(item[1]))) {
        newQuantity = parseInt(item[2]) + parseInt(itemInCart[2]);
        console.log(newQuantity);
        itemInCart[2] = newQuantity;
        console.log(cart);
        localStorage.setItem("merch", JSON.stringify(cart));
        newItem = false;
      // Ajoute l'objet dans le localStorage s'il n'y est pas présent
      }
    }
    if (newItem) {
    cart.push(item);
    localStorage.setItem("merch", JSON.stringify(cart));    
    }
  }
// Créé le localStorage avec l'objet dedans
  else if ((document.getElementById('quantity').value > 0) && (localStorage.getItem('merch') === null))
  cart.push(item);
  localStorage.setItem("merch", JSON.stringify(cart));
}
document.getElementById('addToCart').addEventListener('click', buy);
