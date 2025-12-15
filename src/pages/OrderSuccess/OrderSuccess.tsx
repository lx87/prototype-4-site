import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './OrderSuccess.css'

const OrderSuccess = () => {
    const location = useLocation()
    const order = location.state?.order

    return (
        <div className="order-success-page">
            <div className="container">
                <motion.div
                    className="success-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="success-icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                    >
                        ✓
                    </motion.div>
                    <h1>Заказ успешно оформлен!</h1>
                    <p className="success-message">
                        Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
                    </p>
                    {order && (
                        <div className="order-details">
                            <h2>Детали заказа</h2>
                            <div className="detail-row">
                                <span>Имя:</span>
                                <span>{order.name}</span>
                            </div>
                            <div className="detail-row">
                                <span>Телефон:</span>
                                <span>{order.phone}</span>
                            </div>
                            {order.address && (
                                <div className="detail-row">
                                    <span>Адрес:</span>
                                    <span>{order.address}</span>
                                </div>
                            )}
                            <div className="detail-row">
                                <span>Способ получения:</span>
                                <span>
                                    {order.deliveryMethod === 'delivery' && 'Доставка на дом'}
                                    {order.deliveryMethod === 'pickup' && 'Самовывоз'}
                                    {order.deliveryMethod === 'pickup-point' && 'Пункт выдачи'}
                                </span>
                            </div>
                            <div className="detail-row total">
                                <span>Сумма заказа:</span>
                                <span className="total-amount">{order.total.toLocaleString()} ₽</span>
                            </div>
                        </div>
                    )}
                    <div className="success-actions">
                        <Link to="/catalog" className="continue-button">
                            Продолжить покупки
                        </Link>
                        <Link to="/" className="home-button">
                            На главную
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default OrderSuccess

