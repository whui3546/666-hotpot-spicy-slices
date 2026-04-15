'use client'

import Image from 'next/image'

const storyImages = [
  '/images/promo/1.png',
  '/images/promo/4.png',
  '/images/promo/5.png',
  '/images/promo/7.png',
]

const values = [
  { icon: '🌶️', title: 'Authentic Flavor', desc: 'Traditional Sichuan recipe passed down through generations' },
  { icon: '🥩', title: 'Premium Quality', desc: 'Only the finest beef cuts, carefully selected and processed' },
  { icon: '🌿', title: 'Natural Ingredients', desc: 'No artificial preservatives, only real spices and herbs' },
  { icon: '❤️', title: 'Made with Love', desc: 'Handcrafted in small batches for consistent quality' },
]

const timeline = [
  { year: '2018', event: 'Started in a small kitchen in Chengdu' },
  { year: '2020', event: 'First international shipment to the US' },
  { year: '2022', event: 'Opened our modern production facility' },
  { year: '2024', event: 'Reached 15+ countries worldwide' },
  { year: '2026', event: 'Launching new product lines' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-96 bg-black overflow-hidden">
        <Image
          src="/images/promo/5.png"
          alt="About Us"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="text-brand-gold font-heading tracking-widest text-sm">OUR STORY</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4">About 666</h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-black mb-6">
                From Sichuan to the World
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                666 Hot Pot Spicy Slices was born from a passion for authentic Sichuan cuisine. 
                What started in a small kitchen in Chengdu has grown into a global brand loved by 
                spice enthusiasts worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our signature recipe combines premium beef with carefully selected Sichuan spices, 
                including the famous Sichuan peppercorn that creates the distinctive "mala" sensation - 
                numbing and spicy at the same time.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every slice is handcrafted with care, ensuring the perfect balance of heat, 
                numbing sensation, and rich umami flavor that makes our product truly addictive.
              </p>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/promo/1.png"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-pink-soft">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">WHAT WE STAND FOR</span>
            <h2 className="text-4xl font-bold text-brand-black mt-2">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">OUR JOURNEY</span>
            <h2 className="text-4xl font-bold text-brand-black mt-2">Milestones</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 mb-8 last:mb-0">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-2xl font-bold text-brand-pink">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-brand-gold rounded-full mt-2" />
                <div className="pt-1">
                  <p className="text-gray-600">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-brand-black">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-heading tracking-widest text-sm">GALLERY</span>
            <h2 className="text-4xl font-bold text-white mt-2">Our Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {storyImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-brand-pink">
        <div className="container-wide px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-brand-pink font-bold rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
