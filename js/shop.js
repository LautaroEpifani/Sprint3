// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
// function buy(id) {
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id === id) {
//       // var product = products[i]
//       cartList.push(products[i]);
//       console.log(cartList);

//       generateCart();
//       // applyPromotionsCart();
//     }
//   }
// }

// Exercise 2
// function cleanCartList() {
//   if (cartList.length > 0) {
//     cartList.splice(0);
//   }
// }

function cleanCart() {
  if (cart.length > 0) {
    cart.splice(0);
  }
  printCart();
}

// Exercise 3
function calculateTotal() {
  // result = cartList.reduce((total, product) => total + product.price, 0 )
  resultTotal = cart.reduce(function (total, product) {
    return total + product.subtotalWithDiscount;
  }, 0);
}

// Exercise 4
// function generateCart() {
//   for (let i = 0; i < cartList.length; i++) {
//     let productInCart = cart.find((item) => item.id === cartList[i].id);

//     if (productInCart) {
//       //si ya esta en el array entonces sumar cantidad
//       productInCart.quantity++;
//       applyPromotionsCart();
//       cleanCartList();
//     } else {
//       //si no esta en el array pusheamos con quantity = 1
//       cart.push({ ...cartList[i], quantity: 1 });
//       applyPromotionsCart();
//       cleanCartList();
//     }
//   }

//   console.log(cart);
// }

// Exercise 5
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for (let i = 0; i < cart.length; i++) {
    let productInCart = cart.find((item) => item.id === cart[i].id);

    if (productInCart.name === "cooking oil" && productInCart.quantity >= 3) {
      productInCart.price = 10;
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    }

    if (
      productInCart.name === "Instant cupcake mixture" &&
      productInCart.quantity >= 10
    ) {
      productInCart.price = 5;
      productInCart.price = productInCart.price * (2 / 3);
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    } else {
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    }
  }
}

// Exercise 6
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  const modalCart = document.getElementById("cart_list");
  const totalPrice = document.getElementById("total_price");

  modalCart.innerHTML = " ";
  totalPrice.innerHTML = " ";

  calculateTotal();

  for (let i = 0; i < cart.length; i++) {
    let productInCart = cart.find((item) => item.id === cart[i].id);

    const tr = document.createElement("tr");
    tr.innerHTML = ` 
                    <th scope="row">${productInCart.name}</th>
                    <td>${productInCart.price.toFixed(2)}</td>
                    <td>${productInCart.quantity}</td>
                    <td>${productInCart.subtotalWithDiscount.toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${
                      productInCart.id
                    })" class="boton-eliminar">
                    <i class="fas fa-trash-alt"></i></button></td>
    `;

    modalCart.appendChild(tr);
  }

  const span = document.createElement("span");
  span.innerHTML = `
                     Total: $<span>${resultTotal.toFixed(2)}</span>
                    `;
  totalPrice.appendChild(span);
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
  let productInCart = cart.find((item) => item.id === id);

  if (productInCart) {
    productInCart.quantity++;
    applyPromotionsCart();
  } else {
    let product = products.find((item) => item.id === id);
    product.quantity = 1;
    cart.push(product);
    applyPromotionsCart();
  }
  console.log(cart);
}

// Exercise 8
function removeFromCart(id) {
  const item = cart.find((product) => product.id === id);

  const indice = cart.indexOf(item);

  if (item.quantity <= 1) {
    cart.splice(indice, 1);

    printCart();
  } else {
    item.quantity--;
    removePromotions();
    printCart();
  }
}

function open_modal() {
  console.log("Open Modal");

  printCart();
}

function removePromotions() {
  for (let i = 0; i < cart.length; i++) {
    let productInCart = cart.find((item) => item.id === cart[i].id);

    if (productInCart.name === "cooking oil" && productInCart.quantity < 3) {
      productInCart.price = 10.5;
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    }

    if (
      productInCart.name === "Instant cupcake mixture" &&
      productInCart.quantity < 10
    ) {
      productInCart.price = 5;
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    } else {
      productInCart.subtotalWithDiscount =
        productInCart.price * productInCart.quantity;
    }
  }
}
