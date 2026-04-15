'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Promo images for hero carousel
  const heroImages = [
    '/images/promo/1.png',
    '/images/promo/4.png',
    '/images/promo/5.png',
    '/images/promo/7.png',
    '/images/promo/8.png',
    '/images/promo/9.png',
  ]

  // Product images for featured section
  const productImages = [
    '/images/products/export_1.jpg',
    '/images/products/Spicy Slices for Hot Pot_楼层3.jpg',
    '/images/products/Spicy Slices for Hot Pot_楼层4.jpg',
    '/images/products/Spicy Slices for Hot Pot_楼层7.jpg',
  ]

  // User review images
  const userImages = [
    '/images/users/用户1.png',
    '/images/users/用户2.png',
    '/images/users/用户3.png',
    '/images/users/用户4.png',
    '/images/users/用户5.png',
    '/images/users/用户7.png',
  ]

  // Auto-slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <main className="min-h-screen">
      {/* Hero Section - Full Screen Carousel */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Background Images */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`666 Hot Pot Spicy Slices ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          </div>
        ))}
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Image
              src="/images/logo-transparent.png"
              alt="666 Hot Pot Spicy Slices Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="text-brand-pink">666</span> Hot Pot
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-gold mb-8 drop-shadow-lg">
            Spicy Slices
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12 drop-shadow">
            Experience Authentic Sichuan Flavor
          </p>
          
          <div className="flex gap-4">
            <Link
              href="/products"
              className="px-10 py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark transition-all hover:scale-105 shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all"
            >
              Learn More
            </Link>
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-brand-pink w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Gallery */}
      <section className="py-24 bg-white">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">PREMIUM COLLECTION</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2">Our Spicy Slices</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <div key={index} className="relative aspect-square group overflow-hidden rounded-2xl">
                <Image
                  src={img}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg">666 Spicy Slices</p>
                    <p className="text-brand-gold">From $24.99</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block px-10 py-4 bg-brand-black text-white font-bold rounded-full hover:bg-brand-pink transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Gallery - Apple Style */}
      <section className="bg-black py-24">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Large Left Image */}
            <div className="relative aspect-square md:aspect-auto md:row-span-2 rounded-3xl overflow-hidden group">
              <Image
                src="/images/promo/5.png"
                alt="666 Hot Pot Main"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Right Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/promo/4.jpg"
                  alt="Promo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/promo/6.jpg"
                  alt="Promo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/promo/10.jpg"
                  alt="Promo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/promo/12.jpg"
                  alt="Promo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews - Before Product Details */}
      <section className="py-24 bg-brand-pink-soft">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">FAN ZONE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2">What Fans Say</h2>
          </div>

          {/* User Photo Wall */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-12">
            {userImages.slice(0, 12).map((img, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={img}
                  alt={`User ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Featured Reviews */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah L.', location: 'New York, USA', text: 'Absolutely addictive! Perfect spice level.', img: userImages[0] },
              { name: 'Chen Wei', location: 'Singapore', text: 'Authentic Sichuan taste, brings back memories!', img: userImages[1] },
              { name: 'Maria G.', location: 'Madrid, Spain', text: 'Fast shipping, amazing quality. Ordered 3 more!', img: userImages[2] },
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex text-brand-gold mb-4">{'★'.repeat(5)}</div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={review.img} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-black">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-block px-10 py-4 border-2 border-brand-pink text-brand-pink font-bold rounded-full hover:bg-brand-pink hover:text-white transition-all"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-pink to-brand-pink-dark text-white">
        <div className="container-wide px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Global Family</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Become a 666 Hot Pot distributor. Partners in 15+ countries worldwide.
          </p>
          <Link
            href="/franchise"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-black font-bold rounded-full hover:bg-brand-gold-light transition-colors"
          >
            Explore Franchise Opportunities
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container-wide px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Image
              src="/images/logo-transparent.png"
              alt="666 Logo"
              width={60}
              height={60}
            />
            <p className="text-gray-400">© 2026 666 Hot Pot Spicy Slices. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/products" className="hover:text-brand-pink transition-colors">Products</Link>
              <Link href="/reviews" className="hover:text-brand-pink transition-colors">Reviews</Link>
              <Link href="/franchise" className="hover:text-brand-pink transition-colors">Franchise</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
