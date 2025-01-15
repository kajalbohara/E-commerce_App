// Import React and its dependencies
import React from 'react';
// Import the useDispatch hook from React Redux
import { useDispatch } from 'react-redux';
// Import the removeFromCart and adjustQuantity action creators from the cartActions file
import { removeFromCart, adjustQuantity } from '../redux/actions/cartActions';

// Define the CartItem component
const CartItem = ({ item }) => {
  // Use the useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Define the handleRemoveFromCart function
  const handleRemoveFromCart = () => {
    // Dispatch the removeFromCart action to remove the item from the cart
    dispatch(removeFromCart(item.id));
  };

  // Define the handleQuantityChange function
  const handleQuantityChange = (quantity) => {
    // If the quantity is less than 1, set it to 1
    if (quantity < 1) {
      dispatch(adjustQuantity(item.id, 1));
    } else {
      // Dispatch the adjustQuantity action to adjust the quantity of the item in the cart
      dispatch(adjustQuantity(item.id, quantity));
    }
  };

  return (
    <div className="cart_products">
      <img src={item.thumbnail} alt={item.title} className="cart_products-image" />
      <div className="cart_products-info">
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(0)}</p>
        <div className="cart_products-quantity">
          <button onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity === 1}> - </button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)}> + </button>
        </div>
        <button onClick={handleRemoveFromCart}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;