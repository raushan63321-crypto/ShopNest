
// Imports Product Details page styling
import './ProductDetails.css'

// Imports useState to manage Add to Cart feedback
import { useState } from 'react'

// Imports Link to navigate to the Cart page
import { Link } from 'react-router-dom'

// Receives product information and addToCart function from App.jsx
function ProductDetails({ product, addToCart }) {

  // Tracks whether the product has been added to the cart
  const [addedToCart, setAddedToCart] = useState(false);

  // Displays a message if the requested product does not exist
  if (!product) {
    return (
      <div className="product-not-found">

        {/* Displays the error heading */}
        <h2>Product Not Found</h2>

        {/* Explains that the requested product is unavailable */}
        <p>Sorry, this product is unavailable.</p>

        {/* Provides navigation back to the homepage */}
        <Link to="/" className="details-cart-link">
          Back to Home
        </Link>

      </div>
    );
  }

  // Handles adding the selected product to the shopping cart
  const handleAddToCart = () => {

    // Sends the selected product to the App component
    addToCart(product);

    // Updates the button feedback
    setAddedToCart(true);
  };

  return (
    // Main product details page
    <div className="product-details-page">

      {/* Product image section */}
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product information section */}
      <div className="product-details-info">

        {/* Displays the product category */}
        <p className="product-category">ShopNest Collection</p>

        {/* Displays the product name */}
        <h1>{product.name}</h1>

        {/* Displays the product price */}
        <h2>{product.price}</h2>

        {/* Displays the product description */}
        <p className="product-description">
          Explore quality and style with this carefully selected
          ShopNest product. Designed to offer great value and
          an excellent shopping experience.
        </p>

        {/* Displays product availability */}
        <p className="product-stock">✓ In Stock</p>

        {/* Adds the selected product to the shopping cart */}
        <button
          className="details-add-button"
          onClick={handleAddToCart}
        >
          {addedToCart ? 'Added to Cart ✓' : 'Add to Cart 🛒'}
        </button>

        {/* Takes the customer directly to the shopping cart */}
        <Link to="/cart" className="details-cart-link">
          View Cart 🛒
        </Link>

      </div>
    </div>
  );
}

// Makes ProductDetails available for use in App.jsx
export default ProductDetails;
