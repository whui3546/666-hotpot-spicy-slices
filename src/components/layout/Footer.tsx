import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    about: [
      { label: 'Our Story', href: '/about' },
      { label: 'How It\'s Made', href: '/about#process' },
      { label: 'Quality Promise', href: '/about#quality' },
      { label: 'Sustainability', href: '/about#sustainability' },
    ],
    support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Contact Us', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  }

  const socialLinks = [
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'TikTok', href: '#', icon: '🎵' },
    { label: 'Facebook', href: '#', icon: '👥' },
    { label: 'YouTube', href: '#', icon: '📺' },
  ]

  return (
    <footer className="bg-brand-black text-white">
      {/* Main Footer */}
      <div className="container-wide section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-white font-bold text-2xl">
                666
              </div>
              <span className="font-heading font-bold text-2xl">Hot Pot Spicy Slices</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium spicy beef slices crafted with authentic Sichuan hot pot spices. 
              Bringing the heat to your doorstep, worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-brand-black-soft rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-gold">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-gold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-brand-gold">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-brand-black-soft">
        <div className="container-wide section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 666 Hot Pot Spicy Slices. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">We accept:</span>
              <div className="flex gap-2">
                {['PayPal', 'Visa', 'Mastercard', 'Amex', 'Alipay'].map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 bg-brand-black-soft rounded text-xs text-gray-400"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
