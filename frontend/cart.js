function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem('ddf_cart')||'[]');
  let existing = cart.find(item => item.name === name);
  if(existing){ existing.quantity++; }
  else { cart.push({name, price, quantity:1}); }
  localStorage.setItem('ddf_cart', JSON.stringify(cart));
  alert(name + ' added to basket!');
  updateCartCount();
}

function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('ddf_cart')||'[]');
  const count = cart.reduce((acc,it)=>acc+it.quantity,0);
  const el = document.getElementById('cart-count');
  if(el) el.innerText = count;
}
updateCartCount();
