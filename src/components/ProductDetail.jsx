import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            
            dispatch(addToCart(product));
            alert('Item added to cart successfully!');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="details-product">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(0)}</p>
            <button onClick={handleAddToCart} className="add-cart">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetail;