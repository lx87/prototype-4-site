import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>О магазине</h3>
                        <p>ShopStore - ваш надежный партнер в покупке качественных товаров. Мы предлагаем широкий ассортимент по доступным ценам.</p>
                    </div>

                    <div className="footer-section">
                        <h3>Контакты</h3>
                        <p>📍 Адрес: г. Москва, ул. Торговая, д. 15</p>
                        <p>📞 Телефон: +7 (495) 123-45-67</p>
                        <p>✉️ Email: info@shopstore.ru</p>
                        <p>🕐 Время работы: Пн-Вс: 9:00 - 21:00</p>
                    </div>

                    <div className="footer-section">
                        <h3>Социальные сети</h3>
                        <div className="social-links">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="VKontakte">
                                VK
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                                Telegram
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                Instagram
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Карта</h3>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373789489123!2d37.61729991593089!3d55.75582628055314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1234567890123!5m2!1sru!2sru"
                                width="100%"
                                height="150"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Карта магазина"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 ShopStore. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

