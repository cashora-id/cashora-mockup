import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getBlogPost, getRelatedPosts, blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, User } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Blog Cashora`,
    description: post.excerpt,
  }
}

// Minimal markdown-to-HTML renderer (headings, bold, paragraphs, lists)
function renderContent(raw: string): string {
  const lines = raw.split('\n')
  const html: string[] = []
  let inList = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '') {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false }
      html.push(`<h2>${trimmed.slice(3)}</h2>`)
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (inList) { html.push('</ul>'); inList = false }
      html.push(`<p><strong>${trimmed.slice(2, -2)}</strong></p>`)
    } else if (trimmed.startsWith('- ')) {
      if (!inList) { html.push('<ul>'); inList = true }
      const inner = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html.push(`<li>${inner}</li>`)
    } else {
      if (inList) { html.push('</ul>'); inList = false }
      const paragraph = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      html.push(`<p>${paragraph}</p>`)
    }
  }

  if (inList) html.push('</ul>')
  return html.join('\n')
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, post.category)
  const contentHtml = renderContent(post.content)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-[#0A2540] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#00C897] text-sm mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Blog
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#00C897]/15 text-[#00C897] text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-white text-balance leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 text-pretty">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00C897]/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#00C897]" />
                </div>
                <div>
                  <p className="text-white font-medium leading-none">{post.author}</p>
                  <p className="text-white/50 text-xs mt-0.5">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} baca
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <article
              className="prose-cashora"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-[#e2e8f0]">
              <Tag className="w-4 h-4 text-[#64748b]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F5F7FA] text-[#0A2540] text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-10 p-6 rounded-2xl bg-[#F5F7FA] border border-[#e2e8f0] flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0A2540] flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-[#00C897]" />
              </div>
              <div>
                <p className="font-sans font-semibold text-[#0A2540]">{post.author}</p>
                <p className="text-[#64748b] text-sm mb-2">{post.authorRole} di Cashora</p>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  Bergabung bersama tim Cashora untuk membantu pelaku bisnis Indonesia memanfaatkan teknologi POS secara maksimal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-[#F5F7FA] py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-sans font-bold text-2xl text-[#0A2540] mb-8">
                Artikel Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#00C897]/40 hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
                  >
                    <span className="px-2.5 py-1 rounded-full bg-[#F5F7FA] text-[#0A2540] text-xs font-semibold self-start mb-3">
                      {rel.category}
                    </span>
                    <h3 className="font-sans font-bold text-[#0A2540] text-balance leading-snug mb-2 group-hover:text-[#00a87e] transition-colors flex-1">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e2e8f0]">
                      <span className="text-xs text-[#64748b]">{rel.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-[#00C897] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#0A2540] py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-sans font-bold text-3xl text-white mb-4 text-balance">
              Siap Mencoba Cashora?
            </h2>
            <p className="text-white/60 mb-8">
              Daftar gratis 14 hari tanpa kartu kredit, atau jadwalkan demo dengan tim kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl bg-[#00C897] text-[#0A2540] font-semibold hover:bg-[#00a87e] transition-colors"
              >
                Daftar Gratis 14 Hari
              </Link>
              <Link
                href="/demo"
                className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Jadwalkan Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
