'use client'

import Image from 'next/image'

// All user photos from the folder
const userPhotos = [
  '用户1.png', '用户2.png', '用户3.png', '用户4.png', '用户5.png', '用户7.png',
  '用户9.png', '用户10.png', '用户11.png', '用户12.png', '用户13.png', '用户14.png',
  '用户16.png', '用户17.png', '用户18.png',
  '微信图片_20260330213439_165_248.jpg',
  '微信图片_20260330213444_166_248.jpg',
  '微信图片_20260330213457_168_248.jpg',
  '微信图片_20260330213505_169_248.jpg',
  '微信图片_20260330213512_170_248.jpg',
  '微信图片_20260330213521_171_248.jpg',
  '微信图片_20260330213527_172_248.jpg',
  '微信图片_20260330213533_173_248.jpg',
  '微信图片_20260330213539_174_248.jpg',
  '微信图片_20260330213546_175_248.jpg',
  '微信图片_20260330213552_176_248.jpg',
  '微信图片_20260330213558_177_248.jpg',
  '微信图片_20260330213603_178_248.jpg',
  '微信图片_20260330213609_179_248.jpg',
]

const featuredReviews = [
  {
    name: 'Sarah L.',
    location: 'New York, USA',
    text: 'Absolutely addictive! The perfect level of spice and the beef is so tender. Best snack I\'ve ever had! Already ordered 3 more packs for my whole office.',
    rating: 5,
    photo: '用户1.png',
  },
  {
    name: 'Chen Wei',
    location: 'Singapore',
    text: 'Tastes just like authentic Sichuan hot pot. Brings back memories of my trip to Chengdu. The numbing spice is perfectly balanced!',
    rating: 5,
    photo: '用户2.png',
  },
  {
    name: 'Maria G.',
    location: 'Madrid, Spain',
    text: 'Fast shipping and amazing quality. Already ordered 3 more packs for my friends! They all loved it.',
    rating: 5,
    photo: '用户3.png',
  },
  {
    name: 'Yuki T.',
    location: 'Tokyo, Japan',
    text: 'So delicious! The spice level is perfect for Japanese taste. Great with rice or noodles.',
    rating: 5,
    photo: '用户4.png',
  },
  {
    name: 'Alex R.',
    location: 'London, UK',
    text: 'Finally found authentic spicy slices in Europe! The flavor is incredible and shipping was super fast.',
    rating: 5,
    photo: '用户5.png',
  },
  {
    name: 'Kim J.',
    location: 'Seoul, Korea',
    text: '韩国人也爱吃辣！这个味道真的太棒了。已经回购5次了！',
    rating: 5,
    photo: '用户7.png',
  },
]

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-brand-pink overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/promo/1.png"
            alt="Reviews Banner"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Customer Reviews</h1>
            <p className="text-xl text-white/80">See what our fans are saying</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex text-brand-gold">{'★'.repeat(5)}</div>
              <span className="text-white font-bold">4.9</span>
              <span className="text-white/80">(2,847 reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Photo Wall - Full Width */}
      <section className="py-8 bg-gray-50">
        <div className="px-2">
          <h2 className="text-2xl font-bold text-brand-black mb-4 text-center">Fan Photo Wall</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
            {userPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={`/images/users/${photo}`}
                  alt={`Fan photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16">
        <div className="container-wide px-4">
          <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">Featured Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/images/users/${review.photo}`}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex text-brand-gold mb-1">{'★'.repeat(review.rating)}</div>
                    <p className="font-bold text-white">{review.name}</p>
                    <p className="text-sm text-gray-300">{review.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-black text-white">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2,847+', label: 'Reviews' },
              { value: '4.9', label: 'Average Rating' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '15+', label: 'Countries' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-brand-gold">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More User Photos - Masonry Grid */}
      <section className="py-16 bg-white">
        <div className="container-wide px-4">
          <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">Share Your Moments</h2>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {userPhotos.slice(0, 20).map((photo, index) => (
              <div
                key={index}
                className="relative mb-4 overflow-hidden rounded-xl break-inside-avoid group"
              >
                <Image
                  src={`/images/users/${photo}`}
                  alt={`User photo ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Tag us #666HotPotSpicySlices to be featured!</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-pink">
        <div className="container-wide px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Try?</h2>
          <p className="text-xl text-white/80 mb-8">Join thousands of happy customers worldwide</p>
          <a
            href="/products"
            className="inline-block px-10 py-4 bg-white text-brand-pink font-bold rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  )
}
