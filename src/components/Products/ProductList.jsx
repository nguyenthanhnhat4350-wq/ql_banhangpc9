import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';
import { resolveProductImage } from '../../utils/imageKey';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State lưu danh mục đang chọn
    const [selectedCategory, setSelectedCategory] = useState(0);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // Cài đặt 12 sản phẩm / 1 trang

    const categories = [
        { id: 0, name: "Tất cả sản phẩm" },
        { id: 1, name: "Vi xử lý (CPU)" },
        { id: 5, name: "Bo mạch chủ (Mainboard)" },
        { id: 2, name: "Bộ nhớ trong (RAM)" },
        { id: 6, name: "Card màn hình (VGA)" },
        { id: 4, name: "Ổ cứng (SSD/HDD)" },
        { id: 3, name: "Nguồn máy tính (PSU)" },
        { id: 7, name: "Vỏ máy tính (Case)" },
        { id: 8, name: "Tản nhiệt (Cooling)" },
        { id: 9, name: "Màn hình" },
        { id: 10, name: "Bàn phím & Chuột" }
    ];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('/product.json');
                if (!response.ok) {
                    throw new Error('Không thể tải dữ liệu sản phẩm');
                }
                const data = await response.json();
                const mappedProducts = data.map((item) => ({
                    ...item,
                    image: resolveProductImage(item.imageKey) || 'https://via.placeholder.com/250'
                }));
                setProducts(mappedProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Reset về trang 1 mỗi khi đổi danh mục
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    if (isLoading) {
        return <div className="product-list-container">Đang tải sản phẩm...</div>;
    }

    if (error) {
        return <div className="product-list-container">Lỗi: {error}</div>;
    }

    // 1. Lọc sản phẩm theo danh mục
    const displayedProducts = selectedCategory === 0 
        ? products 
        : products.filter(product => product.idcategory === selectedCategory);

    // 2. Tính toán để cắt mảng sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // 3. Tính tổng số trang
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

    // Hàm đổi trang
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Tự động cuộn lên đầu trang khi chuyển trang cho mượt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="product-page-layout">
            
            {/* CỘT BÊN TRÁI: DANH MỤC */}
            <div className="sidebar-category">
                <h3>Danh mục linh kiện</h3>
                <ul>
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <a 
                                href="#!" 
                                className={selectedCategory === cat.id ? "active-category" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory(cat.id);
                                }}
                            >
                                {cat.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CỘT BÊN PHẢI: DANH SÁCH SẢN PHẨM & PHÂN TRANG */}
            <div className="product-list-container">
                {displayedProducts.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: "40px", fontSize: "18px", color: "#666" }}>
                        Hiện chưa có sản phẩm nào trong danh mục này.
                    </div>
                ) : (
                    <>
                        <div className="product-list">
                            {currentProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* THANH PHÂN TRANG */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    onClick={() => paginate(currentPage - 1)} 
                                    disabled={currentPage === 1}
                                >
                                    &laquo; Trước
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button 
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button 
                                    onClick={() => paginate(currentPage + 1)} 
                                    disabled={currentPage === totalPages}
                                >
                                    Sau &raquo;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default ProductList;