import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { resolveProductImage } from '../../utils/imageKey';;
import './DetailProduct.css';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);
    const [isLoading, setIsLoading] = useState(!location.state?.product);
    const [error, setError] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    useEffect(() => {
        if (product) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch('/product.json');
                if (!response.ok) {
                    throw new Error('Không thể tải thông tin sản phẩm');
                }

                const data = await response.json();
                const found = data.find((item) => String(item.id) === String(id));
                if (!found) {
                    throw new Error('Sản phẩm không tồn tại');
                }

                setProduct({
                    ...found,
                    image: resolveProductImage(found.imageKey) || 'https://via.placeholder.com/500'
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id, product]);

    if (isLoading) {
        return <div className="detail-container">Đang tải chi tiết sản phẩm...</div>;
    }

    if (error) {
        return <div className="detail-container">Lỗi: {error}</div>;
    }

    if (!product) {
        return null;
    }

    return (
        <div className="detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Quay lại
            </button>

            <div className="detail-card">
                <div className="detail-image">
                    <img
                        src={product.image || 'https://via.placeholder.com/500x350'}
                        alt={product.name}
                    />
                </div>

                <div className="detail-info">
                    <h2>{product.name}</h2>
                    <p className="detail-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                    </p>

                    <div className="detail-sizes">
                        <button className="size-chip">Mới 100%</button>
                        <button className="size-chip">Bảo hành 36 tháng</button>
                        <button className="size-chip">Fullbox</button>
                    </div>

                    <div className="detail-meta">
                        <span>⭐ 5.0</span>
                        <span>Đã kiểm định chất lượng</span>
                        <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
                            🚀 Hỗ trợ giao hỏa tốc nội thành khu vực Quận 6
                        </span>
                    </div>

                    <button className="buy-now-button" onClick={() => {
                        const savedCart = localStorage.getItem('cart');
                        const cart = savedCart ? JSON.parse(savedCart) : [];
                        const existingItemIndex = cart.findIndex(item => item.id === product.id);

                        if (existingItemIndex >= 0) {
                            cart[existingItemIndex].quantity += 1;
                        } else {
                            cart.push({
                                ...product,
                                quantity: 1
                            });
                        }

                        localStorage.setItem('cart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cartUpdated'));
                        navigate('/cart');
                    }}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;