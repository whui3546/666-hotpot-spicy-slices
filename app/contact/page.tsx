'use client'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-64 bg-brand-black">
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div>
            <span className="text-brand-gold font-heading tracking-widest text-sm">GET IN TOUCH</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4">Contact Us</h1>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container-wide px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-brand-black mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-pink focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-pink focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-pink focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-pink focus:outline-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-pink text-white font-bold rounded-lg hover:bg-brand-pink-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-brand-black mb-8">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@666hotpot.com', link: 'mailto:hello@666hotpot.com' },
                  { icon: '📱', label: 'WhatsApp', value: '+1 (555) 666-7777', link: 'https://wa.me/15556667777' },
                  { icon: '📍', label: 'Address', value: 'Chengdu, Sichuan, China' },
                  { icon: '🕐', label: 'Business Hours', value: 'Mon-Fri: 9AM-6PM (CST)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-500">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-brand-black font-semibold hover:text-brand-pink">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-brand-black font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-brand-black mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'Instagram', url: '#' },
                    { name: 'Facebook', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'TikTok', url: '#' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      className="w-12 h-12 bg-brand-pink text-white rounded-full flex items-center justify-center hover:bg-brand-pink-dark transition-colors"
                    >
                      {social.name[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-pink-soft">
        <div className="container-wide px-4">
          <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How long does shipping take?', a: 'International shipping typically takes 7-14 business days. Domestic orders in China arrive within 2-3 days.' },
              { q: 'Do you offer wholesale pricing?', a: 'Yes! Please visit our Franchise page or contact us directly for wholesale and distribution inquiries.' },
              { q: 'What is the shelf life?', a: 'Our spicy slices have a shelf life of 12 months when stored in a cool, dry place.' },
              { q: 'Are your products halal certified?', a: 'We offer halal-certified options for select markets. Please contact us for availability.' },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-6 cursor-pointer">
                <summary className="font-bold text-brand-black">{faq.q}</summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
