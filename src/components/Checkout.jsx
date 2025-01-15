// Checkout.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = subtotal * 0.05;
    const grandTotal = subtotal - discount;
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        if (name && address && paymentMethod) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="checkout_main">
            <div className="check-head">
                <h2>Checkout</h2>
            </div>
            <div className="check-form">
                <form>
                    <div className="form-grp">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-grp">
                        <label>Address:</label>
                        <textarea
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-grp">
                        <label>Payment Method:</label>
                        <select
                            name="payment"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="credit">Credit Card</option>
                            <option value="debit">Debit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div className="form-grp">
                        <label>Amount to Pay:</label>
                        <p>${grandTotal.toFixed(2)}</p>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="placeorder" onClick={handlePlaceOrder}>Place Order</button>
                        <Link to="/cart" className="add-cart">Go to Cart</Link>
                    </div>
                    {success && (
                        <div className="success">
                            <p>Your order has been placed successfully!</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Checkout;