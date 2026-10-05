"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import LoadingScreen from "@/components/ui/LoadingScreen";
import BackToTop from "@/components/ui/BackToTop";
import UnifyEngine from "@/components/ui/UnifyEngine";
import Footer from "@/components/ui/Footer";
import { articles } from "@/lib/articles";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";

const categories = [
  "All",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Healthcare Technology",
  "Engineering",
  "Electronics",
  "Embedded Systems",
  "Robotics",
  "Research",
  "Innovation",
  "Product Development",
];

export default function KnowledgeHub() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredArticle = articles[0]; // First article is featured

  // Filter articles based on search & category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

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

          {/* Main Content Layout */}
          <main className="pt-28 pb-24 md:pb-32 relative z-10">
            {/* Background glowing aura */}
            <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              {/* Header section */}
              <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold animate-pulse"
                >
                  ANANTA KNOWLEDGE HUB
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
                >
                  Research, ideas & engineering insights
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sans text-slate-400 text-sm md:text-base leading-relaxed"
                >
                  Exploring deep-tech paradigms, automated clinical fluidics development, computer vision tracking algorithms, and low-latency mechatronics prototyping.
                </motion.p>
              </div>

              {/* Featured Article Section */}
              {selectedCategory === "All" && searchQuery === "" && featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-20"
                >
                  <div className="text-left mb-6">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#0088FF] uppercase font-bold">
                      FEATURED PUBLICATION
                    </span>
                  </div>
                  <div className="glass-card border border-white/5 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 hover:border-primary/25 transition-all duration-300 group">
                    <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[260px] rounded-2xl overflow-hidden border border-white/5">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="lg:col-span-6 flex flex-col justify-between py-2">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase">
                            {featuredArticle.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Clock className="h-3 w-3" />
                            {featuredArticle.readTime}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                          {featuredArticle.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {featuredArticle.summary}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <User className="h-3.5 w-3.5 text-slate-600" />
                          <span>{featuredArticle.author}</span>
                          <span className="text-slate-700">•</span>
                          <Calendar className="h-3.5 w-3.5 text-slate-600" />
                          <span>{featuredArticle.date}</span>
                        </div>
                        <Link
                          href={`/knowledge-hub/${featuredArticle.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer shadow-sm mt-4 sm:mt-0"
                        >
                          Read Article
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Browser & Filters & Search */}
              <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-12 border-t border-white/5 pt-12">
                {/* Search box */}
                <div className="relative w-full lg:max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, keywords, or topics..."
                    className="block w-full pl-10 pr-4 py-3 bg-[#0c0c0e]/80 border border-white/10 rounded-full font-sans text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Categories dropdown/selector */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 shrink-0 mr-2">
                    FILTER BY:
                  </span>
                  <div className="flex gap-2 shrink-0">
                    {categories.slice(0, 5).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                    {/* Simplified category list selector */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 rounded-full border border-white/10 bg-[#0c0c0e] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 cursor-pointer focus:outline-none"
                    >
                      <option value="All">More Categories...</option>
                      {categories.slice(5).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, idx) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="glass-card border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all duration-300 group shadow-sm"
                    >
                      <div className="space-y-4">
                        {/* Aspect Frame */}
                        <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                        </div>

                        {/* Summary Block */}
                        <div className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0088FF]">
                              {article.category}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                              <Clock className="h-2.5 w-2.5" />
                              {article.readTime}
                            </span>
                          </div>
                          
                          <h4 className="font-display text-base font-bold text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h4>

                          <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      {/* Detail Footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">
                          {article.date}
                        </span>
                        
                        <Link
                          href={`/knowledge-hub/${article.slug}`}
                          className="text-[10px] font-bold text-slate-300 group-hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest font-mono cursor-pointer"
                        >
                          READ
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <p className="font-sans text-slate-500 text-sm">
                    No articles found matching your criteria. Try adjusting your filters or search keywords.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Unified Footer */}
          <Footer />

          {/* Floating Back To Top Indicator */}
          <BackToTop />

          {/* Unify Content Protection Engine */}
          <UnifyEngine />
        </div>
      )}
    </>
  );
}
