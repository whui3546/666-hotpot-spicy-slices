'use client'

import { useState, useEffect } from 'react'

interface AnalyticsEvent {
  event: string
  timestamp: string
  url?: string
  productId?: string
  productName?: string
  price?: number
  quantity?: number
}

interface Report {
  generated: string
  total_events: number
  page_views: number
  product_views: number
  add_to_cart: number
  recent_pages: string[]
}

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([])
  const [report, setReport] = useState<Report | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    loadData()
    // Auto refresh every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadData = () => {
    // Load analytics from localStorage
    const savedAnalytics = localStorage.getItem('666_analytics')
    if (savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics))
      } catch (e) {
        console.error('Failed to parse analytics')
      }
    }

    // Load latest report
    const savedReport = localStorage.getItem('666_latest_report')
    if (savedReport) {
      try {
        setReport(JSON.parse(savedReport))
      } catch (e) {
        console.error('Failed to parse report')
      }
    }

    setLastUpdate(new Date().toLocaleString())
  }

  const generateNewReport = () => {
    if (typeof window !== 'undefined' && (window as any).generateReport) {
      const newReport = (window as any).generateReport()
      setReport(newReport)
      alert('Report generated! Check the Analytics tab.')
    }
  }

  const clearAnalytics = () => {
    if (confirm('Clear all analytics data? This cannot be undone.')) {
      localStorage.removeItem('666_analytics')
      localStorage.removeItem('666_latest_report')
      setAnalytics([])
      setReport(null)
    }
  }

  // Calculate stats
  const totalPageViews = analytics.filter(e => e.event === 'page_view').length
  const totalProductViews = analytics.filter(e => e.event === 'product_view').length
  const totalAddToCart = analytics.filter(e => e.event === 'add_to_cart').length
  const uniqueVisitors = new Set(analytics.map(e => e.timestamp.split('T')[0])).size

  // Get recent events
  const recentEvents = analytics.slice(-20).reverse()

  // Get top products
  const productViews = analytics.filter(e => e.event === 'product_view')
  const topProducts = productViews.reduce((acc, e) => {
    acc[e.productId || 'unknown'] = (acc[e.productId || 'unknown'] || 0) + 1
    return acc
  }, {} as {[key: string]: number})
  const topProductsList = Object.entries(topProducts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  // Get cart items
  const cartItems = analytics.filter(e => e.event === 'add_to_cart')
  const topCartProducts = cartItems.reduce((acc, e) => {
    const key = e.productName || 'unknown'
    acc[key] = (acc[key] || 0) + (e.quantity || 1)
    return acc
  }, {} as {[key: string]: number})
  const topCartList = Object.entries(topCartProducts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container-wide px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-black">📊 Analytics Dashboard</h1>
              <p className="text-gray-500">Last updated: {lastUpdate}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={generateNewReport}
                className="px-6 py-3 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark"
              >
                📈 Generate Report
              </button>
              <button
                onClick={loadData}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container-wide px-4">
          <div className="flex gap-8">
            {['overview', 'events', 'products', 'cart', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-brand-pink text-brand-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' ? 'Overview' : 
                 tab === 'events' ? 'Live Events' :
                 tab === 'products' ? 'Product Views' :
                 tab === 'cart' ? 'Cart Activity' : 'Reports'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-gray-500 mb-2">Total Events</p>
                <p className="text-3xl font-bold text-brand-black">{analytics.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-gray-500 mb-2">Page Views</p>
                <p className="text-3xl font-bold text-brand-pink">{totalPageViews}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-gray-500 mb-2">Product Views</p>
                <p className="text-3xl font-bold text-brand-pink">{totalProductViews}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-gray-500 mb-2">Add to Cart</p>
                <p className="text-3xl font-bold text-brand-gold">{totalAddToCart}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-gray-500 mb-2">Cart Rate</p>
                <p className="text-3xl font-bold text-brand-black">
                  {totalProductViews > 0 ? ((totalAddToCart / totalProductViews) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              {recentEvents.length > 0 ? (
                <div className="space-y-3">
                  {recentEvents.slice(0, 10).map((event, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">
                        {event.event === 'page_view' ? '👁️' : 
                         event.event === 'product_view' ? '📦' : 
                         event.event === 'add_to_cart' ? '🛒' : '📊'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-brand-black">
                          {event.event === 'page_view' ? 'Page View' : 
                           event.event === 'product_view' ? `Viewed: ${event.productName}` : 
                           event.event === 'add_to_cart' ? `Added to cart: ${event.productName}` : event.event}
                        </p>
                        {event.price && (
                          <p className="text-sm text-gray-500">${event.price.toFixed(2)}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No analytics data yet. Visit your site to start collecting data.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">All Events ({analytics.length})</h2>
              <button
                onClick={clearAnalytics}
                className="px-4 py-2 text-red-500 border border-red-500 rounded-full hover:bg-red-50"
              >
                Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Event</th>
                    <th className="text-left py-3 px-4">Details</th>
                    <th className="text-left py-3 px-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.slice(-100).reverse().map((event, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {event.event}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {event.productName && `${event.productName} - `}
                        {event.price && `$${event.price}`}
                        {event.quantity && ` x${event.quantity}`}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold mb-4">Top Viewed Products</h2>
              {topProductsList.length > 0 ? (
                <div className="space-y-3">
                  {topProductsList.map(([productId, count], i) => (
                    <div key={productId} className="flex items-center gap-4">
                      <span className="w-8 h-8 bg-brand-pink text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{productId}</p>
                      </div>
                      <span className="text-brand-pink font-bold">{count} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No product views yet</p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold mb-4">Top Added to Cart</h2>
              {topCartList.length > 0 ? (
                <div className="space-y-3">
                  {topCartList.map(([name, count], i) => (
                    <div key={name} className="flex items-center gap-4">
                      <span className="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{name}</p>
                      </div>
                      <span className="text-brand-gold font-bold">{count} units</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No cart activity yet</p>
              )}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">📊 Auto Generated Reports</h2>
              <button
                onClick={generateNewReport}
                className="px-6 py-3 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark"
              >
                Generate New Report
              </button>
            </div>
            
            {report ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Report Generated</p>
                  <p className="text-lg font-bold">{new Date(report.generated).toLocaleString()}</p>
                </div>
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Total Events Tracked</p>
                  <p className="text-3xl font-bold text-brand-pink">{report.total_events}</p>
                </div>
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Page Views</p>
                  <p className="text-3xl font-bold text-brand-pink">{report.page_views}</p>
                </div>
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Product Views</p>
                  <p className="text-3xl font-bold text-brand-pink">{report.product_views}</p>
                </div>
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Add to Cart Events</p>
                  <p className="text-3xl font-bold text-brand-gold">{report.add_to_cart}</p>
                </div>
                <div className="p-6 bg-brand-pink-soft rounded-xl">
                  <p className="text-gray-500 mb-2">Conversion Rate</p>
                  <p className="text-3xl font-bold text-brand-black">
                    {report.product_views > 0 ? ((report.add_to_cart / report.product_views) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="md:col-span-2 p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 mb-2">Recent Pages Visited</p>
                  <div className="flex flex-wrap gap-2">
                    {report.recent_pages.map((url, i) => (
                      <span key={i} className="px-3 py-1 bg-white border rounded-full text-sm">
                        {url}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No reports generated yet</p>
                <button
                  onClick={generateNewReport}
                  className="px-8 py-4 bg-brand-pink text-white font-bold rounded-full hover:bg-brand-pink-dark"
                >
                  Generate First Report
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container-wide px-4 py-4 text-center text-gray-500 text-sm">
          666 Hot Pot Spicy Slices - Analytics Dashboard | Auto-refresh every 30 seconds
        </div>
      </footer>
    </main>
  )
}
