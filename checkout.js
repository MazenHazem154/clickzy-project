const itemsContainer = document.getElementById("checkoutItems")
const totalEl = document.getElementById("checkoutTotal")
const confirmBtn = document.getElementById("confirmOrder")

let cart = JSON.parse(localStorage.getItem("cart")) || []

function renderCheckout() {
  itemsContainer.innerHTML = ""
  let total = 0

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty</p>"
    totalEl.innerText = "0 EGP"
    return
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.qty
    total += itemTotal

    itemsContainer.innerHTML += `
      <div class="summary-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${itemTotal} EGP</span>
      </div>
    `
  })

  totalEl.innerText = total + " EGP"
}

renderCheckout()

const fields = [
  { name: "firstName", pattern: /^[A-Za-z]{2,}$/ },
  { name: "lastName", pattern: /^[A-Za-z]{2,}$/ },
  { name: "username", pattern: /^@[A-Za-z0-9_]{3,}$/ },
  { name: "email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  { name: "address", pattern: /^.{5,}$/ },
  { name: "zip", pattern: /^[0-9]{3,10}$/ },
  { name: "cardName", pattern: /^[A-Za-z ]{3,}$/ },
  { name: "cardNumber", pattern: /^[0-9]{16}$/ },
  { name: "expiry", pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/ },
  { name: "cvv", pattern: /^[0-9]{3,4}$/ }
]

confirmBtn.addEventListener("click", () => {
  let valid = true

  fields.forEach(f => {
    const input = document.querySelector(`input[name="${f.name}"]`)
    const field = input.closest(".field")

    if (!f.pattern.test(input.value.trim())) {
      field.classList.add("error")
      valid = false
    } else {
      field.classList.remove("error")
    }
  })

  if (!valid) return

  localStorage.removeItem("cart")
  window.location.href = "success.html"
})

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    input.closest(".field")?.classList.remove("error")
  })
})
