const products = [
  { name: "Nounours marron", price: 35, img: "Images/nounours1.jpg" },
  { name: "Nounours blanc", price: 45, img: "Images/nounours2.jpg" },
  { name: "Nounours", price: 65, img: "Images/nounours3.jpg" },
  { name: "panda", price: 95, img: "Images/panda.jpg" },
  { name: "pikatchu", price: 95, img: "Images/pikachu.jpg" },
  { name: "link", price: 25, img: "Images/link.jpg" },
  { name: "poule", price: 35, img: "Images/poule.jpg" },
  { name: "girafe", price: 45, img: "Images/girafe.jpg" },
  { name: "hibou", price: 45, img: "Images/hibou.jpg" },
];

const app = document.getElementById("app");
app.innerHTML = `
<section class="header">
  <h1>Ma boutique en ligne</h1>
</section>
<div class="layout">
  <div class="boxs-container"></div>
  <div class="sidebar">
    <input class="search" placeholder="Rechercher...">
    <div class="total">Total : 0 $</div>
    <div class="basket">
      <div class="demande"></div>
      <button id="Acheter">Confirmer l'achat</button>
    </div>
  </div>
</div>
`;

const container = document.querySelector(".boxs-container");
products.forEach(p => {
  const box = document.createElement("div");
  box.className = "box";
  box.dataset.name = p.name;
  box.dataset.price = p.price;
  box.innerHTML = `
    <h3>${p.name}</h3>
    <div class="image">
      <div class="prix">${p.price} $</div>
      <img src="${p.img}">
    </div>
    <div class="info">product</div>
    <div class="card">
     <div class="quantity">
       <input class="compteur" value="0" readonly>
       <div class="buttons">
         <button class="plus">+</button>
         <button class="moins">-</button>
       </div>
     </div>
     <div class="cart">🛒</div>
    </div>
  `;
  container.appendChild(box);
});

// Plus / Moins
document.querySelectorAll(".box").forEach(box => {
  let cmp = 0;
  const input = box.querySelector(".compteur");
  box.querySelector(".plus").onclick = () => {
    cmp++;
    input.value = cmp;
  };
  box.querySelector(".moins").onclick = () => {
    if (cmp > 0) cmp--;
    input.value = cmp;
  };
   
  box.resetCmp = () => { cmp = 0; input.value = 0; };
});

//total
let cartItems = {};
let total = 0;
const totalBox = document.querySelector(".total");
const demande = document.querySelector(".demande");

document.querySelectorAll(".box").forEach(box => {
  box.querySelector(".cart").onclick = () => {
    const qtyInput = box.querySelector(".compteur");
    const qty = parseInt(qtyInput.value);

    if (qty <= 0) return;

    const name = box.dataset.name;
    const price = +box.dataset.price;
    const imgUrl = box.querySelector("img").src;

    if (cartItems[name]) {
      cartItems[name].qty += qty;
      const existingLine = document.getElementById(`item-${name.replace(/\s+/g, '')}`);
      existingLine.querySelector(".item-price-qty").textContent =
        `Quantité: ${cartItems[name].qty} | Total: ${price * cartItems[name].qty} $`;
    } else {
      cartItems[name] = { qty: qty, price: price };
      const line = document.createElement("div");
      line.className = "item-row";
      line.id = `item-${name.replace(/\s+/g, '')}`;
      line.innerHTML = `
        <img src="${imgUrl}" class="item-img">
        <div class="item-details">
          <span class="item-name">${name}</span>
          <span class="item-price-qty">Quantité: ${qty} | Total: ${price * qty} $</span>
        </div>
        <button class="delete-btn">❌</button>
      `;

      // la suppression
      line.querySelector(".delete-btn").onclick = () => {
        total -= (cartItems[name].price * cartItems[name].qty);
        totalBox.textContent = "Total : " + total + " $";
        delete cartItems[name];
        line.remove();
      };

      demande.appendChild(line);
    }

    total += price * qty;
    totalBox.textContent = "Total : " + total + " $";

    // تصفير العداد بعد الإضافة
    box.resetCmp();
  };
});

// Search
document.querySelector(".search").oninput = e => {
  const v = e.target.value.toLowerCase();
  document.querySelectorAll(".box").forEach(b => {
    const productName = b.dataset.name.toLowerCase();
    b.style.display = productName.startsWith(v) ? "block" : "none";
  });
};
