import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import ProductCard from '../../components/ProductCard/ProductCard'
import { MinusIcon, PlusIcon } from '../../components/Icons/Icons'
import './ProductPage.css'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const { addToCart } = useCart()
    const product = products.find(p => p.id === id)

    const [selectedVariant, setSelectedVariant] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)

    if (!product) {
        return (
            <div className="product-page">
                <div className="container">
                    <div className="not-found">
                        <h2>Товар не найден</h2>
                        <Link to="/catalog">Вернуться в каталог</Link>
                    </div>
                </div>
            </div>
        )
    }

    const currentVariant = product.variants?.[selectedVariant]
    const currentPrice = currentVariant ? currentVariant.price : product.basePrice
    const currentImage = currentVariant
        ? currentVariant.image
        : (product.images[selectedImage] || product.image)

    const availableColors = product.variants
        ? [...new Set(product.variants.map(v => v.color).filter(Boolean))]
        : []
    const availableSizes = product.variants
        ? [...new Set(product.variants.map(v => v.size).filter(Boolean))]
        : []
    const availableMaterials = product.variants
        ? [...new Set(product.variants.map(v => v.material).filter(Boolean))]
        : []

    const handleVariantChange = (type: 'color' | 'size' | 'material', value: string) => {
        if (!product.variants) return

        const current = product.variants[selectedVariant]
        const newVariant = product.variants.findIndex(v => {
            const colorMatch = type === 'color'
                ? (v.color === value || !v.color)
                : (v.color === current.color || !v.color || !current.color)
            const sizeMatch = type === 'size'
                ? (v.size === value || !v.size)
                : (v.size === current.size || !v.size || !current.size)
            const materialMatch = type === 'material'
                ? (v.material === value || !v.material)
                : (v.material === current.material || !v.material || !current.material)
            return colorMatch && sizeMatch && materialMatch
        })

        if (newVariant !== -1) {
            setSelectedVariant(newVariant)
            setSelectedImage(0)
        }
    }

    const handleAddToCart = () => {
        const variant = product.variants?.[selectedVariant]
        for (let i = 0; i < quantity; i++) {
            addToCart(product, variant)
        }
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    return (
        <div className="product-page">
            <div className="container">
                <motion.div
                    className="product-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="product-images">
                        <div className="main-image">
                            <img src={currentImage} alt={product.name} />
                        </div>
                        {(product.images.length > 1 || (product.variants && product.variants.length > 0)) && (
                            <div className="image-thumbnails">
                                {product.variants && product.variants.length > 0 ? (
                                    product.variants.map((variant, index) => (
                                        <button
                                            key={variant.id}
                                            className={`thumbnail ${selectedVariant === index ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedVariant(index)
                                                setSelectedImage(0)
                                            }}
                                        >
                                            <img src={variant.image} alt={`${product.name} вариант ${index + 1}`} />
                                        </button>
                                    ))
                                ) : (
                                    product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={img} alt={`${product.name} ${index + 1}`} />
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="product-details">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-category">Категория: {product.category}</p>
                        <div className="product-price">
                            {currentPrice.toLocaleString()} ₽
                        </div>
                        <p className="product-description">{product.description}</p>

                        {product.variants && product.variants.length > 0 && (
                            <div className="product-variants">
                                {availableColors.length > 0 && (
                                    <div className="variant-group">
                                        <label>Цвет:</label>
                                        <div className="variant-options">
                                            {availableColors.map(color => (
                                                <button
                                                    key={color}
                                                    className={`variant-button ${product.variants![selectedVariant].color === color ? 'active' : ''
                                                        }`}
                                                    onClick={() => handleVariantChange('color', color!)}
                                                    style={{ backgroundColor: color === 'Серый' ? '#808080' : color === 'Бежевый' ? '#F5F5DC' : color === 'Черный' ? '#000000' : undefined }}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {availableSizes.length > 0 && (
                                    <div className="variant-group">
                                        <label>Размер:</label>
                                        <div className="variant-options">
                                            {availableSizes.map(size => (
                                                <button
                                                    key={size}
                                                    className={`variant-button ${product.variants![selectedVariant].size === size ? 'active' : ''
                                                        }`}
                                                    onClick={() => handleVariantChange('size', size!)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {availableMaterials.length > 0 && (
                                    <div className="variant-group">
                                        <label>Материал:</label>
                                        <div className="variant-options">
                                            {availableMaterials.map(material => (
                                                <button
                                                    key={material}
                                                    className={`variant-button ${product.variants![selectedVariant].material === material ? 'active' : ''
                                                        }`}
                                                    onClick={() => handleVariantChange('material', material!)}
                                                >
                                                    {material}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="selected-variant-info">
                                    <p>
                                        Выбранный вариант: {
                                            [
                                                product.variants[selectedVariant].color,
                                                product.variants[selectedVariant].size,
                                                product.variants[selectedVariant].material
                                            ].filter(Boolean).join(' ') || 'Базовый вариант'
                                        }
                                    </p>
                                    <p className="variant-price">Цена: {currentPrice.toLocaleString()} ₽</p>
                                </div>
                            </div>
                        )}

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <label>Количество:</label>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="quantity-button"
                                        aria-label="Уменьшить количество"
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="quantity-button"
                                        aria-label="Увеличить количество"
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                            </div>

                            <button
                                className="buy-button"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                            </button>
                        </div>

                        {!product.inStock && (
                            <p className="out-of-stock">Товар временно отсутствует</p>
                        )}
                    </div>
                </motion.div>

                {relatedProducts.length > 0 && (
                    <motion.section
                        className="related-products"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>С этим товаром часто покупают</h2>
                        <div className="related-products-grid">
                            {relatedProducts.map((relatedProduct, index) => (
                                <motion.div
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <ProductCard product={relatedProduct} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    )
}

export default ProductPage

