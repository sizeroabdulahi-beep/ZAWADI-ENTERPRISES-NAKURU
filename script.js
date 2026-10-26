
const WHATSAPP_NUMBER = "254700000000";
// Replace the number above with your own Kenyan number.
// Use country code 254, without the leading 0.

const products = [
  {name:"Smartphone",category:"Phones",price:14999,
   image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"},
  {name:"Wireless Earbuds",category:"Electronics",price:1299,
   image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"},
  {name:"Fast Charging Cable",category:"Electronics",price:350,
   image:"https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=600&q=80"},
  {name:"Sport Sneakers",category:"Fashion",price:2499,
   image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"},
  {name:"Classic Watch",category:"Fashion",price:1799,
   image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"},
  {name:"Desk Lamp",category:"Home",price:1399,
   image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"},
  {name:"Headphones",category:"Electronics",price:1899,
   image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"},
  {name:"Power Bank",category:"Electronics",price:2199,
   image:"https://images.unsplash.com/photo-1609592424843-5b1f6c0c8d8d?auto=format&fit=crop&w=600&q=80"}
];

let cart = [];
let category = "All";

function renderProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const visible = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search)
  );

  document.getElementById("grid").innerHTML = visible.map(p => `
    <article class="product">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p class="price">KSh ${p.price.toLocaleString()}</p>
      <button onclick="addToCart('${p.name}')">Add to cart +</button>
    </article>
  `).join("");
}

function filterProducts(value) {
  category = value;
  renderProducts();
  document.getElementById("products").scrollIntoView();
}

function addToCart(name) {
  const product = products.find(p => p.name === name);
  cart.push(product);
  document.getElementById("count").textContent = cart.length;
}

function showCart() {
  document.getElementById("cart").style.display = "block";
  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map(p => `<p>${p.name} — KSh ${p.price.toLocaleString()}</p>`).join("")
    : "<p>Your cart is empty.</p>";

  const total = cart.reduce((sum,p) => sum + p.price,0);
  document.getElementById("total").textContent =
    "KSh " + total.toLocaleString();
}

function hideCart() {
  document.getElementById("cart").style.display = "none";
}

function checkout() {
  if (!cart.length) {
    alert("Add a product to your cart first.");
    return;
  }

  const total = cart.reduce((sum,p) => sum + p.price,0);
  const items = cart.map(p =>
    `${p.name} - KSh ${p.price}`
  ).join("\n");

  const message = `Hello ZAWADI! My order:\n${items}\nTotal: KSh ${total}\nPlease confirm availability and delivery.`;

  window.open(
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
}

renderProducts();
