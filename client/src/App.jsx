
// Imports navigation tools from React Router
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// Imports hooks to manage state and run side effects
import { useState, useEffect } from 'react'

// Imports CSS styling
import './App.css'

// Imports reusable ProductCard component
import ProductCard from './ProductCard'

// Imports product image
import smartwatch from './assets/smartwatch.png.webp'

// Imports different website pages
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetails'

function App() {

  // Reads information about the current navigation
  const location = useLocation();

  // Retrieves the selected product passed from ProductCard
  const selectedProduct = location.state?.product;

 // Loads previously saved cart products from localStorage
const [cartItems, setCartItems] = useState(() => {
  try {
    // Retrieves saved cart data from the browser
    const savedCart = localStorage.getItem("shopnest-cart");

    // Converts saved JSON text into a JavaScript array
    // Converts saved JSON text into a JavaScript value
const parsedCart = savedCart ? JSON.parse(savedCart) : [];

// Ensures that the saved data is actually an array
return Array.isArray(parsedCart) ? parsedCart : [];

  } catch (error) {
    // Returns an empty cart if saved data cannot be read
    console.error("Unable to load saved cart:", error);
    return [];
  }
});

  // Saves cart products whenever cartItems changes
  useEffect(() => {

    // Converts the cart array into JSON text and saves it
    localStorage.setItem("shopnest-cart", JSON.stringify(cartItems));

  }, [cartItems]);

  // Calculates the total number of products in the cart
const totalCartItems = cartItems.reduce(
  (total, item) => total + (item.quantity || 1),
  0
);

  // Stores the text entered by the customer in the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // Stores the search query after the customer clicks Search
  const [submittedSearch, setSubmittedSearch] = useState("");

  // Converts the submitted search text into lowercase
  // so searches are not affected by capital letters
  const normalizedSearch = submittedSearch.toLowerCase();

  // Checks whether each product matches the submitted search
  const filteredProducts = [
    {
      name: "Wireless Headphones",
      price: "₹1,499",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
      name: "Smart Watch",
      price: "₹2,999",
      image: smartwatch
    }
  ].filter((product) =>
    product.name.toLowerCase().includes(normalizedSearch)
  );

  // Adds the selected product to the shopping cart
  // Adds a product to the cart or increases its quantity
const addToCart = (product) => {
  setCartItems((previousCart) => {

    // Checks whether the product already exists in the cart
    const existingProduct = previousCart.find(
      (item) => item.name === product.name
    );

    // If the product exists, increase its quantity
    if (existingProduct) {
      return previousCart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    // If it is a new product, add it with quantity 1
    return [...previousCart, { ...product, quantity: 1 }];
  });
};
  // Removes the selected product from the shopping cart
  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((item, i) => i !== index));
  };

  // Updates the quantity of a selected cart product
const updateQuantity = (index, change) => {

  // Uses the latest cart state to avoid outdated values
  setCartItems((previousCart) =>

    // Checks every product in the cart
    previousCart.map((item, i) =>

      // Updates only the selected product
      i === index
        ? {
            ...item,

            // Increases or decreases quantity without going below 1
            quantity: Math.max(1, (item.quantity || 1) + change)
          }
        : item
    )
  );
};

  return (
    <Routes>

      {/* HOMEPAGE ROUTE */}
      <Route
        path="/"
        element={
          <div className="shopnest" id="home">

            {/* Navigation Bar */}
            <nav className="navbar">
              <h2 className="logo">ShopNest.</h2>

             {/* Navigation links for different homepage sections */}
<div className="nav-links">
  {/* Scrolls to the top of the homepage */}
  <a href="#home">Home</a>

  {/* Scrolls to the featured products section */}
  <a href="#products">Products</a>

  {/* Scrolls to the footer/about section */}
  <a href="#about">About</a>
</div>

              {/* Displays the current number of cart products */}
              <Link to="/cart" className="cart-button">
                Cart 🛒 ({totalCartItems})
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for products..."

                // Displays the current search text
                value={searchTerm}

                // Updates searchTerm whenever the customer types
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              {/* Saves the final search text when the customer clicks Search */}
              <button onClick={() => setSubmittedSearch(searchTerm.trim())}>
                Search
              </button>

              {/* Clears the search and displays all products again */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSubmittedSearch("");
                }}
              >
                Clear Search
              </button>
            </div>

            {/* Lesson 1: Welcome Section */}
            <main className="welcome">
              <h1>ShopNest — Shop Smarter, Live Better.</h1>
              <p>Your one-stop online shopping destination.</p>
            </main>

            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
                <h1>Discover Your Next Favourite Thing</h1>

                <p>
                  Explore amazing products at great prices.
                  Shopping made simple with ShopNest.
                </p>

                {/* Takes customers directly to the featured products section */}
<button
  onClick={() => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  }}
>
  Shop Now
</button>
              </div>
            </section>

            {/* Shop by Categories */}
            <section className="categories">
              <h2>Shop by Categories</h2>

              <div className="category-container">

                <div className="category-card">
                  <h3>Electronics</h3>
                  <p>Explore gadgets and devices</p>
                </div>

                <div className="category-card">
                  <h3>Fashion</h3>
                  <p>Discover your style</p>
                </div>

                <div className="category-card">
                  <h3>Home & Kitchen</h3>
                  <p>Make your home beautiful</p>
                </div>

                <div className="category-card">
                  <h3>Accessories</h3>
                  <p>Complete your everyday look</p>
                </div>

              </div>
            </section>

            {/* Featured Products Section */}
            <section className="products" id="products">
              <h2>Featured Products</h2>

              <div className="product-container">

                {/* Displays products matching the customer's search */}
                {/* Shows matching products or a message if none are found */}
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.name}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      addToCart={addToCart}
                    />
                  ))
                ) : (
                  <p className="no-products">
                    No products found. Try another search!
                  </p>
                )}

              </div>
            </section>

            {/* Footer Section */}
            <footer className="footer" id="about">

              <div className="footer-brand">
                <h2>ShopNest.</h2>
                <p>Shop smarter, live better.</p>
              </div>

              <div className="footer-links">
                <h3>Quick Links</h3>
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">About</a>
              </div>

              <div className="footer-support">
                <h3>Customer Support</h3>
                <p>Contact Us</p>
                <p>Help Center</p>
                <p>FAQs</p>
              </div>

              <div className="footer-bottom">
                <p>© 2026 ShopNest. All rights reserved.</p>
              </div>

            </footer>

          </div>
        }
      />

      {/* CART ROUTE
          Passes cart products and cart functions to Cart.jsx */}
      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        }
      />

      {/* CHECKOUT ROUTE
          Passes cart items from App to the Checkout component */}
      <Route
        path="/checkout"
        element={<Checkout cartItems={cartItems} />}
      />

      {/* PRODUCT DETAILS ROUTE
          Displays the selected product's information */}
      <Route
        path="/product"
        element={
          <ProductDetails
            product={selectedProduct}
            addToCart={addToCart}
          />
        }
      />

    </Routes>
  );
}

export default App;
