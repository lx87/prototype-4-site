import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Product } from '../../types'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart()
    const price = product.variants ? product.variants[0].price : product.basePrice

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (product.variants && product.variants.length > 0) {
            addToCart(product, product.variants[0])
        } else {
            addToCart(product)
        }
    }

    return (
        <motion.div
            className="product-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/product/${product.id}`}>
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.popular && <span className="popular-badge">Популярный</span>}
                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="product-footer">
                        <span className="product-price">{price.toLocaleString()}₽</span>
                        <button
                            className="add-to-cart-button"
                            onClick={handleAddToCart}
                            aria-label="Добавить в корзину"
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default ProductCard

