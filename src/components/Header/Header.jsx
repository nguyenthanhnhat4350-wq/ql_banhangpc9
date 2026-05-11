import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            const savedCart = localStorage.getItem('cart');
            if (!savedCart) {
                setCartCount(0);
            } else {
                try {
                    const cart = JSON.parse(savedCart);
                    const totalItems = cart.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                    );
                    setCartCount(totalItems);
                } catch (error) {
                    console.error('Lỗi đọc giỏ hàng:', error);
                    setCartCount(0);
                }
            }
        };

        const updateCurrentUser = () => {
            const savedUser = localStorage.getItem('currentUser');
            if (!savedUser) {
                setCurrentUser(null);
                return;
            }

            try {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
            } catch (error) {
                console.error('Lỗi đọc thông tin người dùng:', error);
                setCurrentUser(null);
            }
        };

        updateCartCount();
        updateCurrentUser();

        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('userUpdated', updateCurrentUser);
        window.addEventListener('storage', () => {
            updateCartCount();
            updateCurrentUser();
        });

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('userUpdated', updateCurrentUser);
            window.removeEventListener('storage', () => {
                updateCartCount();
                updateCurrentUser();
            });
        };
    }, []);

    // Đổi nội dung menu Dropdown thành Linh kiện
    const pcMenuItems = [
        { text: 'Vi xử lý (CPU)', href: '/linh-kien/cpu' },
        { text: 'Bo mạch chủ (Mainboard)', href: '/linh-kien/mainboard' },
        { text: 'Card màn hình (VGA)', href: '/linh-kien/vga' },
        { text: 'Ổ cứng SSD/HDD', href: '/linh-kien/o-cung' }
    ];

    return (
        <header className="phuclong-header">
            {/* Top Section: Header Bar */}
            <div className="header-top-bar">
                <div className="header-top-content">
                    {/* Left: Hotline Info */}
                    <div className="header-delivery-info">
                        <span className="delivery-text">HOTLINE MUA HÀNG</span>
                        <i className="fas fa-phone delivery-icon"></i>
                        <span className="delivery-phone">1800 6779</span>
                        <div className="delivery-scooter">
                            <i className="fas fa-truck-fast"></i>
                        </div>
                    </div>

                    {/* Right: User Actions */}
                    <div className="header-user-actions">
                        <button
                            className="login-link"
                            onClick={() => navigate('/login')}
                        >
                            {currentUser ? (currentUser.name || currentUser.user) : 'Đăng nhập'}
                        </button>
                        <span className="action-separator">|</span>
                        <div className="language-selector">
                            <span className="lang-active">VN</span>
                            <span className="lang-separator">|</span>
                            <span className="lang-option">EN</span>
                        </div>
                        <button
                            className="cart-button"
                            onClick={() => navigate('/cart')}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span>Giỏ hàng</span>
                            <span className="cart-badge">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Navigation Bar */}
            <nav className="header-navigation">
                <div className="nav-content">
                    <a href="/" className="nav-link">TRANG CHỦ</a>

                    {/* LINH KIỆN PC với Dropdown */}
                    <div
                        className="nav-item-with-dropdown"
                        onMouseEnter={() => setHoveredMenu('linhkien')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        <a href="/linh-kien" className={`nav-link ${hoveredMenu === 'linhkien' ? 'active' : ''}`}>
                            LINH KIỆN PC
                        </a>
                        {hoveredMenu === 'linhkien' && (
                            <div className="dropdown-menu">
                                {pcMenuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="dropdown-item"
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="/laptop" className="nav-link">LAPTOP MỚI</a>
                    <a href="/phu-kien" className="nav-link">PHỤ KIỆN - GEAR</a>
                    <a href="/products" className="nav-link">TẤT CẢ SẢN PHẨM</a>
                    <a href="/khuyen-mai" className="nav-link">KHUYẾN MÃI</a>
                    <a href="/build-pc" className="nav-link">XÂY DỰNG CẤU HÌNH</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;