const container = document.getElementById("cartItems")
const emptyCart = document.getElementById("emptyCart")
const totalPrice = document.getElementById("totalPrice")

let cart = JSON.parse(localStorage.getItem("cart")) || []

function renderCart() {
  container.innerHTML = ""
  let total = 0

  if (cart.length === 0) {
    emptyCart.style.display = "block"
    return
  }

  emptyCart.style.display = "none"

cart.forEach((item, index) => {
    total += item.price * item.qty

    container.innerHTML += `
  <div class="cart-item">
<img src="imgs/${item.image}">
    <div class="cart-info">
      <h3>${item.name}</h3>
      <span>${item.price} EGP</span>
    </div>

    <div class="cart-controls">
      <button onclick="updateQty(${index}, -1)">−</button>
      <span>${item.qty}</span>
      <button onclick="updateQty(${index}, 1)">+</button>
    </div>
  </div>
`

    
  })

  totalPrice.innerText = total + " EGP"
}

renderCart()
function updateQty(index, change) {
  cart[index].qty += change

  if (cart[index].qty <= 0) {
    cart.splice(index, 1)
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  renderCart()
}
