export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number; // in minutes
  tags: string[];
  category: 'tutorial' | 'insights' | 'project' | 'technology';
  featured?: boolean;
  image?: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: 'building-interactive-portfolios',
    title: 'Building Interactive Portfolios with Next.js and Framer Motion',
    excerpt: 'Learn how to create engaging, interactive portfolio websites that stand out from the crowd using modern web technologies.',
    content: `Creating a portfolio that truly represents your skills and personality requires more than just listing your projects. In this article, I'll walk you through the process of building an interactive portfolio using Next.js and Framer Motion.

## Why Interactive Portfolios Matter

In today's competitive market, a static portfolio just doesn't cut it anymore. Interactive elements help you:
- Showcase your technical skills
- Create memorable user experiences
- Demonstrate attention to detail
- Stand out from other developers

## Key Technologies

- **Next.js 15**: For the React framework and App Router
- **Framer Motion**: For smooth animations and transitions
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For rapid styling and responsive design

## Implementation Tips

1. **Start with a solid foundation**: Use Next.js App Router for better performance
2. **Animate with purpose**: Every animation should serve a functional purpose
3. **Optimize for performance**: Use lazy loading and image optimization
4. **Test across devices**: Ensure your portfolio works on all screen sizes

The result is a portfolio that not only showcases your work but also demonstrates your technical expertise through its implementation.`,
    author: 'Christoffer Madsen',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['Next.js', 'React', 'Framer Motion', 'Portfolio', 'Web Development'],
    category: 'tutorial',
    featured: true,
    image: '/images/portfolio-tutorial.png',
    slug: 'building-interactive-portfolios'
  },
  {
    id: 'nextjs-performance-tips',
    title: 'Next.js Performance Optimization: A Developer\'s Guide',
    excerpt: 'Essential tips and techniques to optimize your Next.js applications for better performance and user experience.',
    content: `Performance optimization is crucial for any web application. In this guide, I'll share practical tips I've learned while building high-performance Next.js applications.

## Image Optimization

Next.js provides excellent image optimization out of the box:

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>
\`\`\`

## Code Splitting and Lazy Loading

Use dynamic imports for components that aren't immediately needed:

\`\`\`jsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />
})
\`\`\`

## Bundle Analysis

Regularly analyze your bundle to identify optimization opportunities:

\`\`\`bash
npm run build
npm run analyze
\`\`\`

These optimizations can significantly improve your application's performance and user experience.`,
    author: 'Christoffer Madsen',
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['Next.js', 'Performance', 'Optimization', 'Web Development'],
    category: 'tutorial',
    featured: true,
    image: '/images/performance-guide.png',
    slug: 'nextjs-performance-tips'
  },
  {
    id: 'from-tech-support-to-developer',
    title: 'From Tech Support to Full-Stack Developer: My Journey',
    excerpt: 'How my experience in customer support shaped my approach to software development and problem-solving.',
    content: `Transitioning from tech support to full-stack development taught me valuable lessons about user experience and problem-solving that I still apply today.

## The Customer Support Foundation

Working in tech support at Elkjøp gave me:
- **User empathy**: Understanding real user pain points
- **Problem-solving skills**: Breaking down complex issues
- **Communication**: Explaining technical concepts clearly
- **Patience**: Working through challenging problems

## Applying Support Skills to Development

These skills directly translate to development:

1. **User-Centric Design**: Always consider the end user
2. **Clear Documentation**: Write code that's easy to understand
3. **Error Handling**: Anticipate and handle edge cases
4. **Testing**: Ensure reliability and user satisfaction

## The Learning Path

My transition involved:
- Learning React and modern JavaScript
- Understanding backend development with Node.js
- Building real projects to apply knowledge
- Contributing to open source projects

The customer support experience was invaluable in shaping my approach to development. It taught me that great software isn't just about clean code—it's about solving real problems for real people.`,
    author: 'Christoffer Madsen',
    publishedAt: '2024-01-05',
    readTime: 5,
    tags: ['Career', 'Learning', 'Development', 'Personal'],
    category: 'insights',
    featured: false,
    image: '/images/career-journey.png',
    slug: 'from-tech-support-to-developer'
  },
  {
    id: 'gravstellerne-platform-case-study',
    title: 'Building the Gravstellerne Platform: A Case Study',
    excerpt: 'A deep dive into the development process of a comprehensive grave maintenance management platform.',
    content: `The Gravstellerne platform represents one of my most complex projects, involving multiple user types, real-time data, and sensitive family information.

## Project Overview

The platform consists of three main components:
- **Admin CMS**: For managing services and customers
- **Field Worker PWA**: For on-site task completion
- **Customer Portal**: For families to manage grave care

## Technical Challenges

### Real-time Updates
Implementing real-time notifications for task completion and status updates using WebSockets.

### Offline Functionality
The PWA needed to work offline, syncing data when connectivity returned.

### Data Privacy
Handling sensitive family information with appropriate security measures.

## Key Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MySQL
- **Real-time**: Socket.IO
- **PWA**: Service Workers, IndexedDB
- **Maps**: Google Maps API for location services

## Lessons Learned

1. **User Research**: Understanding each user type's needs was crucial
2. **Progressive Enhancement**: Building for offline-first improved reliability
3. **Security**: Implementing proper authentication and data protection
4. **Testing**: Comprehensive testing across different devices and scenarios

This project taught me the importance of understanding your users and building solutions that truly solve their problems.`,
    author: 'Christoffer Madsen',
    publishedAt: '2024-01-01',
    readTime: 10,
    tags: ['Case Study', 'React', 'Node.js', 'PWA', 'Real-time'],
    category: 'project',
    featured: true,
    image: '/images/gravstellerne-case-study.png',
    slug: 'gravstellerne-platform-case-study'
  }
];

export const getFeaturedArticles = () => articles.filter(article => article.featured);

export const getArticleBySlug = (slug: string) => articles.find(article => article.slug === slug);

export const getArticlesByCategory = (category: Article['category']) => 
  articles.filter(article => article.category === category);

export const getRecentArticles = (limit: number = 3) => 
  articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
