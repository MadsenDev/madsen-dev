'use client';

import { motion } from 'motion/react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'insights': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'project': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'technology': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:bg-slate-800/50 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Featured Badge */}
      {article.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Article Image */}
      {article.image && (
        <div className={`relative ${featured ? 'h-48' : 'h-40'} overflow-hidden`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20" />
        </div>
      )}

      {/* Article Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)}`}>
            <Tag size={12} className="mr-1" />
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 mb-3 ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-slate-800/80 backdrop-blur-sm text-slate-300 rounded-md border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-slate-800/60 backdrop-blur-sm text-slate-400 rounded-md">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read More Link */}
        <motion.button
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm font-medium group/link"
          whileHover={{ x: 4 }}
        >
          <span>Read more</span>
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.article>
  );
}
