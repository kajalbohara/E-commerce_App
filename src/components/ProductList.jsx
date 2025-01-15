import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import useProducts from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');  // Initialize the search term state

    const { data: products, loading, error } = useProducts('https://dummyjson.com/products');  // Use the useProducts hook to fetch products from the API

    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
  
    // Use the useMemo hook to memoize the filtered products
    const filteredProducts = useMemo(() => {
            // Filter the products based on the search term

        return products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));      // Dispatch the addToCart action to add the product to the cart

    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="productlist_main">
            <div className="searchbar">
                <input
                    type="text"
        
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               
            </div>
            <div className="product-list">      
                {/*// Check if there are any products to display*/}

                {filteredProducts.length === 0 ? (
                    <p>No items found matching your search.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product__item">
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">Price: ${product.price.toFixed(0)}</p>
                            {cartItems.find((item) => item.id === product.id) ? (
                                <button className="add-cart" disabled>
                                    Added to Cart
                                </button>
                            ) : (
                                <button
                                    className="add-cart"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddToCart(product);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;