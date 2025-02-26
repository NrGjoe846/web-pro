'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPost {
  id: number
  title: string
  snippet: string
  image: string
  category: string
  date: string
  readTime: number
  comments: number
}

const mockNews = [
  "OpenAI announces GPT-5 with enhanced reasoning capabilities",
  "Google's DeepMind achieves breakthrough in protein folding",
  "New research shows AI can predict climate patterns with 95% accuracy",
  "MIT develops self-learning robots that adapt to new environments",
  "AI-powered drug discovery platform identifies potential COVID-19 treatment",
  "Tesla's autonomous driving AI reaches new safety milestone"
]

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI: Trends to Watch in 2025",
    snippet: "Explore the emerging AI technologies that will shape our future and transform industries...",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    category: "AI Trends",
    date: "Mar 15, 2025",
    readTime: 8,
    comments: 24
  },
  {
    id: 2,
    title: "Machine Learning vs. Deep Learning: Understanding the Differences",
    snippet: "A comprehensive guide to understanding the key differences between machine learning and deep learning...",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    category: "Education",
    date: "Mar 10, 2025",
    readTime: 12,
    comments: 18
  },
  {
    id: 3,
    title: "How AI is Revolutionizing Healthcare Diagnostics",
    snippet: "Discover how artificial intelligence is transforming medical diagnostics and improving patient outcomes...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    category: "Healthcare",
    date: "Mar 5, 2025",
    readTime: 10,
    comments: 32
  }
]

export function TechInsights() {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const newsTickerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  
  // News ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % mockNews.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Animate news ticker
  useEffect(() => {
    if (newsTickerRef.current) {
      controls.start({
        x: [0, -20],
        opacity: [1, 0],
        transition: { duration: 0.3 }
      }).then(() => {
        controls.start({
          x: [20, 0],
          opacity: [0, 1],
          transition: { duration: 0.3 }
        })
      })
    }
  }, [activeNewsIndex, controls])

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            AI & Tech Insights
          </h2>
          <p className="text-gray-400 mt-2">
            Stay updated with the latest advancements in AI and technology
          </p>
        </motion.div>
        
        {/* News Ticker */}
        <motion.div 
          className="mb-10 bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center">
            <Badge className="bg-purple-500 mr-4">LATEST NEWS</Badge>
            <motion.div
              ref={newsTickerRef}
              animate={controls}
              className="text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {mockNews[activeNewsIndex]}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {mockBlogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={cn(
                "overflow-hidden border-white/10 glass-morphism transition-all duration-300",
                hoveredCard === post.id ? 'transform scale-[1.02] shadow-lg shadow-purple-500/20' : ''
              )}>
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                    style={{ 
                      backgroundImage: `url(${post.image})`,
                      transform: hoveredCard === post.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 bg-purple-500">
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-purple-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {post.snippet}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <span>{post.date}</span>
                  </div>
                  
                  {/* Hover Overlay - Read More Button */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300",
                      hoveredCard === post.id ? 'opacity-100' : ''
                    )}
                  >
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Explore More Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 group"
          >
            Explore More Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
