import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="highlands-footer">
            {/* Colored strip at the top */}
            <div className="footer-green-strip"></div>

            <div className="footer-content">
                {/* Left Section: Copyright */}
                <div className="footer-left">
                    <p className="footer-copyright">
                        ©2026 Thành Nhật Computer. All rights reserved.
                    </p>
                </div>

                {/* Middle Section: Navigation Links */}
                <div className="footer-middle">
                    {/* Column 1: VỀ CHÚNG TÔI */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">VỀ THÀNH NHẬT PC</h3>
                        <ul className="footer-links">
                            <li><a href="/gioi-thieu">Giới thiệu công ty</a></li>
                            <li><a href="/chinh-sach-bao-hanh">Chính sách bảo hành</a></li>
                            <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                            <li><a href="/huong-dan-tra-gop">Hướng dẫn trả góp</a></li>
                        </ul>
                    </div>

                    {/* Column 2: HỆ THỐNG SHOWROOM */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">HỆ THỐNG SHOWROOM</h3>
                        <ul className="footer-links">
                            <li><a href="/showroom">Showroom Quận 6, TP.HCM</a></li>
                            <li><a href="/trung-tam-bao-hanh">Trung tâm bảo hành</a></li>
                        </ul>
                    </div>

                    {/* Column 3: HỖ TRỢ KHÁCH HÀNG */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">TỔNG ĐÀI HỖ TRỢ</h3>
                        <ul className="footer-links">
                            <li><a href="tel:18006779">Mua hàng: 1800 6779</a></li>
                            <li><a href="tel:18006780">Kỹ thuật: 1800 6780</a></li>
                            <li><a href="tel:18006781">Khiếu nại: 1800 6781</a></li>
                        </ul>
                    </div>
                </div>

                {/* Right Section: Social Media & Map */}
                <div className="footer-right">
                    <h3 className="footer-column-title">KẾT NỐI VỚI CHÚNG TÔI</h3>
                    <div className="footer-social-icons">
                        <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="https://tiktok.com" className="social-icon" aria-label="TikTok">
                            <i className="fab fa-tiktok"></i>
                        </a>
                    </div>

                    <div className="footer-map">
                        <iframe
                            title="Bản đồ địa điểm Thành Nhật PC"
                            className="footer-map__iframe"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6465492471675!2d106.6341!3d10.7482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e6211283d5d%3A0x1111111111111111!2sQu%E1%BA%ADn%206%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                        <a
                            className="footer-map__link"
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mở trong Google Maps
                        </a>
                    </div>
                </div>
            </div>

            {/* Chat Icon */}
            <div className="footer-chat-icon" title="Chat với kỹ thuật viên">
                <i className="fas fa-headset"></i>
            </div>
        </footer>
    );
};

export default Footer;