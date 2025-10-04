function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('ddf_cart')||'[]');
  const count = cart.reduce((s,i)=>s+i.quantity,0);
  document.querySelectorAll('#cart-count').forEach(el=>el.innerText=count);
}

function addToCart(item){
  const cart = JSON.parse(localStorage.getItem('ddf_cart')||'[]');
  const found = cart.find(i=>i.id===item.id);
  if(found){ found.quantity += item.quantity; } else { cart.push(item); }
  localStorage.setItem('ddf_cart', JSON.stringify(cart));
  updateCartCount();
  alert(item.name + ' added to basket');
}

document.addEventListener('DOMContentLoaded', ()=>{updateCartCount();});
