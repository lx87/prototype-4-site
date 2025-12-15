import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Header.css'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { getTotalItems } = useCart()
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`)
            setSearchQuery('')
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <span className="logo-text">ShopStore</span>
                    </Link>

                    <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link>
                        <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Каталог</Link>
                        <Link to="/catalog?category=furniture" onClick={() => setIsMenuOpen(false)}>Мебель</Link>
                        <Link to="/catalog?category=electronics" onClick={() => setIsMenuOpen(false)}>Электроника</Link>
                        <Link to="/catalog?category=clothing" onClick={() => setIsMenuOpen(false)}>Одежда</Link>
                    </nav>

                    <div className="header-actions">
                        <form className="search-form" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Поиск товаров..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">🔍</button>
                        </form>

                        <Link to="/cart" className="cart-link">
                            <span className="cart-icon">🛒</span>
                            {getTotalItems() > 0 && (
                                <span className="cart-badge">{getTotalItems()}</span>
                            )}
                        </Link>

                        <button
                            className="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

