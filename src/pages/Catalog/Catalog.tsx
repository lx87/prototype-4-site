import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, categories } from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Catalog.css'

const Catalog = () => {
    const [searchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')

    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam)
        }
    }, [categoryParam])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
    const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name'>('popular')
    const [showFilters, setShowFilters] = useState(false)

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory)
        }

        // Filter by search
        if (searchParam) {
            const searchLower = searchParam.toLowerCase()
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            )
        }

        // Filter by price
        filtered = filtered.filter(p => {
            const price = p.variants ? Math.min(...p.variants.map(v => v.price)) : p.basePrice
            return price >= priceRange.min && price <= priceRange.max
        })

        // Sort
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    if (a.popular && !b.popular) return -1
                    if (!a.popular && b.popular) return 1
                    return 0
                case 'price-asc':
                    const priceA = a.variants ? Math.min(...a.variants.map(v => v.price)) : a.basePrice
                    const priceB = b.variants ? Math.min(...b.variants.map(v => v.price)) : b.basePrice
                    return priceA - priceB
                case 'price-desc':
                    const priceA2 = a.variants ? Math.min(...a.variants.map(v => v.price)) : a.basePrice
                    const priceB2 = b.variants ? Math.min(...b.variants.map(v => v.price)) : b.basePrice
                    return priceB2 - priceA2
                case 'name':
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

        return filtered
    }, [selectedCategory, priceRange, sortBy, searchParam])

    const maxPrice = Math.max(
        ...products.map(p => p.variants ? Math.max(...p.variants.map(v => v.price)) : p.basePrice)
    )

    return (
        <div className="catalog">
            <div className="container">
                <motion.h1
                    className="catalog-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Каталог товаров
                </motion.h1>

                <div className="catalog-content">
                    {/* Filters Sidebar */}
                    <aside className={`filters-sidebar ${showFilters ? 'filters-open' : ''}`}>
                        <div className="filters-header">
                            <h2>Фильтры</h2>
                            <button
                                className="close-filters"
                                onClick={() => setShowFilters(false)}
                                aria-label="Закрыть фильтры"
                            >
                                ×
                            </button>
                        </div>

                        <div className="filter-group">
                            <h3>Категория</h3>
                            <div className="filter-options">
                                {categories.map(cat => (
                                    <label key={cat.id} className="filter-option">
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat.id}
                                            checked={selectedCategory === cat.id}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                        <span>{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3>Цена</h3>
                            <div className="price-range">
                                <div className="price-inputs">
                                    <input
                                        type="number"
                                        min="0"
                                        max={maxPrice}
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                        placeholder="От"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        max={maxPrice}
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                        placeholder="До"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    className="price-slider"
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3>Сортировка</h3>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="sort-select"
                            >
                                <option value="popular">По популярности</option>
                                <option value="price-asc">По возрастанию цены</option>
                                <option value="price-desc">По убыванию цены</option>
                                <option value="name">По названию</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="catalog-main">
                        <div className="catalog-toolbar">
                            <button
                                className="filters-toggle"
                                onClick={() => setShowFilters(true)}
                            >
                                Фильтры
                            </button>
                            <p className="products-count">
                                Найдено товаров: {filteredAndSortedProducts.length}
                            </p>
                        </div>

                        {filteredAndSortedProducts.length === 0 ? (
                            <div className="no-products">
                                <p>Товары не найдены</p>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {filteredAndSortedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showFilters && (
                <div
                    className="filters-overlay"
                    onClick={() => setShowFilters(false)}
                ></div>
            )}
        </div>
    )
}

export default Catalog

