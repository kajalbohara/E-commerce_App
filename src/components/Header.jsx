import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">ShoppyGlobe</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <Link to="/cart">
                            <FaShoppingCart />  ({totalCount})
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
