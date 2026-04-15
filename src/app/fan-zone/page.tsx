'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const fanPhotos = [
  { id: 1, user: 'SpicyQueen_99', avatar: '👩‍🦰', likes: 2847, location: 'Los Angeles', reward: '$50', photo: '[User Photo]' },
  { id: 2, user: 'BeefMaster_CN', avatar: '👨‍🍳', likes: 1923, location: 'Chengdu', reward: '$30', photo: '[User Photo]' },
  { id: 3, user: 'HotPotLover', avatar: '👩‍🎤', likes: 3456, location: 'London', reward: '$100', photo: '[User Photo]' },
  { id: 4, user: 'SpicyKing2024', avatar: '🧑‍🚀', likes: 1567, location: 'Tokyo', reward: '$20', photo: '[User Photo]' },
  { id: 5, user: 'MalaPrincess', avatar: '👸', likes: 4521, location: 'Singapore', reward: '$200', photo: '[User Photo]' },
  { id: 6, user: 'ChiliChampion', avatar: '🤴', likes: 2890, location: 'New York', reward: '$75', photo: '[User Photo]' },
]

const leaderboard = [
  { rank: 1, user: 'MalaPrincess', reward: '$5,000 + 🏎️ Porsche', likes: '45.2K', badge: '👑' },
  { rank: 2, user: 'SpicyQueen_99', reward: '$2,000', likes: '28.4K', badge: '🥈' },
  { rank: 3, user: 'ChiliChampion', reward: '$1,000', likes: '28.9K', badge: '🥉' },
  { rank: 4, user: 'HotPotLover', reward: '$500', likes: '34.5K', badge: '🔥' },
  { rank: 5, user: 'BeefMaster_CN', reward: '$300', likes: '19.2K', badge: '🔥' },
]

