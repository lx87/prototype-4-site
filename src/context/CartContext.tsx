import { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Product, ProductVariant } from '../types'

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void
    removeFromCart: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    getTotalPrice: () => number
    getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
        setItems(prev => {
            const itemId = variant ? `${product.id}-${variant.id}` : product.id
            const existingItem = prev.find(item => {
                const currentItemId = item.variant ? `${item.product.id}-${item.variant.id}` : item.product.id
                return currentItemId === itemId
            })

            if (existingItem) {
                return prev.map(item => {
                    const currentItemId = item.variant ? `${item.product.id}-${item.variant.id}` : item.product.id
                    if (currentItemId === itemId) {
                        return { ...item, quantity: item.quantity + quantity }
                    }
                    return item
                })
            }

            return [...prev, { product, variant, quantity }]
        })
    }

    const removeFromCart = (itemId: string) => {
        setItems(prev => prev.filter((_, index) => index.toString() !== itemId))
    }

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId)
            return
        }
        setItems(prev =>
            prev.map((item, index) =>
                index.toString() === itemId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const getTotalPrice = () => {
        return items.reduce((total, item) => {
            const price = item.variant ? item.variant.price : item.product.basePrice
            return total + price * item.quantity
        }, 0)
    }

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalPrice,
                getTotalItems
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

