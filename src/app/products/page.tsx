'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const allProductImages = [
  { file: 'export_1.jpg', name: 'Classic Pack', id: 'classic-pack' },
  { file: 'Spicy Slices for Hot Pot_楼层3.jpg', name: 'Original Spicy', id: 'original-spicy' },
  { file: 'Spicy Slices for Hot Pot_楼层4.jpg', name: 'Extra Hot', id: 'extra-hot' },
  { file: 'Spicy Slices for Hot Pot_楼层7.jpg', name: 'Medium Spicy', id: 'medium-spicy' },
  { file: 'Spicy Slices for Hot Pot_楼层9.jpg', name: 'Mild Spicy', id: 'mild-spicy' },
  { file: 'Spicy Slices for Hot Pot_楼层10(1).jpg', name: 'Family Pack', id: 'family-pack' },
  { file: 'Spicy Slices for Hot Pot_楼层11.jpg', name: 'Party Pack', id: 'party-pack' },
  { file: 'Spicy Slices for Hot Pot_楼层14.jpg', name: 'Gift Box', id: 'gift-box' },
  { file: 'Spicy Slices for Hot Pot_楼层15.jpg', name: 'Premium Box', id: 'premium-box' },
  { file: 'Gemini_Generated_Image_mljh7kmljh7kmljh.png', name: 'Special Edition', id: 'special-edition' },
  { file: 'Gemini_Generated_Image_x1x6chx1x6chx1x6.png', name: 'Limited Edition', id: 'limited-edition' },
]

const sizes = [
  { id: 'mini', name: 'Mini Pack', weight: '100g', price: 9.99, desc: 'Perfect for trying' },
  { id: 'classic', name: 'Classic', weight: '250g', price: 24.99, desc: 'Best seller' },
  { id: 'family', name: 'Family', weight: '500g', price: 44.99, desc: 'Family size' },
  { id: 'mega', name: 'Mega Pack', weight: '1kg', price: 79.99, desc: 'Best value' },
]

export default function ProductsPage() {
  const [selectedSize, setSelectedSize] = useState('classic')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState<{[key: string]: number}>({})

  const mainProductImage = `/images/products/${allProductImages[selectedImage].file}`
  const currentProduct = allProductImages[selectedImage]
  const currentSize = sizes.find(s => s.id === selectedSize) || sizes[1]

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('666_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('666_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = () => {
    const key = `${currentProduct.id}-${selectedSize}`
    const newCart = { ...cart, [key]: (cart[key] || 0) + quantity }
    setCart(newCart)
    
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).trackAddToCart) {
      (window as any).trackAddToCart(currentProduct.id, currentProduct.name, currentSize.price, quantity)
    }
    
    // Show notification
    alert(`Added ${quantity}x ${currentProduct.name} (${currentSize.name}) to cart!`)
  }

  const cartTotal = Object.entries(cart).reduce((sum, [key, qty]) => {
    const [productId, sizeId] = key.split('-')
    const size = sizes.find(s => s.id === sizeId)
    return sum + (size?.price || 0) * qty
  }, 0)

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-96 bg-black overflow-hidden">
        <Image
          src="/images/promo/1.png"
          alt="Products Banner"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-xl text-gray-300">Premium Spicy Slices Collection</p>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="py-16">
        <div className="container-wide px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Product Images */}
            <div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-pink-soft mb-4">
                <Image
                  src={mainProductImage}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {allProductImages.slice(0, 10).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-brand-pink' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={`/images/products/${img.file}`}
                      alt={img.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div>
              <span className="text-brand-pink font-heading tracking-widest text-sm">PREMIUM QUALITY</span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2 mb-4">
                {currentProduct.name}
              </h2>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-brand-gold">{'★'.repeat(5)}</div>
                <span className="text-gray-500">(2,847 reviews)</span>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Authentic Sichuan-style spicy beef slices, handcrafted with premium cuts and traditional spices. 
                Perfect for hot pot, stir-fry, or snacking straight from the pack.
              </p>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="font-bold text-brand-black mb-4">Select Size:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedSize === size.id
                          ? 'border-brand-pink bg-brand-pink/10'
                          : 'border-gray-200 hover:border-brand-pink'
                      }`}
                    >
                      <p className="font-bold text-brand-black">{size.name}</p>
                      <p className="text-sm text-gray-500">{size.weight}</p>
                      <p className="text-lg font-bold text-brand-pink mt-1">
                        ${size.price.toFixed(2)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-bold text-brand-black">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded-r-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-brand-pink">
                  ${currentSize.price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-xl">
                  ${(currentSize.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-bold">
                  SAVE 20%
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="snipcart-add-item w-full py-4 bg-brand-pink text-white font-bold text-lg rounded-full hover:bg-brand-pink-dark transition-colors mb-4"
                data-item-id={currentProduct.id}
                data-item-price={currentSize.price}
                data-item-url={`/products/${currentProduct.id}`}
                data-item-name={`666 Spicy Slices - ${currentProduct.name}`}
                data-item-description={`${currentProduct.name} - ${currentSize.weight}`}
                data-item-image={mainProductImage}
              >
                🛒 Add to Cart
              </button>
              
              <button className="snipcart-checkout w-full py-4 border-2 border-brand-black text-brand-black font-bold rounded-full hover:bg-brand-black hover:text-white transition-colors">
                Buy Now
              </button>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: '🚚', text: 'Free Shipping' },
                  { icon: '✓', text: '100% Authentic' },
                  { icon: '🎁', text: 'Gift Ready' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Products Gallery */}
      <section className="py-16 bg-brand-pink-soft">
        <div className="container-wide px-4">
          <h3 className="text-2xl font-bold text-brand-black mb-8 text-center">More Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allProductImages.slice(0, 8).map((img, index) => (
              <div 
                key={index} 
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={`/images/products/${img.file}`}
                  alt={img.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold">{img.name}</p>
                    <p className="text-brand-gold">From $9.99</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container-wide px-4">
          <h3 className="text-2xl font-bold text-brand-black mb-8 text-center">Customer Reviews</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah L.', text: 'Best spicy slices I\'ve ever had! The flavor is incredible.', rating: 5 },
              { name: 'Mike T.', text: 'Perfect for hot pot nights with friends. Will buy again!', rating: 5 },
              { name: 'Lisa K.', text: 'Fast delivery and great packaging. Product is amazing!', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl">
                <div className="flex text-brand-gold mb-3">{'★'.repeat(review.rating)}</div>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <p className="font-semibold text-brand-black">- {review.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="inline-block px-8 py-3 border-2 border-brand-pink text-brand-pink font-bold rounded-full hover:bg-brand-pink hover:text-white transition-all"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
