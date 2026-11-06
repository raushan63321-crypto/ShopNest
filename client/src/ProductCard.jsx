
// Imports Link to navigate to the product details page
import { Link } from 'react-router-dom'

// Receives product information and the add-to-cart function from App.jsx
function ProductCard({ name, price, image, addToCart }) {

  // Creates a product object using the received information
  const product = {
    name,
    price,
    image
  };

  return (
    // Main container for an individual product
    <div className="product-card">

      {/* Clicking the image or name opens the product details page */}
      <Link
        to="/product"
        state={{ product }}
        className="product-details-link"
      >
        {/* Displays the product image */}
        <img src={image} alt={name} />

        {/* Displays the product name */}
        <h3>{name}</h3>
      </Link>

      {/* Displays the product price */}
      <p>{price}</p>

      {/* Adds the selected product to the shopping cart */}
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

// Makes ProductCard available for use in App.jsx
export default ProductCard;
