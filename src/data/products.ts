import { Product } from '../types'

export const products: Product[] = [
    {
        id: '1',
        name: 'Диван "Комфорт Плюс"',
        description: 'Современный диван с эргономичным дизайном и высококачественной обивкой. Идеально подходит для гостиной или офиса. Включает подушки для комфорта и стильные подлокотники.',
        category: 'furniture',
        basePrice: 45000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800'
        ],
        popular: true,
        inStock: true,
        variants: [
            {
                id: '1-1',
                color: 'Серый',
                size: '2-местный',
                material: 'Ткань',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
                inStock: true
            },
            {
                id: '1-2',
                color: 'Бежевый',
                size: '2-местный',
                material: 'Ткань',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
                inStock: true
            },
            {
                id: '1-3',
                color: 'Серый',
                size: '3-местный',
                material: 'Ткань',
                price: 55000,
                image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
                inStock: true
            },
            {
                id: '1-4',
                color: 'Бежевый',
                size: '3-местный',
                material: 'Ткань',
                price: 55000,
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
                inStock: true
            },
            {
                id: '1-5',
                color: 'Серый',
                size: '2-местный',
                material: 'Кожа',
                price: 65000,
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
                inStock: true
            },
            {
                id: '1-6',
                color: 'Черный',
                size: '2-местный',
                material: 'Кожа',
                price: 65000,
                image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
                inStock: true
            },
            {
                id: '1-7',
                color: 'Серый',
                size: '3-местный',
                material: 'Кожа',
                price: 75000,
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
                inStock: true
            },
            {
                id: '1-8',
                color: 'Черный',
                size: '3-местный',
                material: 'Кожа',
                price: 75000,
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
                inStock: true
            }
        ]
    },
    {
        id: '2',
        name: 'Стол обеденный "Элегант"',
        description: 'Красивый обеденный стол из натурального дерева. Подходит для семейных обедов и приема гостей.',
        category: 'furniture',
        basePrice: 25000,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        ],
        popular: true,
        inStock: true
    },
    {
        id: '3',
        name: 'Кресло офисное "Профи"',
        description: 'Эргономичное офисное кресло с регулировкой высоты и поддержкой поясницы.',
        category: 'furniture',
        basePrice: 15000,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
        images: [
            'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800'
        ],
        popular: false,
        inStock: true
    },
    {
        id: '4',
        name: 'Шкаф "Модерн"',
        description: 'Вместительный шкаф с современным дизайном. Идеально подходит для спальни.',
        category: 'furniture',
        basePrice: 35000,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        ],
        popular: false,
        inStock: true
    },
    {
        id: '5',
        name: 'Смартфон "TechPro X"',
        description: 'Современный смартфон с отличной камерой и производительностью.',
        category: 'electronics',
        basePrice: 35000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
        ],
        popular: true,
        inStock: true
    },
    {
        id: '6',
        name: 'Ноутбук "UltraBook"',
        description: 'Легкий и мощный ноутбук для работы и развлечений.',
        category: 'electronics',
        basePrice: 75000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
        ],
        popular: true,
        inStock: true
    },
    {
        id: '7',
        name: 'Наушники беспроводные',
        description: 'Качественные беспроводные наушники с шумоподавлением.',
        category: 'electronics',
        basePrice: 12000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
        ],
        popular: false,
        inStock: true
    },
    {
        id: '8',
        name: 'Футболка "Классик"',
        description: 'Удобная футболка из 100% хлопка. Различные цвета и размеры.',
        category: 'clothing',
        basePrice: 1500,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
        ],
        popular: true,
        inStock: true
    },
    {
        id: '9',
        name: 'Джинсы "Стиль"',
        description: 'Классические джинсы из качественного денима.',
        category: 'clothing',
        basePrice: 3500,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'
        ],
        popular: false,
        inStock: true
    }
]

export const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'furniture', name: 'Мебель' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'clothing', name: 'Одежда' }
]

