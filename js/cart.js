// cart.js

let cart = [];

// Función para agregar un producto al carrito
function addToCart(product) {
  // Buscar si el producto ya está en el carrito
  let existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // Si el producto ya existe, aumentar la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si no existe, agregarlo al carrito
    cart.push({...product});
  }
  
  updateCartUI();  // Actualiza la interfaz del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();  // Actualiza la interfaz después de eliminar
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(productId) {
  let product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += 1;
    updateCartUI();
  }
}

// Función para disminuir la cantidad de un producto
function decreaseQuantity(productId) {
  let product = cart.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    updateCartUI();
  }
}

// Función para actualizar la interfaz del carrito
function updateCartUI() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Limpiar carrito actual
  cartItemsDiv.innerHTML = '';

  // Si el carrito está vacío
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>El carrito está vacío.</p>';
    cartTotal.textContent = '0.00';
    return;
  }

  // Mostrar los productos en el carrito
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

  // Calcular el total
  const total = getCartTotal();
  cartTotal.textContent = total.toFixed(2);  // Mostrar total con dos decimales
}

// Función para obtener el total del carrito
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
