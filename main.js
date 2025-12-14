function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  const itemIndex = cart.findIndex(item => item.name === name)

  if (itemIndex !== -1) {
    cart[itemIndex].qty += 1
  } else {
    cart.push({
      name,
      price,
      image,
      qty: 1
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.location.href = "cart.html"
}
