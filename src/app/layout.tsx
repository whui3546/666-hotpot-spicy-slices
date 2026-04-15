import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '666 Hot Pot Spicy Slices | Premium Spicy Beef',
  description: 'Authentic Sichuan Hot Pot Spicy Beef Slices - Premium quality, handcrafted with traditional spices.',
  keywords: ['spicy beef', 'hot pot', 'Sichuan', '666', 'beef jerky', 'Chinese snacks'],
  authors: [{ name: '666 Hot Pot Spicy Slices' }],
  openGraph: {
    title: '666 Hot Pot Spicy Slices',
    description: 'Authentic Sichuan Hot Pot Spicy Beef Slices',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Snipcart CSS */}
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.4/default/snipcart.css" />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <div className="pt-16 md:pt-20">
          {children}
        </div>
        <Footer />
        
        {/* Snipcart Widget */}
        <div
          hidden
          id="snipcart"
          data-api-key="YOUR_SNIPCART_PUBLIC_API_KEY"
          data-config-modal-style="side"
        />
        {/* Snipcart JS */}
        <script async src="https://cdn.snipcart.com/themes/v3.7.4/default/snipcart.js" />
        
        {/* Analytics Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple analytics tracking
              (function() {
                window.analytics = window.analytics || [];
                
                // Track page views
                function trackPageView(url) {
                  window.analytics.push({
                    event: 'page_view',
                    url: url,
                    timestamp: new Date().toISOString()
                  });
                  saveAnalytics();
                }
                
                // Track product views
                function trackProductView(productId, productName, price) {
                  window.analytics.push({
                    event: 'product_view',
                    productId: productId,
                    productName: productName,
                    price: price,
                    timestamp: new Date().toISOString()
                  });
                  saveAnalytics();
                }
                
                // Track add to cart
                function trackAddToCart(productId, productName, price, quantity) {
                  window.analytics.push({
                    event: 'add_to_cart',
                    productId: productId,
                    productName: productName,
                    price: price,
                    quantity: quantity,
                    timestamp: new Date().toISOString()
                  });
                  saveAnalytics();
                }
                
                // Save to localStorage
                function saveAnalytics() {
                  try {
                    localStorage.setItem('666_analytics', JSON.stringify(window.analytics.slice(-1000)));
                  } catch(e) {}
                }
                
                // Auto track page views
                trackPageView(window.location.href);
                
                // Expose functions
                window.trackProductView = trackProductView;
                window.trackAddToCart = trackAddToCart;
                
                // Report generation (runs every 12 hours)
                function generateReport() {
                  const data = JSON.parse(localStorage.getItem('666_analytics') || '[]');
                  const report = {
                    generated: new Date().toISOString(),
                    total_events: data.length,
                    page_views: data.filter(e => e.event === 'page_view').length,
                    product_views: data.filter(e => e.event === 'product_view').length,
                    add_to_cart: data.filter(e => e.event === 'add_to_cart').length,
                    recent_pages: [...new Set(data.filter(e => e.event === 'page_view').slice(-10).map(e => e.url))]
                  };
                  // Store report
                  try {
                    localStorage.setItem('666_report_' + Date.now(), JSON.stringify(report));
                    localStorage.setItem('666_latest_report', JSON.stringify(report));
                  } catch(e) {}
                  return report;
                }
                
                window.generateReport = generateReport;
                
                // Auto-generate report every 12 hours
                setInterval(generateReport, 12 * 60 * 60 * 1000);
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
