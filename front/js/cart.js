// RegEx pour le nom
var letters = /^[A-Za-z]+$/;
// RegEx pour le prénom et la ville (inclus noms composés)
var compound = /^[A-Za-zéèêàÉÈÊÀ]+(-?[A-Za-zéèêàÉÈÊÀ])+$/;
// RegEx pour l'adresse
var regExAddress = /^[1-9]+([0-9A-Z]?)+ [a-zA-Z]+ [a-zA-Z0-9'-]+( ?[a-zA-Z0-9'-]?)+$/;
// RegEx pour une adresse mail valide
var regExEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


// Vérification du prénom avec le RegEx correspondant
let validFirstName = false;
function validateFirstName(firstName)
{
    var firstName = document.getElementById('firstName')
    if(firstName.value.match(compound)) 
      {
        document.getElementById('firstNameErrorMsg').textContent = ''
      validFirstName = true;
      }
    else
      {
        document.getElementById('firstNameErrorMsg').textContent = 'Veuillez entrer un prénom valide'
      }
    }
firstName.addEventListener("input", validateFirstName);


// Vérification du nom avec le RegEx correspondant
let validLastName = false;
function validateLastName(lastName)
{
    var lastName = document.getElementById('lastName')
    if(lastName.value.match(letters)) 
      {
        document.getElementById('lastNameErrorMsg').textContent = ''
      validLastName = true;
      }
    else
      {
        document.getElementById('lastNameErrorMsg').textContent = 'Veuillez entrer un nom valide'
      }
    }
lastName.addEventListener("input", validateLastName);


// Vérification de l'adresse avec le RegEx correspondant
let validAddress = false;
function validateAddress(address)
{
    var address = document.getElementById('address')
    if(address.value.match(regExAddress)) 
      {
        document.getElementById('addressErrorMsg').textContent = ''
      validAddress = true
      }
    else
      {
        document.getElementById('addressErrorMsg').textContent = 'Veuillez entrer une addresse valide'
      }
    }
address.addEventListener("input", validateAddress);


// Vérification de la ville avec le RegEx correspondant
let validCity = false;
function validateCity(city)
{
    var city = document.getElementById('city')
    if(city.value.match(compound)) 
      {
        document.getElementById('cityErrorMsg').textContent = ''
      validCity = true;
      }
    else
      {
        document.getElementById('cityErrorMsg').textContent = 'Veuillez entrer un nom de ville valide'
      }
    }
city.addEventListener("input", validateCity);


// Vérification de l'email avec le RegEx correspondant
let validEmail = false;
function validateEmail(email)
{
    var email = document.getElementById('email')
    if(email.value.match(regExEmail)) 
      {
        document.getElementById('emailErrorMsg').textContent = ''
      validEmail = true;
      }
    else
      {
        document.getElementById('emailErrorMsg').textContent = 'Veuillez entrer une adresse e-mail valide'
      }
    }
email.addEventListener("input", validateEmail);

//Permet de valider et envoyer le panier si toutes les données sont bonnes
function validateCart(e) {
  e.preventDefault();
  console.log('coucou');
  if ((validFirstName) && (validLastName) && (validAddress) && (validCity) && (validEmail))
    {
    let contact = {firstName: document.getElementById('firstName').value,
                     lastName: document.getElementById('lastName').value, 
                     address: document.getElementById('address').value, 
                     city: document.getElementById('city').value, 
                     email: document.getElementById('email').value};
    let itemsId = [];
    for (let i=0; i < cart.length; i++) {
      var cartItems = cart[i];
      itemsId.push(cartItems[0]);
      }
      console.log(itemsId);
    fetch('http://localhost:3000/api/products/order', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({contact:contact, products:itemsId})
    })
    .then(response => response.json())
    .then((result)=> {
      window.location.href = './confirmation.html?orderId='+result.orderId;
    })
    error => {
      console.log(error);
    }
  }
}
order.addEventListener("click", validateCart);


