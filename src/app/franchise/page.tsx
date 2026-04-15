'use client'

import Image from 'next/image'

const promoImages = [
  '/images/promo/1.png',
  '/images/promo/4.png',
  '/images/promo/5.png',
  '/images/promo/7.png',
  '/images/promo/8.png',
  '/images/promo/11.png',
]

const benefits = [
  { icon: '🌍', title: 'Global Distribution', desc: 'Join partners in 15+ countries worldwide' },
  { icon: '📦', title: 'Premium Products', desc: 'High-quality, in-demand spicy slices' },
  { icon: '💼', title: 'Full Support', desc: 'Marketing materials, training, and 24/7 support' },
  { icon: '💰', title: 'High Margins', desc: 'Competitive wholesale pricing with great margins' },
  { icon: '🚀', title: 'Fast Growth', desc: 'Join a rapidly expanding brand' },
  { icon: '🎯', title: 'Exclusive Territory', desc: 'Protected distribution rights in your area' },
]

export default function FranchisePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-black overflow-hidden">
        <Image
          src="/images/promo/5.png"
          alt="Franchise Hero"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="text-brand-gold font-heading tracking-widest text-sm">BUSINESS OPPORTUNITY</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
              Become a <span className="text-brand-pink">666</span> Partner
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
              Join our global distribution network and bring authentic Sichuan flavor to your market
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-10 py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark transition-colors"
              >
                Apply Now
              </a>
              <a
                href="#benefits"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-black text-white">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'Countries' },
              { value: '500+', label: 'Retail Partners' },
              { value: '50K+', label: 'Monthly Orders' },
              { value: '$2M+', label: 'Partner Revenue' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-brand-gold">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-white">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">WHY PARTNER WITH US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2">Benefits of Partnership</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-brand-pink-soft transition-colors"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-brand-pink-soft">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">OUR PRODUCTS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2">Premium Quality</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {promoImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-3xl overflow-hidden group"
              >
                <Image
                  src={img}
                  alt={`Product ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container-wide px-4">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-heading tracking-widest text-sm">THE PROCESS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mt-2">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Apply', desc: 'Submit your application online' },
              { step: '02', title: 'Review', desc: 'Our team reviews your application' },
              { step: '03', title: 'Agreement', desc: 'Sign distribution agreement' },
              { step: '04', title: 'Launch', desc: 'Start selling in your territory' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-brand-pink text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 bg-brand-black text-white">
        <div className="container-wide px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-brand-gold font-heading tracking-widest text-sm">GET STARTED</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">Apply Now</h2>
              <p className="text-gray-400 mt-4">Fill out the form and our team will contact you within 24 hours</p>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CN">China</option>
                    <option value="UK">United Kingdom</option>
                    <option value="JP">Japan</option>
                    <option value="KR">South Korea</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Business Type *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="retail">Retail Store</option>
                  <option value="wholesale">Wholesale Distributor</option>
                  <option value="online">Online Store</option>
                  <option value="restaurant">Restaurant/Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-pink focus:outline-none"
                  placeholder="Tell us about your business..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-brand-pink text-white font-bold rounded-lg hover:bg-brand-pink-dark transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Global Partners Map */}
      <section className="py-16 bg-brand-pink-soft">
        <div className="container-wide px-4 text-center">
          <h3 className="text-2xl font-bold text-brand-black mb-4">Our Global Network</h3>
          <p className="text-gray-600 mb-8">Currently operating in 15+ countries including USA, China, Japan, Korea, UK, Germany, Australia, and more</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['🇺🇸 USA', '🇨🇳 China', '🇯🇵 Japan', '🇰🇷 Korea', '🇬🇧 UK', '🇩🇪 Germany', '🇦🇺 Australia', '🇨🇦 Canada', '🇸🇬 Singapore'].map((country, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
