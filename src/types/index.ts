export interface ProductVariant {
    id: string
    color?: string
    size?: string
    material?: string
    price: number
    image: string
    inStock: boolean
}

export interface Product {
    id: string
    name: string
    description: string
    category: string
    basePrice: number
    image: string
    images: string[]
    variants?: ProductVariant[]
    popular?: boolean
    inStock: boolean
}

export interface CartItem {
    product: Product
    variant?: ProductVariant
    quantity: number
}

export interface Order {
    name: string
    phone: string
    address: string
    deliveryMethod: 'pickup' | 'delivery' | 'pickup-point'
    pickupPoint?: string
    items: CartItem[]
    total: number
}