//Permet de récupérer le contenu du panier et de l'afficher
let cartContent = '';
let cart = JSON.parse(localStorage.getItem("merch"));
function displayItem(){
cart.forEach(function (item){
  id = item[0];
  cartProduct = 'http://localhost:3000/api/products/'+id;
  fetch(cartProduct)
    .then(res => res.json())
    .then((result) => {
      cartContent += '<article class="cart__item" data-id="'+item[0]+'" data-color="'+item[1]+'">'
      +  '<div class="cart__item__img">'
      +    '<img src="'+result.imageUrl+'" alt="Photographie d'+result.altTxt+'">'
      +  '</div>'
      +  '<div class="cart__item__content">'
      +    '<div class="cart__item__content__description">'
      +      '<h2>'+result.name+'</h2>'
      +      '<p>'+item[1]+'</p>'
      +      '<p>'+result.price+'€ </p>'
      +    '</div>'
      +    '<div class="cart__item__content__settings">'
      +      '<div class="cart__item__content__settings__quantity">'
      +        '<p>Qté : </p>'
      +        '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+item[2]+'">'
      +      '</div>'
      +      '<div class="cart__item__content__settings__delete">'
      +        '<p class="deleteItem">Supprimer</p>'
      +      '</div>'
      +    '</div>'
      +  '</div>'
      + '</article>';
  document.getElementById('cart__items').innerHTML = cartContent;

  // Permet de trouver l'id et la couleur de l'article à supprimer
  let removeItems = document.querySelectorAll('.deleteItem');
  for (let removeItem of removeItems) {
    removeItem.addEventListener('click', function (e) {
      let toRemove = e.target.closest('article');
      let removeId = toRemove.dataset.id;
      let removeColor = toRemove.dataset.color;
        // Cherche le produit dans la page et le localStorage et le supprime
        for (let i=0; i < cart.length; i++) {
          let itemInCart = cart[i];
          if ((itemInCart[0] === removeId) && (itemInCart[1] === removeColor)) {
            let itemNumber = cart.indexOf(itemInCart);
            cart.splice(itemNumber, 1);
            console.log(cart);
            localStorage.setItem("merch", JSON.stringify(cart));
            // Met à jour le panier et son affichage
            cartContent = '';
            cartPrice = 0;
            displayItem();
            price();
            quantity();
          }
        }
    })
  }
    // Permet de trouver l'id et la couleur de l'article qui a sa quantité
  let itemQuantities = document.querySelectorAll('.itemQuantity');
  for (let itemQuantity of itemQuantities) {
    itemQuantity.addEventListener('change', function (e) {
      let toChange = e.target.closest('article');
      let changeId = toChange.dataset.id;
      let changeColor = toChange.dataset.color;
      // Cherche le produit dans la page et le localStorage et modifie la quantité
      for (let i=0; i < cart.length; i++) {
        let itemInCart = cart[i];
        if ((itemInCart[0] === changeId) && (itemInCart[1] === changeColor)) {
          itemInCart[2] = e.target.closest('input').value;
          localStorage.setItem("merch", JSON.stringify(cart));
          // Met à jour le panier et son affichage
          cartContent = '';
          cartPrice = 0;
          displayItem();
          price();
          quantity();
        }
      }
    })
  }
    error => {
      console.log(error);
    }
    })
})
}
window.addEventListener("load", displayItem);


//Affiche le prix total du panier
function price(){
  let cartPrice = 0;
  cart.forEach(function(item){
    let kanapId = item[0];
    let kanapQuantity = item[2];
    fetch('http://localhost:3000/api/products/'+kanapId)
      .then(res => res.json())
      .then((result) => {
        let price = kanapQuantity*result.price;
        cartPrice += price;
        console.log(cartPrice);
        document.getElementById('totalPrice').innerText = cartPrice;
      error => {
        console.log(error);
      }
    })
  })
}
window.addEventListener("load", price);

// Affiche la quantité de produits
function quantity(){
  let itemQuantity = 0;
  let cart = JSON.parse(localStorage.getItem("merch"));
  cart.forEach(function(item){
    let kanapQuantity = parseInt(item[2]);
    itemQuantity += kanapQuantity;
    console.log(kanapQuantity);
    document.getElementById('totalQuantity').innerText = itemQuantity;
  })
}
window.addEventListener("load", quantity);