export default function FanZonePage() {
  const [activeTab, setActiveTab] = useState('photos')

  return (
    <main className="min-h-screen bg-brand-black">
      {/* Hero - Grand Prize Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-pink via-purple-600 to-brand-black"></div>
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>

        <div className="container-wide section-padding relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full font-bold text-lg mb-8 animate-bounce">
            <span className="text-2xl">🏆</span>
            MEGA GIVEAWAY
            <span className="text-2xl">🏆</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
            Win
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold animate-pulse">
              $100,000
            </span>
            <br />
            Prize Pool!
          </h1>

          <div className="relative max-w-4xl mx-auto my-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-pink via-brand-gold to-brand-pink rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-brand-gold/50">
              <div className="text-8xl mb-4">🏎️</div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-gold mb-2">
                Luxury Supercar!
              </h2>
              <p className="text-xl text-gray-400">Porsche 911 / Lamborghini / Ferrari</p>
              <p className="text-brand-pink mt-2">* Grand Prize - One Lucky Winner!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-gold text-brand-black px-10 py-5 rounded-full font-heading font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-brand-gold/50">
              <span className="mr-2">📸</span>
              Upload Now
            </button>
            <button className="bg-brand-pink text-white px-10 py-5 rounded-full font-heading font-bold text-xl hover:scale-105 transition-transform">
              <span className="mr-2">🔗</span>
              Share with Friends
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {[
              { value: '07', label: 'Days' },
              { value: '12', label: 'Hours' },
              { value: '45', label: 'Mins' },
              { value: '30', label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-4 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold text-brand-gold">{item.value}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-16 bg-gradient-to-b from-brand-black to-gray-900">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              🎁 Amazing Prizes Await
            </h2>
            <p className="text-gray-400">Upload & Win Big</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-brand-pink rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-3xl p-8 text-center border border-brand-gold/50">
                <div className="text-6xl mb-4">🏎️</div>
                <h3 className="text-2xl font-heading font-bold text-brand-gold mb-2">Grand Prize</h3>
                <p className="text-4xl font-bold text-white mb-2">$50,000</p>
                <p className="text-brand-pink font-medium">+ Luxury Supercar</p>
                <p className="text-gray-500 text-sm mt-4">One ultimate winner!</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink to-purple-600 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-3xl p-8 text-center border border-brand-pink/50">
                <div className="text-6xl mb-4">🥇</div>
                <h3 className="text-2xl font-heading font-bold text-brand-pink mb-2">First Prize</h3>
                <p className="text-4xl font-bold text-white mb-2">$10,000</p>
                <p className="text-gray-400">Cash Prize</p>
                <p className="text-gray-500 text-sm mt-4">3 winners monthly</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-3xl p-8 text-center border border-blue-500/50">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-heading font-bold text-blue-400 mb-2">Participation</h3>
                <p className="text-4xl font-bold text-white mb-2">$5-500</p>
                <p className="text-gray-400">Random Red Packets</p>
                <p className="text-gray-500 text-sm mt-4">Everyone wins something!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-brand-pink">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              How to Participate? Super Easy!
            </h2>
            <p className="text-white/80">3 Steps to Win Big</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📸', title: 'Take a Photo', desc: 'Buy 666 Hot Pot Spicy Slices and snap a cool selfie with the product' },
              { step: '02', icon: '📱', title: 'Upload & Share', desc: 'Upload your photo to the event page and share on social media' },
              { step: '03', icon: '💰', title: 'Claim Rewards', desc: 'Get likes, split the prize pool, and win a luxury supercar!' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 text-center relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-gold text-brand-black rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div className="text-6xl mb-4 mt-4">{item.icon}</div>
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16 bg-gray-900">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              🔥 Live Leaderboard
            </h2>
            <p className="text-gray-400">Top Spicy Champions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {leaderboard.map((user, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-6 mb-4 rounded-2xl ${
                  i === 0 ? 'bg-gradient-to-r from-brand-gold/20 to-brand-pink/20 border-2 border-brand-gold' :
                  i === 1 ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-400' :
                  i === 2 ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-600' :
                  'bg-gray-800'
                }`}
              >
                <div className={`text-3xl font-bold w-12 text-center ${
                  i === 0 ? 'text-brand-gold' :
                  i === 1 ? 'text-gray-300' :
                  i === 2 ? 'text-amber-600' :
                  'text-gray-500'
                }`}>
                  {user.badge}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">{user.user}</h4>
                  <p className="text-brand-pink font-medium">{user.reward}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{user.likes}</p>
                  <p className="text-gray-500 text-sm">likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fan Photo Wall */}
      <section className="py-16 bg-brand-black">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              📸 Fan Check-in Wall
            </h2>
            <p className="text-gray-400">Join Thousands of Spicy Fans Worldwide</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { id: 'photos', label: 'Latest', icon: '📷' },
              { id: 'popular', label: 'Hottest', icon: '🔥' },
              { id: 'winners', label: 'Winners', icon: '🏆' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-pink text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fanPhotos.map((photo) => (
              <div key={photo.id} className="group relative bg-gray-900 rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-brand-pink/20 to-brand-gold/20 flex items-center justify-center">
                  <span className="text-6xl">📸</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-xl">
                        {photo.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white">@{photo.user}</p>
                        <p className="text-sm text-gray-400">📍 {photo.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-gold font-bold">💰 Earned {photo.reward}</span>
                      <span className="text-white">❤️ {photo.likes}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-bold">
                  💰 {photo.reward}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-800 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-brand-pink via-purple-600 to-brand-pink">
        <div className="container-wide section-padding text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            What Are You Waiting For?
          </h2>
          <p className="text-2xl text-white/90 mb-4">
            Tag your friends and double the fun!
          </p>
          <p className="text-xl text-white/80 mb-8">
            Share with your squad and win together!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-brand-pink px-10 py-5 rounded-full font-heading font-bold text-xl hover:scale-105 transition-transform shadow-2xl">
              <span className="mr-2">📸</span>
              Join Now
            </button>
            <button className="bg-brand-gold text-brand-black px-10 py-5 rounded-full font-heading font-bold text-xl hover:scale-105 transition-transform">
              <span className="mr-2">📤</span>
              Share to Social
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {['Instagram', 'TikTok', 'Facebook', 'Twitter', 'WeChat'].map((social) => (
              <button
                key={social}
                className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold hover:bg-white/30 transition-colors"
              >
                {social[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 bg-gray-900">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">
              📋 Contest Rules
            </h3>
            <div className="space-y-4 text-gray-400">
              <p>1. Purchase any 666 Hot Pot Beef product and take a creative selfie with it</p>
              <p>2. Upload your photo to the event page with your real information</p>
              <p>3. Share to your social media and invite friends to like your post</p>
              <p>4. More likes = bigger rewards!</p>
              <p>5. Winners announced on the 1st of each month, prizes sent within 7 business days</p>
              <p>6. Grand prize supercar will be delivered within 30 days after the event ends</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
