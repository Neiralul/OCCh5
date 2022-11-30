// Permet de récupérer l'URL de la page
function getCurrentURL () {
    return window.location.href;
  }
const url = getCurrentURL ();
addEventListener('load', getCurrentURL);


// Utilise l'URL de la page pour retrouver l'ID de la commande
let params = (new URL(document.location)).searchParams;
let id = params.get('orderId');
console.log(orderId);

// Affiche l'ID de la commande à l'emplacement demandé
document.getElementById('orderId').innerHTML = id;