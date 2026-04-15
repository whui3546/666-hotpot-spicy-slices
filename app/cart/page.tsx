'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
  key: string
  productId: string
  productName: string
  size: string
  sizeWeight: string
  price: number
  quantity: number
  image: string
}

const products: {[key: string]: { name: string; image: string }} = {
  'classic-pack': { name: 'Classic Pack', image: '/images/products/export_1.jpg' },
  'original-spicy': { name: 'Original Spicy', image: '/images/products/Spicy Slices for Hot Pot_楼层3.jpg' },
  'extra-hot': { name: 'Extra Hot', image: '/images/products/Spicy Slices for Hot Pot_楼层4.jpg' },
  'medium-spicy': { name: 'Medium Spicy', image: '/images/products/Spicy Slices for Hot Pot_楼层7.jpg' },
  'mild-spicy': { name: 'Mild Spicy', image: '/images/products/Spicy Slices for Hot Pot_楼层9.jpg' },
  'family-pack': { name: 'Family Pack', image: '/images/products/Spicy Slices for Hot Pot_楼层10(1).jpg' },
  'party-pack': { name: 'Party Pack', image: '/images/products/Spicy Slices for Hot Pot_楼层11.jpg' },
  'gift-box': { name: 'Gift Box', image: '/images/products/Spicy Slices for Hot Pot_楼层14.jpg' },
  'premium-box': { name: 'Premium Box', image: '/images/products/Spicy Slices for Hot Pot_楼层15.jpg' },
  'special-edition': { name: 'Special Edition', image: '/images/products/Gemini_Generated_Image_mljh7kmljh7kmljh.png' },
  'limited-edition': { name: 'Limited Edition', image: '/images/products/Gemini_Generated_Image_x1x6chx1x6chx1x6.png' },
}

const sizes: {[key: string]: { name: string; weight: string; price: number }} = {
  'mini': { name: 'Mini Pack', weight: '100g', price: 9.99 },
  'classic': { name: 'Classic', weight: '250g', price: 24.99 },
  'family': { name: 'Family', weight: '500g', price: 44.99 },
  'mega': { name: 'Mega Pack', weight: '1kg', price: 79.99 },
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const savedCart = localStorage.getItem('666_cart')
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart)
        const items: CartItem[] = []
        
        Object.entries(cart).forEach(([key, qty]) => {
          const [productId, sizeId] = key.split('-')
          const product = products[productId]
          const size = sizes[sizeId]
          
          if (product && size) {
            items.push({
              key,
              productId,
              productName: product.name,
              size: size.name,
              sizeWeight: size.weight,
              price: size.price,
              quantity: qty as number,
              image: product.image,
            })
          }
        })
        
        setCartItems(items)
      } catch (e) {
        console.error('Failed to load cart')
      }
    }
    setIsLoaded(true)
  }

  const updateQuantity = (key: string, newQty: number) => {
    if (newQty < 1) {
      removeItem(key)
      return
    }
    
    const savedCart = JSON.parse(localStorage.getItem('666_cart') || '{}')
    savedCart[key] = newQty
    localStorage.setItem('666_cart', JSON.stringify(savedCart))
    loadCart()
  }

  const removeItem = (key: string) => {
    const savedCart = JSON.parse(localStorage.getItem('666_cart') || '{}')
    delete savedCart[key]
    localStorage.setItem('666_cart', JSON.stringify(savedCart))
    loadCart()
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container-wide px-4 py-24 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold text-brand-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/products"
            className="inline-block px-10 py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container-wide px-4 py-8">
          <h1 className="text-3xl font-bold text-brand-black">🛒 Shopping Cart</h1>
          <p className="text-gray-500">{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="container-wide px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.key} className="bg-white rounded-2xl p-6 shadow-sm flex gap-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brand-black">{item.productName}</h3>
                  <p className="text-gray-500">{item.size} - {item.sizeWeight}</p>
                  <p className="text-brand-pink font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-full"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-full"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-brand-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-brand-pink">
                    Add ${(50 - subtotal).toFixed(2)} more for FREE shipping! 🚚
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold text-brand-black">Total</span>
                  <span className="text-2xl font-bold text-brand-pink">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="snipcart-checkout w-full py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark transition-colors mb-4">
                🛒 Checkout
              </button>

              <Link
                href="/products"
                className="block w-full py-3 text-center border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:border-brand-pink hover:text-brand-pink transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-3 text-center">We Accept</p>
                <div className="flex justify-center gap-3 text-2xl">
                  <span title="PayPal">💳</span>
                  <span title="Visa">💳</span>
                  <span title="Mastercard">💳</span>
                  <span title="Apple Pay">🍎</span>
                  <span title="Google Pay">🔵</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
