import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { MinusIcon, PlusIcon, CloseIcon } from '../../components/Icons/Icons'
import './Cart.css'

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
    const navigate = useNavigate()

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <motion.div
                        className="empty-cart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Корзина пуста</h2>
                        <p>Добавьте товары в корзину, чтобы продолжить покупки</p>
                        <Link to="/catalog" className="back-to-catalog">
                            Перейти в каталог
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    const handleCheckout = () => {
        navigate('/order')
    }

    return (
        <div className="cart-page">
            <div className="container">
                <motion.h1
                    className="cart-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Корзина
                </motion.h1>

                <div className="cart-content">
                    <div className="cart-items">
                        {items.map((item, index) => {
                            const price = item.variant ? item.variant.price : item.product.basePrice
                            const image = item.variant ? item.variant.image : item.product.image

                            return (
                                <motion.div
                                    key={`${item.product.id}-${item.variant?.id || ''}-${index}`}
                                    className="cart-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="cart-item-image">
                                        <img src={image} alt={item.product.name} />
                                    </div>

                                    <div className="cart-item-info">
                                        <Link to={`/product/${item.product.id}`}>
                                            <h3 className="cart-item-name">{item.product.name}</h3>
                                        </Link>
                                        {item.variant && (
                                            <p className="cart-item-variant">
                                                {item.variant.color} {item.variant.size} {item.variant.material}
                                            </p>
                                        )}
                                        <p className="cart-item-price">{price.toLocaleString()} ₽</p>
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => updateQuantity(index.toString(), item.quantity - 1)}
                                            className="quantity-btn"
                                            aria-label="Уменьшить количество"
                                        >
                                            <MinusIcon />
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(index.toString(), item.quantity + 1)}
                                            className="quantity-btn"
                                            aria-label="Увеличить количество"
                                        >
                                            <PlusIcon />
                                        </button>
                                    </div>

                                    <div className="cart-item-total">
                                        <span className="item-total-price">
                                            {(price * item.quantity).toLocaleString()} ₽
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(index.toString())}
                                        className="remove-item"
                                        aria-label="Удалить товар"
                                    >
                                        <CloseIcon />
                                    </button>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        className="cart-summary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2>Итого</h2>
                        <div className="summary-row">
                            <span>Товаров:</span>
                            <span>{items.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                        </div>
                        <div className="summary-row total">
                            <span>Сумма:</span>
                            <span className="total-price">{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="checkout-button"
                        >
                            Оформить заказ
                        </button>
                        <button
                            onClick={clearCart}
                            className="clear-cart-button"
                        >
                            Очистить корзину
                        </button>
                        <Link to="/catalog" className="continue-shopping">
                            Продолжить покупки
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Cart

