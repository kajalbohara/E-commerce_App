import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import the removeFromCart and adjustQuantity action creators from the cartActions file
import { removeFromCart, adjustQuantity } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Use the useNavigate hook to navigate to other routes
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  // Use the useSelector hook to select the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.05;
  const grandTotal = subtotal - discount;

  // Use the useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    alert(`Order confirmed! You have chosen to pay using ${method}.`);
    // Set the showCheckout state to false
    setShowCheckout(false);
    window.location.href = '/';
  };

  const handleRemoveFromCart = (id) => {
    // Dispatch the removeFromCart action to remove the item from the cart
    dispatch(removeFromCart(id));
  };

  const handleAdjustQuantity = (id, quantity) => {
    // Dispatch the adjustQuantity action to adjust the quantity of the item in the cart
    dispatch(adjustQuantity(id, quantity));
  };

  return (
    <div className="mycart">
      <div className="cartdescp">
        <div className="carthead">
          <h2>Cart</h2>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart_products">
                <img src={item.thumbnail} alt={item.title} className="cart_products-image" />
                <div className="cart_products-info">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price.toFixed(0)} each</p>
                  <div className="cart_products-quantity">
                    <button onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}> - </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}> + </button>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
              <p>Discount (5%): <span>-${discount.toFixed(2)}</span></p>
              <p>Grand Total: <span>${grandTotal.toFixed(2)}</span></p>
              <button className="buy-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;