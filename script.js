// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
});
document.querySelectorAll('button, a, input').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ── NAV SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SEARCH DROPDOWN ──
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('focus', () => {
  searchDropdown.classList.add('open');
});
searchInput.addEventListener('blur', () => {
  setTimeout(() => searchDropdown.classList.remove('open'), 200);
});
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.search-dropdown-item').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
});
document.querySelectorAll('.search-dropdown-item').forEach(item => {
  item.addEventListener('click', () => {
    searchInput.value = item.textContent.trim();
    searchDropdown.classList.remove('open');
  });
});

// ── CART ──
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price, id: Date.now() });
  updateCartUI();
  showToast(name + ' added to cart!');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  // Update count badge
  document.getElementById('cartCount').textContent = cart.length;

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);

  // Update cart items list
  const container = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');

  if (cart.length === 0) {
    container.innerHTML = '';
    container.appendChild(emptyCart);
    emptyCart.style.display = 'block';
  } else {
    emptyCart.style.display = 'none';
    container.innerHTML = '';
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
      `;
      container.appendChild(el);
    });
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
}

// ── TOAST ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));