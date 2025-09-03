// DOM Elements
const searchBtn = document.getElementById("search-btn");
const closeSearch = document.getElementById("close-search");
const searchModal = document.getElementById("search-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const cartCount = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const emptyCartMessage = document.querySelector(".empty-cart-message");

// Cart Data
let cart = [];
let total = 0;

// Search Functionality
searchBtn.addEventListener("click", () => {
  searchModal.style.display = "flex";
});

closeSearch.addEventListener("click", () => {
  searchModal.style.display = "none";
});

// Cart Functionality
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Add to Cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const productName = productCard.querySelector(".product-title").textContent;
    const productPrice =
      productCard.querySelector(".product-price").textContent;
    const productImage = productCard.querySelector(".product-img").src;

    // Add to cart array
    cart.push({
      name: productName,
      price: parseFloat(productPrice.replace("₹", "")),
      image: productImage,
    });

    // Update cart UI
    updateCart();

    // Show cart sidebar
    cartSidebar.classList.add("open");
  });
});

// Update Cart
function updateCart() {
  // Update cart count
  cartCount.textContent = cart.length;

  // Clear cart items
  cartItems.innerHTML = "";

  // Reset total
  total = 0;

  // Check if cart is empty
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
    cartTotal.querySelector("span:last-child").textContent = "₹0.00";
    return;
  }

  // Add items to cart
  cart.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <img src="${item.image}" alt="${
      item.name
    }" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </div>
                `;

    cartItems.appendChild(cartItem);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.getAttribute("data-index"));
      cart.splice(index, 1);
      updateCart();
    });
  });

  // Update total
  cartTotal.querySelector("span:last-child").textContent = `₹${total.toFixed(
    2
  )}`;
}

// Recently Viewed Simulation
document.addEventListener("DOMContentLoaded", function () {
  const recentProducts = document.querySelector(".recent-products");

  // This is a simulation - in a real app, this data would come from a backend
  const recentlyViewed = [
    {
      name: "Blouse",
      price: "₹129.00",
      image:
        "https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Skirt",
      price: "₹159.00",
      image:
        "https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Jacket",
      price: "₹279.00",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dress",
      price: "₹329.00",
      image:
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Handbag",
      price: "₹459.00",
      image:
        "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Clear the placeholder content
  recentProducts.innerHTML = "";

  // Add the recently viewed items
  recentlyViewed.forEach((item) => {
    const productEl = document.createElement("div");
    productEl.className = "recent-product";
    productEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="recent-img">
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                `;
    recentProducts.appendChild(productEl);
  });
});

// Hamburger Menu Functionality
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

// Toggle menu on hamburger click
hamburgerBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // stop it from closing immediately
  navMenu.classList.toggle("active");
});

// Close menu when clicking anywhere outside
document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active") && 
      !navMenu.contains(e.target) && 
      e.target !== hamburgerBtn) {
    navMenu.classList.remove("active");
  }
});




