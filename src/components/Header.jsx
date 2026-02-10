import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Coffee, Wallet, Anchor } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-item active' : 'nav-item';
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <Anchor className="logo-icon" size={24} />
                    <span className="logo-text">MukhoTrip</span>
                </Link>

                <nav className="nav">
                    <ul className="nav-list">
                        <li>
                            <Link to="/" className={isActive('/')}>
                                <MapPin size={18} />
                                <span>홈</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/places" className={isActive('/places')}>
                                <Coffee size={18} />
                                <span>맛집/카페</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/budget" className={isActive('/budget')}>
                                <Wallet size={18} />
                                <span>예산</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
