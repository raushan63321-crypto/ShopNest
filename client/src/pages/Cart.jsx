import './Cart.css'
import { Link } from 'react-router-dom'

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  
// Calculates the total price of all products in the cart
const totalPrice = cartItems.reduce((total, item) => {

  // Removes the rupee symbol and commas from the product price
  const numericPrice = Number(item.price.replace(/[₹,]/g, ""));

  // Gets the product quantity, using 1 if quantity is unavailable
  const quantity = item.quantity || 1;

  // Adds the current product's total price to the cart total
  return total + numericPrice * quantity;

}, 0);

  return (
     <div className="cart-page">
      <h1>My Shopping Cart</h1>

     {cartItems.length === 0 ? (
  <div className="empty-cart">

    {/* Displays a message when the cart is empty */}
    <p>Your cart is empty.</p>

    {/* Takes the customer back to the homepage */}
    <Link to="/" className="continue-shopping">
      Continue Shopping
    </Link>

  </div>
) : (
        <div>
          {cartItems.map((item, index) => (
           <div className="cart-item" key={`${item.name}-${index}`}>
              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
             <div className="quantity-control">
  <button onClick={() => updateQuantity(index, -1)}>
    -
  </button>

  {/* Displays the product quantity, defaulting to 1 if unavailable */}
<span>{item.quantity || 1}</span>

  <button onClick={() => updateQuantity(index, 1)}>
    +
  </button>
</div>
              <button
  className="remove-button"
  onClick={() => removeFromCart(index)}
>
  Remove
</button>
            </div>
          ))}
          <h2 className="cart-total">
  Total: ₹{totalPrice.toLocaleString("en-IN")}
</h2>
{/* Takes the customer to the checkout page */}
<Link to="/checkout" className="checkout-button">
  Proceed to Checkout
</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;