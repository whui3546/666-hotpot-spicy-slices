import Image from 'next/image'
import Link from 'next/link'

const product = {
  id: '666-spicy-beef-original',
  name: '666 Hot Pot Spicy Beef - Original',
  description: 'Our signature spicy beef slices with authentic Sichuan hot pot flavor. Each piece is marinated for 24 hours in our secret blend of Sichuan peppercorns, dried chilies, and premium spices.',
  longDescription: `Experience the authentic taste of Sichuan with our signature 666 Hot Pot Spicy Beef Slices. 
  
We use only premium beef cuts, carefully selected for their tenderness and flavor. Each slice is hand-marinated in our secret spice blend for 24 hours, allowing the flavors to penetrate deep into the meat.

Our spice blend features authentic Sichuan peppercorns that create the signature "málà" (numbing and spicy) sensation that Sichuan cuisine is famous for. The heat builds gradually, leaving a pleasant tingling sensation on your tongue.

Perfect for snacking, sharing with friends, or as a unique gift for food lovers.`,
  price: 24.99,
  originalPrice: 29.99,
  weight: '200g',
  spiceLevel: 'Medium',
  heatLevel: 3,
  numbingLevel: 4,
  image: '/images/products/original.jpg',
  gallery: ['/images/products/original-1.jpg', '/images/products/original-2.jpg', '/images/products/original-3.jpg'],
  ingredients: ['Premium beef', 'Sichuan peppercorns', 'Dried chilies', 'Soy sauce', 'Ginger', 'Garlic', 'Star anise', 'Cinnamon'],
  nutrition: {
    servingSize: '50g',
    calories: 180,
    protein: '15g',
    fat: '12g',
    carbs: '3g',
    sodium: '380mg',
  },
  reviews: [
    { id: 1, name: 'Sarah L.', rating: 5, date: '2024-03-15', text: 'Absolutely addictive! The perfect balance of spice and flavor. I\'ve already ordered 3 more packs!', avatar: 'S', location: 'New York, USA' },
    { id: 2, name: 'Chen Wei', rating: 5, date: '2024-03-10', text: 'Tastes just like the hot pot I had in Chengdu. The numbing sensation is perfect!', avatar: 'C', location: 'Singapore' },
    { id: 3, name: 'Maria G.', rating: 4, date: '2024-03-05', text: 'Great flavor, but a bit too spicy for me. Still delicious though!', avatar: 'M', location: 'Madrid, Spain' },
  ],
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-wide section-padding py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-pink">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-pink">Products</Link>
            <span>/</span>
            <span className="text-brand-black">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-brand-pink-soft rounded-2xl mb-4 flex items-center justify-center text-brand-pink/30 text-6xl font-bold">
                [Main Image]
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-brand-pink-soft rounded-lg flex items-center justify-center text-brand-pink/30 text-2xl">
                    [{i}]
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-bold">Bestseller</span>
                <span className="text-gray-500 text-sm">{product.weight}</span>
              </div>
              <h1 className="heading-section text-brand-black mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-brand-gold">
                  {'★'.repeat(5)}
                </div>
                <span className="text-gray-600">4.9 (128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-brand-pink">${product.price}</span>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                <span className="bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full text-sm font-bold">
                  Save 17%
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Spice/Numbing Level */}
              <div className="flex gap-8 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Spice Level</span>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-2 rounded-full ${i <= product.heatLevel ? 'bg-brand-pink' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Numbing Level</span>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-2 rounded-full ${i <= product.numbingLevel ? 'bg-brand-gold' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-l-full">-</button>
                  <span className="w-16 text-center font-bold">1</span>
                  <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-r-full">+</button>
                </div>
                <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
              </div>

              {/* Buy Now */}
              <button className="w-full btn-secondary mb-8">
                Buy Now
              </button>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free shipping over $50
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  30-day returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - MOVED BEFORE Product Details */}
      <section className="py-16 bg-brand-pink-soft">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <span className="text-brand-pink font-heading tracking-widest text-sm">CUSTOMER REVIEWS</span>
            <h2 className="heading-section text-brand-black mt-2">What People Are Saying</h2>
            <div className="gold-line w-24 mx-auto mt-4"></div>
          </div>

          {/* Review Stats */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-brand-pink">4.9</div>
                <div className="flex text-brand-gold text-xl my-2">{'★'.repeat(5)}</div>
                <p className="text-gray-600">Based on 128 reviews</p>
              </div>
              <div className="flex-1 w-full">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4 mb-2">
                    <span className="w-8 text-sm text-gray-600">{stars}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-gold rounded-full"
                        style={{ width: stars === 5 ? '85%' : stars === 4 ? '10%' : '5%' }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600 text-right">
                      {stars === 5 ? '108' : stars === 4 ? '15' : '5'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <button className="btn-primary">Write a Review</button>
                <button className="btn-outline">Share Your Photo</button>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl">
                <div className="flex text-brand-gold mb-3">{'★'.repeat(review.rating)}</div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-white font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-black">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/reviews" className="btn-outline">View All Reviews</Link>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-white">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-8 border-b mb-8">
              {['Description', 'Ingredients', 'Nutrition', 'Shipping'].map((tab, i) => (
                <button
                  key={tab}
                  className={`pb-4 font-medium transition-colors ${
                    i === 0 ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-gray-500 hover:text-brand-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-heading font-bold text-brand-black mb-4">Product Description</h3>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{product.longDescription}</p>

              <h3 className="text-xl font-heading font-bold text-brand-black mt-8 mb-4">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span key={ingredient} className="px-4 py-2 bg-brand-pink-soft text-brand-pink rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-heading font-bold text-brand-black mt-8 mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-xl font-bold text-brand-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-wide section-padding">
          <h2 className="heading-section text-brand-black text-center mb-12">You May Also Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Extra Hot Edition', price: 26.99, image: '/images/products/extra-hot.jpg' },
              { name: 'Gift Box Set', price: 69.99, image: '/images/products/gift-box.jpg' },
              { name: 'Family Pack', price: 89.99, image: '/images/products/family-pack.jpg' },
            ].map((item, i) => (
              <Link key={i} href="/products" className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-brand-pink-soft flex items-center justify-center text-brand-pink/30 text-4xl">
                  [Image]
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-brand-black">{item.name}</h3>
                  <p className="text-brand-pink font-bold mt-2">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
