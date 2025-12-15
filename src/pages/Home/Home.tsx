import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'

const Home = () => {
    const popularProducts = products.filter(p => p.popular).slice(0, 4)

    const advantages = [
        {
            icon: '🚚',
            title: 'Быстрая доставка',
            description: 'Доставка в течение 1-2 дней по всей России'
        },
        {
            icon: '🌱',
            title: 'Экологичные товары',
            description: 'Только качественные и безопасные продукты'
        },
        {
            icon: '💰',
            title: 'Выгодные цены',
            description: 'Лучшие цены на рынке и регулярные акции'
        },
        {
            icon: '✅',
            title: 'Гарантия качества',
            description: 'Гарантия на все товары от производителя'
        }
    ]

    return (
        <div className="home">
            {/* Hero Block */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Добро пожаловать в ShopStore
                        </motion.h1>
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Широкий ассортимент качественных товаров по доступным ценам
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/catalog" className="hero-button">
                                <span>Перейти в каталог</span>
                                <motion.span
                                    className="button-arrow"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="hero-background"></div>
            </section>

            {/* Popular Products */}
            <section className="popular-products section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Популярные товары
                    </motion.h2>
                    <div className="products-grid">
                        {popularProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="section-action"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/catalog" className="view-all-button">
                            Посмотреть все товары
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Категории товаров
                    </motion.h2>
                    <div className="categories-grid">
                        {[
                            { id: 'furniture', name: 'Мебель', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600', count: 4 },
                            { id: 'electronics', name: 'Электроника', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', count: 3 },
                            { id: 'clothing', name: 'Одежда', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', count: 2 }
                        ].map((category, index) => (
                            <motion.div
                                key={category.id}
                                className="category-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link to={`/catalog?category=${category.id}`}>
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                    </div>
                                    <div className="category-info">
                                        <h3>{category.name}</h3>
                                        <p>{category.count} товаров</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="advantages section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Преимущества магазина
                    </motion.h2>
                    <div className="advantages-grid">
                        {advantages.map((advantage, index) => (
                            <motion.div
                                key={advantage.title}
                                className="advantage-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="advantage-icon">{advantage.icon}</div>
                                <h3>{advantage.title}</h3>
                                <p>{advantage.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

