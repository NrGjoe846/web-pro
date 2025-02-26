'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Users, 
  Heart, 
  Share2, 
  Bookmark,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CommunityPost {
  id: number
  author: {
    name: string
    avatar: string
    role: string
    level: number
  }
  title: string
  content: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  timeAgo: string
  isFeatured: boolean
}

interface CommunityMember {
  id: number
  name: string
  avatar: string
  role: string
  contributions: number
  level: number
  isOnline: boolean
}

const mockPosts: CommunityPost[] = [
  {
    id: 1,
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      role: "AI Researcher",
      level: 5
    },
    title: "Implementing BERT for Sentiment Analysis: My Journey",
    content: "I recently completed a project implementing BERT for sentiment analysis on product reviews. Here are my learnings and the challenges I faced...",
    tags: ["NLP", "BERT", "Sentiment Analysis"],
    likes: 124,
    comments: 32,
    shares: 18,
    timeAgo: "2 hours ago",
    isFeatured: true
  },
  {
    id: 2,
    author: {
      name: "Rahul Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      role: "ML Engineer",
      level: 4
    },
    title: "Optimizing CNN Performance on Edge Devices",
    content: "Edge computing is becoming increasingly important. Here's how I optimized a CNN model to run efficiently on resource-constrained devices...",
    tags: ["CNN", "Edge Computing", "Optimization"],
    likes: 86,
    comments: 19,
    shares: 12,
    timeAgo: "5 hours ago",
    isFeatured: false
  },
  {
    id: 3,
    author: {
      name: "Ananya Gupta",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      role: "Data Scientist",
      level: 6
    },
    title: "Feature Engineering Techniques That Boosted My Model Accuracy by 15%",
    content: "Feature engineering is often more important than the model itself. In this post, I share the techniques that significantly improved my model's performance...",
    tags: ["Feature Engineering", "Data Science", "ML Tips"],
    likes: 215,
    comments: 47,
    shares: 34,
    timeAgo: "1 day ago",
    isFeatured: true
  }
]

const topMembers: CommunityMember[] = [
  {
    id: 1,
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    role: "AI Mentor",
    contributions: 342,
    level: 8,
    isOnline: true
  },
  {
    id: 2,
    name: "Neha Kapoor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    role: "Computer Vision Expert",
    contributions: 287,
    level: 7,
    isOnline: false
  },
  {
    id: 3,
    name: "Arjun Reddy",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    role: "NLP Specialist",
    contributions: 256,
    level: 6,
    isOnline: true
  },
  {
    id: 4,
    name: "Meera Desai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    role: "Reinforcement Learning",
    contributions: 231,
    level: 7,
    isOnline: false
  }
]

export function CommunitySection() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Community & Collaboration
          </h2>
          <p className="text-gray-400 mt-2">
            Connect with AI enthusiasts, share your projects, and learn together
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Posts - Left Column (Wider) */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Community Posts</h3>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
              
              {/* Posts List */}
              <div className="space-y-4">
                {mockPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    <Card className={cn(
                      "overflow-hidden border-white/10 glass-morphism transition-all duration-300",
                      hoveredPost === post.id ? 'transform scale-[1.01] shadow-lg shadow-purple-500/20' : '',
                      post.isFeatured ? 'border-purple-500/30' : ''
                    )}>
                      <CardContent className="p-5">
                        {/* Author Info */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3 border-2 border-white/10">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{post.author.name}</span>
                                <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-xs">
                                  Lvl {post.author.level}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-400 flex items-center">
                                <span>{post.author.role}</span>
                                <span className="mx-2">•</span>
                                <span>{post.timeAgo}</span>
                              </div>
                            </div>
                          </div>
                          
                          {post.isFeatured && (
                            <Badge className="bg-yellow-500/80 flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        {/* Post Content */}
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">{post.title}</h4>
                          <p className="text-gray-400 text-sm">{post.content}</p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="border-white/10 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Interaction Bar */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/10">
                          <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 flex items-center">
                              <Share2 className="h-4 w-4 mr-1" />
                              <span>{post.shares}</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* View More Button */}
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 group"
                >
                  View More Posts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Top Contributors - Right Column (Narrower) */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-white/10 glass-morphism overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Top Contributors</h3>
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  
                  <div className="space-y-4">
                    {topMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => setHoveredMember(null)}
                        className={cn(
                          "flex items-center p-3 rounded-lg transition-all duration-300",
                          hoveredMember === member.id ? 'bg-white/5' : ''
                        )}
                      >
                        <div className="relative mr-3">
                          <Avatar className="h-10 w-10 border-2 border-white/10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">{member.name}</span>
                            <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-xs">
                              Lvl {member.level}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">{member.role}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium">{member.contributions}</div>
                          <div className="text-xs text-gray-400">contributions</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-400 hover:text-white group"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View All Members
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Community Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-white/10 glass-morphism overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-4">Community Stats</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        15K+
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Members</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        8K+
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Projects</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        42K+
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Posts</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        120+
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Countries</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Join Our Community
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
