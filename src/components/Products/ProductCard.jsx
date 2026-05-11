import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const productsUrl = `/product.json`; 

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handleBuy = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(productsUrl);
            if (!response.ok) throw new Error('Lỗi tải dữ liệu');

            const data = await response.json();
            const matchedProduct = data.find((item) => item.id === product.id);

            navigate(`/product/${product.id}`, {
                state: { product: { ...matchedProduct, image: product.image } }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <h3 className="product-name">{product.name}</h3>
            
            {/* Đổi nhãn S M L thành chuẩn PC */}
            <div className="product-ram-ssd">
                <button className="ram-ssd-tag">Mới 100%</button>
                <button className="ram-ssd-tag">Chính hãng</button>
            </div>
            
            <div className="product-pricing">
                <div className="current-price">{formatPrice(product.price)}</div>
            </div>
            
            <button className="compare-button" onClick={handleBuy} disabled={isLoading}>
                {isLoading ? 'Đang tải...' : 'Mua Ngay'}
            </button>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default ProductCard;