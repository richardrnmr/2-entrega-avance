let cart = [];

// Función para cargar los productos desde el archivo JSON
function loadProducts() {
  fetch('../productos.json')
    .then(response => response.json())  // Convertir la respuesta en formato JSON
    .then(products => {
      displayProducts(products);  // Mostrar los productos en la interfaz
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la página
function displayProducts(products) {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';  // Limpiar cualquier contenido previo

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', '${product.description}', ${product.price}, '${product.image}')">Agregar al carrito</button>
    `;
    productsDiv.appendChild(productCard);
  });
}

// Función para agregar un producto al carrito
function addToCart(id, name, description, price, image) {
  let existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, name, description, price, image, quantity: 1 });
  }

  saveCart();  // Guardar el carrito actualizado
  updateCartUI();  // Actualizar la interfaz del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();  // Guardar el carrito actualizado
  updateCartUI();  // Actualizar la interfaz
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(productId) {
  let product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += 1;
    saveCart();  // Guardar el carrito actualizado
    updateCartUI();  // Actualizar la interfaz
  }
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(productId) {
  let product = cart.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    saveCart();  // Guardar el carrito actualizado
    updateCartUI();  // Actualizar la interfaz
  }
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>El carrito está vacío.</p>';
    cartTotal.textContent = '0.00';
    return;
  }

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>$${item.price} x ${item.quantity}</p>
      </div>
      <div>
        <button onclick="removeFromCart(${item.id})">Eliminar</button>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button onclick="decreaseQuantity(${item.id})">-</button>
      </div>
    `;
    cartItemsDiv.appendChild(cartItemDiv);
  });

  const total = getCartTotal();
  cartTotal.textContent = total.toFixed(2);
}

// Función para obtener el total del carrito
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Guardar carrito en localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage al cargar la página
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  updateCartUI();
}

// Cargar productos al cargar la página
window.onload = function() {
  loadCart();  // Cargar carrito
  loadProducts();  // Cargar productos desde el archivo JSON
};
