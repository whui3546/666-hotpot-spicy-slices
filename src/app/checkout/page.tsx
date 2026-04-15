import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-brand-black text-white py-8">
        <div className="container-wide section-padding flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white font-bold">
              666
            </div>
            <span className="font-heading font-bold">Hot Pot Spicy Slices</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-brand-gold">🔒 Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div className="space-y-8">
              {/* Contact */}
              <div className="bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-heading font-bold text-brand-black mb-4">Contact Information</h2>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none"
                />
                <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  Email me with news and offers
                </label>
              </div>

              {/* Shipping */}
              <div className="bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-heading font-bold text-brand-black mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Singapore</option>
                    <option>Other</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                    <input type="text" placeholder="Last name" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Address" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                    <input type="text" placeholder="State" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                    <input type="text" placeholder="ZIP code" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  </div>
                  <input type="tel" placeholder="Phone (for delivery updates)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-heading font-bold text-brand-black mb-4">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 border-brand-pink rounded-xl cursor-pointer bg-brand-pink/5">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-brand-pink" />
                    <span className="flex-1 font-medium">Credit Card</span>
                    <span className="text-sm text-gray-500">Visa, Mastercard, Amex</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-brand-pink transition-colors">
                    <input type="radio" name="payment" className="w-4 h-4 text-brand-pink" />
                    <span className="flex-1 font-medium">PayPal</span>
                    <span className="text-sm text-gray-500">Fast & secure</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-brand-pink transition-colors">
                    <input type="radio" name="payment" className="w-4 h-4 text-brand-pink" />
                    <span className="flex-1 font-medium">Alipay</span>
                    <span className="text-sm text-gray-500">支付宝</span>
                  </label>
                </div>

                {/* Card Form */}
                <div className="space-y-4">
                  <input type="text" placeholder="Card number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                    <input type="text" placeholder="CVC" className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Name on card" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-pink focus:outline-none" />
                </div>
              </div>

              {/* Billing */}
              <div className="bg-white p-6 rounded-2xl">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-gray-700">Billing address same as shipping</span>
                </label>
              </div>

              {/* Submit */}
              <button className="w-full btn-primary py-4 text-lg">
                Complete Order - $59.97
              </button>

              <p className="text-center text-sm text-gray-500">
                By completing your purchase, you agree to our{' '}
                <Link href="/terms" className="text-brand-pink hover:underline">Terms of Service</Link>
              </p>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-brand-black text-white p-6 rounded-2xl">
                <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-brand-pink/20 rounded-lg flex items-center justify-center text-sm">
                      [Img]
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">666 Hot Pot Spicy Beef - Original</p>
                      <p className="text-sm text-gray-400">200g × 2</p>
                    </div>
                    <p className="font-bold">$49.98</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-brand-pink/20 rounded-lg flex items-center justify-center text-sm">
                      [Img]
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">666 Hot Pot Spicy Beef - Gift Box</p>
                      <p className="text-sm text-gray-400">600g × 1</p>
                    </div>
                    <p className="font-bold">$69.99</p>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-white/20">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>$119.97</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/20">
                    <span>Total</span>
                    <span className="text-brand-gold">$119.97</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-pink"
                    />
                    <button className="px-4 py-2 bg-brand-pink rounded-lg font-medium hover:bg-brand-pink-dark transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
