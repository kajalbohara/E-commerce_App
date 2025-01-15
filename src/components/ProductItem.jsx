// Import React and its dependencies
import React from 'react';
// Import the Link component from React Router
import { Link } from 'react-router-dom';
// Import the useDispatch hook from React Redux
import { useDispatch } from 'react-redux';
// Import the addToCart action creator from the cartActions file
import { addToCart } from '../redux/actions/cartActions';

// Define the ProductItems component
const ProductItems = ({ product, showAddToCart }) => {
  // Use the useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Define the handleAddToCart function
  const handleAddToCart = () => {
    // Dispatch the addToCart action to add the product to the cart
    dispatch(addToCart(product));
  };

  // Render the component
  return (
    // Return the product item container
    <>
   
    <div className="product__item">
      
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: ${product.price.toFixed(0)}</p>
      <Link to={`/product/${product.id}`} className="details-button">
        View Details
      </Link>
      {/*       // Display the "Add to Cart" button if showAddToCart is true*/}
      {showAddToCart && (
        <button onClick={handleAddToCart} className="add-cart">    
          Add to Cart
        </button>
      )}
    </div>
    </>
  );
};

// Export the ProductItems component
export default ProductItems;