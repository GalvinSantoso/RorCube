// add to cart
let cart = [];

const returnCartIsi = function (name, price, img) {
  return `          
  <li class="order-product-list">
  <div class="order-product-img"><img src="${img}" alt="" /></div>
  <div class="order-product-desc">
    <h4>${name}</h4>
    <div class="size">
      <span>Size:</span>
      56mm
    </div>
    <div class="price">${price}</div>
  </div>
  <div class="order-delete">
    <i class="fas fa-trash"></i>
  </div>
</li>`;
};

if (cart.length == 0) {
  const orderProduct = document.querySelector('.order-product');
  orderProduct.innerHTML = '<span class="no-item">there\'s no item here</span>';
}

const deleteCart = function () {
  const orderProduct = document.querySelector('.order-product');
  orderProduct.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.parentElement.classList.contains('fa-trash')) {
      let cartItem = e.target.parentElement.parentElement;
      cartItem = cartItem.parentElement;
      const cubePrice = cartItem.querySelector('.price').innerHTML.split('$');
      console.log(cubePrice);
      const totalPrice = document.querySelector('.total-price');
      let price = totalPrice.innerHTML.split('$');
      const priceIsi = parseFloat(price[1]) - parseFloat(cubePrice[1]);
      totalPrice.innerHTML = `$${(Math.round(priceIsi * 100) / 100).toFixed(2)}`;
      cartItem.style.display = 'none';
      cart = cart.filter((item) => {
        const itemName = item.querySelector('.cube-card-desc h5').innerHTML;
        const cartItemName = cartItem.querySelector('.order-product-desc h4').innerHTML;
        return itemName != cartItemName;
      });
      console.log(cart);
    }
  });
};

const addToCart = function () {
  const cubeCardsButton = Array.from(document.querySelectorAll('.cube-card .addCard'));
  cubeCardsButton.forEach((btn) => {
    btn.addEventListener('click', function () {
      const card = this.parentElement.parentElement;
      cart.push(card);
      const orderProduct = document.querySelector('.order-product');
      const totalPrice = document.querySelector('.total-price');
      let priceIsi = 0;
      let cartIsi = '';
      cart.forEach((value) => {
        const cardImg = value.querySelector('.cube-card-img img').getAttribute('src');
        const cardName = value.querySelector('.cube-card-desc h5').innerHTML;
        const cardPrice = value.querySelector('.cube-price').innerHTML;
        cartIsi += returnCartIsi(cardName, cardPrice, cardImg);
        const price = cardPrice.split('$');
        priceIsi += parseFloat(price[1]);
      });
      orderProduct.innerHTML = cartIsi;
      totalPrice.innerHTML = `$${(Math.round(priceIsi * 100) / 100).toFixed(2)}`;
    });
  });
};

// Cube Card
const returnCard = (cube) => {
  return `            
  <div class="cube-card">
    <div class="cube-card-img">
      <img src="${cube.img}" alt="" />
    </div>
    <div class="cube-card-desc">
      <div class="stars">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <h5>${cube.name}</h5>
      <div class="cube-price">$${cube.price}</div>
      <div class="cube-model">
        <img src="./img/sticker.png" alt="Model Sticker" />
        <img src="./img/stickerless.png" alt="Model Stickerless" />
      </div>
      <button class="addCard">Add To Cart</button>
    </div>
  </div>`;
};

function changeType() {
  let cubeType = document.getElementById('CubeType');
  fetch('http://localhost:3000/' + cubeType.value)
    .then((response) => response.json())
    .then((data) => {
      let cubeCard = '';
      data.forEach((cube) => {
        cubeCard += returnCard(cube);
      });
      shopCubeIsi.innerHTML = cubeCard;
      addToCart();
      deleteCart();
    });
}

const shopCubeIsi = document.querySelector('.shop-cube-isi');

let cubeType = document.getElementById('CubeType');

fetch('http://localhost:3000/' + cubeType.value)
  .then((response) => response.json())
  .then((data) => {
    let cubeCard = '';
    data.forEach((cube) => {
      cubeCard += returnCard(cube);
    });
    shopCubeIsi.innerHTML = cubeCard;
    addToCart();
    deleteCart();
  });
// cart open and close
const cartButton = document.querySelector('.shopping-cart');
console.log(cartButton);
const orderClose = document.querySelector('.order-close');
const order = document.querySelector('.order');

cartButton.addEventListener('click', function () {
  order.style.display = 'block';
});

orderClose.addEventListener('click', function () {
  order.style.animation = 'slideOut 1s ease-in forwards';
  setTimeout(() => {
    order.style.display = 'none';
    order.style.animation = 'slideIn 1s ease-out forwards';
  }, 1000);
});
