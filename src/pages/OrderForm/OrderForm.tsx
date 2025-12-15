import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import './OrderForm.css'

const OrderForm = () => {
    const { items, getTotalPrice, clearCart } = useCart()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        deliveryMethod: 'delivery' as 'pickup' | 'delivery' | 'pickup-point',
        pickupPoint: ''
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Введите имя'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Введите телефон'
        } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Неверный формат телефона'
        }

        if (formData.deliveryMethod === 'delivery' && !formData.address.trim()) {
            newErrors.address = 'Введите адрес доставки'
        }

        if (formData.deliveryMethod === 'pickup-point' && !formData.pickupPoint.trim()) {
            newErrors.pickupPoint = 'Выберите пункт выдачи'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        setIsSubmitting(true)

        // Имитация отправки заказа
        await new Promise(resolve => setTimeout(resolve, 1500))

        const order = {
            ...formData,
            items,
            total: getTotalPrice()
        }

        console.log('Order submitted:', order)

        clearCart()
        setIsSubmitting(false)

        // Переход на страницу успешного заказа
        navigate('/order/success', { state: { order } })
    }

    if (items.length === 0) {
        return (
            <div className="order-form-page">
                <div className="container">
                    <div className="empty-order">
                        <h2>Корзина пуста</h2>
                        <p>Добавьте товары в корзину перед оформлением заказа</p>
                        <button onClick={() => navigate('/catalog')} className="back-button">
                            Перейти в каталог
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="order-form-page">
            <div className="container">
                <motion.h1
                    className="order-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Оформление заказа
                </motion.h1>

                <div className="order-content">
                    <motion.form
                        className="order-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="form-section">
                            <h2>Контактная информация</h2>

                            <div className="form-group">
                                <label htmlFor="name">Имя *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'error' : ''}
                                    placeholder="Введите ваше имя"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Телефон *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'error' : ''}
                                    placeholder="+7 (999) 123-45-67"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Способ получения</h2>

                            <div className="delivery-options">
                                <label className="delivery-option">
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="delivery"
                                        checked={formData.deliveryMethod === 'delivery'}
                                        onChange={handleChange}
                                    />
                                    <div className="option-content">
                                        <span className="option-title">Доставка на дом</span>
                                        <span className="option-description">Доставка курьером по указанному адресу</span>
                                    </div>
                                </label>

                                <label className="delivery-option">
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="pickup"
                                        checked={formData.deliveryMethod === 'pickup'}
                                        onChange={handleChange}
                                    />
                                    <div className="option-content">
                                        <span className="option-title">Самовывоз</span>
                                        <span className="option-description">Забрать заказ в магазине</span>
                                    </div>
                                </label>

                                <label className="delivery-option">
                                    <input
                                        type="radio"
                                        name="deliveryMethod"
                                        value="pickup-point"
                                        checked={formData.deliveryMethod === 'pickup-point'}
                                        onChange={handleChange}
                                    />
                                    <div className="option-content">
                                        <span className="option-title">Пункт выдачи</span>
                                        <span className="option-description">Забрать в пункте выдачи заказов</span>
                                    </div>
                                </label>
                            </div>

                            {formData.deliveryMethod === 'delivery' && (
                                <div className="form-group">
                                    <label htmlFor="address">Адрес доставки *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={errors.address ? 'error' : ''}
                                        placeholder="Введите адрес доставки"
                                    />
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>
                            )}

                            {formData.deliveryMethod === 'pickup-point' && (
                                <div className="form-group">
                                    <label htmlFor="pickupPoint">Пункт выдачи *</label>
                                    <select
                                        id="pickupPoint"
                                        name="pickupPoint"
                                        value={formData.pickupPoint}
                                        onChange={handleChange}
                                        className={errors.pickupPoint ? 'error' : ''}
                                    >
                                        <option value="">Выберите пункт выдачи</option>
                                        <option value="point1">Пункт выдачи №1 - ул. Центральная, д. 10</option>
                                        <option value="point2">Пункт выдачи №2 - ул. Торговая, д. 25</option>
                                        <option value="point3">Пункт выдачи №3 - ул. Магазинная, д. 5</option>
                                    </select>
                                    {errors.pickupPoint && <span className="error-message">{errors.pickupPoint}</span>}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                        </button>
                    </motion.form>

                    <motion.div
                        className="order-summary"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2>Ваш заказ</h2>
                        <div className="summary-items">
                            {items.map((item, index) => {
                                const price = item.variant ? item.variant.price : item.product.basePrice
                                return (
                                    <div key={index} className="summary-item">
                                        <span className="item-name">{item.product.name}</span>
                                        <span className="item-quantity">x{item.quantity}</span>
                                        <span className="item-price">{(price * item.quantity).toLocaleString()} ₽</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="summary-total">
                            <span>Итого:</span>
                            <span className="total-price">{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm

