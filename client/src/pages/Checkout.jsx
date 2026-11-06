
// Imports useState to manage the order confirmation message
import { useState } from 'react'

// Imports checkout page styling
import './Checkout.css'

// Imports Link to navigate back to the homepage
import { Link } from 'react-router-dom'

// Receives cartItems from the App component through props
function Checkout({ cartItems }) {

  // Tracks whether the customer has submitted the checkout form
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculates the total price of all products in the cart
  const totalPrice = cartItems.reduce((total, item) => {

    // Removes the rupee symbol and commas from the product price
    const numericPrice = Number(item.price.replace(/[₹,]/g, ""));

    // Gets the product quantity, using 1 if quantity is unavailable
    const quantity = item.quantity || 1;

    // Adds the current product's total price to the order total
    return total + numericPrice * quantity;

  }, 0);

  // Shows a message when the customer has no products to checkout
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page empty-checkout">

        {/* Displays the empty cart heading */}
        <h1>Your Cart is Empty 🛒</h1>

        {/* Explains why checkout cannot continue */}
        <p>Please add some products before proceeding to checkout.</p>

        {/* Takes the customer back to the homepage */}
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    // Main checkout page
    <div className="checkout-page">

      {/* Page heading */}
      <h1>Checkout</h1>
      <p>Complete your order here.</p>

      {/* Checkout form groups customer details and order summary */}
      <form
        onSubmit={(event) => {

          // Prevents the browser from refreshing the page
          event.preventDefault();

          // Displays the order confirmation message
          setOrderPlaced(true);
        }}
      >

        {/* Customer details section */}
        <div className="checkout-container">

          {/* Form heading */}
          <h2>Customer Details</h2>

          {/* Customer name field */}
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>

            <input
              type="text"
              id="customerName"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Customer email field */}
          <div className="form-group">
            <label htmlFor="customerEmail">Email Address</label>

            <input
              type="email"
              id="customerEmail"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Customer phone number field */}
          <div className="form-group">
            <label htmlFor="customerPhone">Phone Number</label>

            <input
              type="tel"
              id="customerPhone"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Delivery address field */}
          <div className="form-group">
            <label htmlFor="customerAddress">Delivery Address</label>

            <textarea
              id="customerAddress"
              placeholder="Enter your complete delivery address"
              rows="4"
              required
            />
          </div>

          {/* Customer city field */}
          <div className="form-group">
            <label htmlFor="customerCity">City</label>

            <input
              type="text"
              id="customerCity"
              placeholder="Enter your city"
              required
            />
          </div>

          {/* Customer PIN code field */}
          <div className="form-group">
            <label htmlFor="customerPincode">PIN Code</label>

            <input
              type="text"
              id="customerPincode"
              placeholder="Enter your 6-digit PIN code"
              minLength="6"
              maxLength="6"
              pattern="[0-9]{6}"
              required
            />
          </div>

        </div>

        {/* Order summary section */}
        <div className="order-summary">

          {/* Order summary heading */}
          <h2>Order Summary</h2>

          {/* Displays each product in the cart */}
          {cartItems.map((item, index) => (
            <div className="summary-item" key={`${item.name}-${index}`}>

              {/* Displays product name */}
              <h3>{item.name}</h3>

              {/* Displays product price and quantity */}
              <p>
                {item.price} × {item.quantity || 1}
              </p>

            </div>
          ))}

          {/* Displays the final combined order amount */}
          <h3 className="summary-total">
            Total Amount: ₹{totalPrice.toLocaleString("en-IN")}
          </h3>

          {/* Submits the checkout form after browser validation */}
          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>

          {/* Displays confirmation after frontend form submission */}
          {orderPlaced && (
            <div className="order-success">
              <h2>🎉 Order Placed Successfully!</h2>
              <p>Thank you for shopping with ShopNest.</p>
            </div>
          )}

        </div>

      </form>

    </div>
  );
}

// Makes Checkout available for use in App.jsx
export default Checkout;
