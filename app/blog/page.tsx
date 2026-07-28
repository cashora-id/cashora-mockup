'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { blogPosts, categories } from '@/lib/blog-data'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filtered =
    activeCategory === 'Semua'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const featured = blogPosts.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#0A2540] py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00C897]/15 text-[#00C897] text-sm font-semibold mb-5">
              Blog Cashora
            </span>
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-white text-balance mb-5">
              Insight untuk Bisnis yang Lebih Cerdas
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
              Tips praktis, panduan mendalam, dan cerita sukses dari pelaku bisnis Indonesia.
            </p>
          </div>
        </section>

        {/* Featured posts */}
        {activeCategory === 'Semua' && featured.length > 0 && (
          <section className="bg-[#F5F7FA] py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-sans font-bold text-2xl text-[#0A2540] mb-8">
                Artikel Pilihan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:border-[#00C897]/40 hover:shadow-lg transition-all duration-300 flex flex-col ${
                      i === 0 ? 'lg:row-span-1' : ''
                    }`}
                  >
                    {/* Color band */}
                    <div className={`h-1.5 ${i === 0 ? 'bg-[#00C897]' : 'bg-[#0A2540]'}`} />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#00C897]/10 text-[#00a87e] text-xs font-semibold">
                          {post.category}
                        </span>
                        <span className="text-[#64748b] text-xs">Artikel Pilihan</span>
                      </div>
                      <h3 className="font-sans font-bold text-xl text-[#0A2540] text-balance leading-snug mb-3 group-hover:text-[#00a87e] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#64748b] text-sm leading-relaxed flex-1 mb-5 text-pretty">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-[#64748b]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </div>
                        </div>
                        <span className="text-[#00C897] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Baca <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter + All posts */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0A2540] text-white'
                      : 'bg-[#F5F7FA] text-[#64748b] hover:bg-[#0A2540]/10 hover:text-[#0A2540]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[#64748b]">
                Belum ada artikel di kategori ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === 'Semua' ? rest : filtered).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#00C897]/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Top accent bar */}
                    <div className="h-1 bg-[#F5F7FA] group-hover:bg-[#00C897] transition-colors" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#F5F7FA] text-[#0A2540] text-xs font-semibold">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#64748b]">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="font-sans font-bold text-[#0A2540] text-balance leading-snug mb-3 group-hover:text-[#00a87e] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#64748b] text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                        <div>
                          <p className="text-xs font-semibold text-[#0A2540]">{post.author}</p>
                          <p className="text-xs text-[#64748b]">{post.date}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#00C897] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-[#0A2540] py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-sans font-bold text-3xl text-white mb-4 text-balance">
              Dapatkan Insight Langsung di Inbox Anda
            </h2>
            <p className="text-white/60 mb-8">
              Artikel baru setiap minggu. Tanpa spam, bisa unsubscribe kapan saja.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="email@usaha.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00C897] text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#00C897] text-[#0A2540] font-semibold text-sm hover:bg-[#00a87e] transition-colors whitespace-nowrap"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
