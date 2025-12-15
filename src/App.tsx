import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import ProductPage from './pages/ProductPage/ProductPage'
import Cart from './pages/Cart/Cart'
import OrderForm from './pages/OrderForm/OrderForm'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import './App.css'

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:category" element={<Catalog />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order" element={<OrderForm />} />
                            <Route path="/order/success" element={<OrderSuccess />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    )
}

export default App

