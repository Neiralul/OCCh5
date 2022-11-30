// Variables utilisées pour afficher les produits disponibles
let content = '';

// Permet d'afficher la liste des produits en utilisant l'API
fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then((result) => { 
      console.log(result);
      result.forEach(function (item){
      content +=  
      '<a href="./product.html?id='+item._id+'">'
      + '<article>'
      +   '<img src="'+item.imageUrl+'" alt="'+item.altTxt+'">'
      +   '<h3 class="productName">'+item.name+'</h3>'
      +   '<p class="productDescription">'+item.description+'</p>'
      + '</article>'
      +'</a>';
      document.getElementById('items').innerHTML= content;
  }),    
  error => {
    console.log(error);
  }
});