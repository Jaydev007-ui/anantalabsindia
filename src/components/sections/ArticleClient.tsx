"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BackToTop from "@/components/ui/BackToTop";
import Footer from "@/components/ui/Footer";
import { Article } from "@/lib/articles";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";

interface ArticleClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleClient({ article, relatedArticles }: ArticleClientProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Premium Loading Preloader */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen bg-background text-primary selection:bg-primary/20 selection:text-white">
          {/* Futuristic Interactive Backdrop */}
          <BackgroundParticles />

          {/* Core Sticky Navbar */}
          <Navbar />

          {/* Main Article Content */}
          <main className="pt-28 pb-24 md:pb-32 relative z-10">
            {/* Background glowing aura */}
            <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              
              {/* Back to Hub navigation */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <Link
                  href="/knowledge-hub"
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  BACK TO KNOWLEDGE HUB
                </Link>
              </motion.div>

              {/* Article Header */}
              <div className="space-y-6 text-left mb-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                >
                  {article.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-4 border-t border-white/5"
                >
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-600" />
                    <span>{article.author}</span>
                  </div>
                  <span className="text-slate-700">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-600" />
                    <span>{article.date}</span>
                  </div>
                </motion.div>
              </div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-12"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Article Content Text body */}
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-sans text-sm sm:text-base leading-relaxed text-slate-300 space-y-6 max-w-3xl text-left"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-white/5 text-left"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-slate-500 mr-2" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Related Articles Section */}
              <div className="mt-24 pt-16 border-t border-white/5 text-left">
                <h3 className="font-display text-xs tracking-[0.25em] text-[#0088FF] uppercase font-bold mb-8">
                  RELATED ARTICLES & INSIGHTS
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      href={`/knowledge-hub/${rel.slug}`}
                      key={rel.slug}
                      className="glass-card border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 group shadow-sm"
                    >
                      <div className="space-y-3">
                        <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase font-bold">
                          {rel.category}
                        </span>
                        <h4 className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-slate-500">
                        <span>{rel.readTime}</span>
                        <span className="group-hover:text-primary transition-colors flex items-center gap-0.5">
                          READ <ArrowRight className="h-2 w-2" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </main>

          {/* Unified Footer */}
          <Footer />

          {/* Floating Back To Top Indicator */}
          <BackToTop />
        </div>
      )}
    </>
  );
}
