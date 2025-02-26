'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid, List, ArrowRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Course {
  id: number
  title: string
  image: string
  price: number | 'Free'
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  category: string
  instructor: string
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Machine Learning Fundamentals',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    price: 49.99,
    level: 'Beginner',
    rating: 4.8,
    category: 'AI',
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'Deep Learning with PyTorch',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
    price: 59.99,
    level: 'Intermediate',
    rating: 4.9,
    category: 'AI',
    instructor: 'Prof. Michael Chen'
  },
  {
    id: 3,
    title: 'Natural Language Processing',
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72',
    price: 'Free',
    level: 'Intermediate',
    rating: 4.7,
    category: 'AI',
    instructor: 'Dr. Emily Rodriguez'
  },
  {
    id: 4,
    title: 'Computer Vision Workshop',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
    price: 39.99,
    level: 'Advanced',
    rating: 4.6,
    category: 'AI',
    instructor: 'Dr. James Wilson'
  }
]

export function FeaturedCourses() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockCourses.length)
  }
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockCourses.length) % mockCourses.length)
  }

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Featured Courses
            </h2>
            <p className="text-gray-400 mt-2">
              Explore our trending AI courses and workshops
            </p>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-1 border border-white/10">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "rounded-md transition-all duration-300",
                  viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'
                )}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={cn(
                  "rounded-md transition-all duration-300",
                  viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrev}
                className="border-white/10 hover:bg-white/5"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="border-white/10 hover:bg-white/5"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Courses Grid/List */}
        <div className={cn(
          "grid gap-6 transition-all duration-500",
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'
        )}>
          <AnimatePresence>
            {mockCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
                className="relative group"
              >
                <Card className={cn(
                  "overflow-hidden transition-all duration-500 border-white/10 glass-morphism",
                  viewMode === 'list' ? 'flex' : '',
                  hoveredCourse === course.id ? 'transform scale-[1.02] shadow-lg shadow-purple-500/20' : ''
                )}>
                  {/* Course Image */}
                  <div 
                    className={cn(
                      "relative overflow-hidden",
                      viewMode === 'list' ? 'w-1/3' : 'h-48'
                    )}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Level Badge */}
                    <Badge 
                      className={cn(
                        "absolute top-2 left-2 z-10",
                        course.level === 'Beginner' ? 'bg-green-500' : 
                        course.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                      )}
                    >
                      {course.level}
                    </Badge>
                    
                    {/* Price Badge */}
                    <Badge 
                      className="absolute top-2 right-2 z-10 bg-purple-500"
                    >
                      {course.price === 'Free' ? 'Free' : `$${course.price}`}
                    </Badge>
                  </div>
                  
                  {/* Course Content */}
                  <CardContent className={cn(
                    "p-4",
                    viewMode === 'list' ? 'flex-1' : ''
                  )}>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">By {course.instructor}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(course.rating) ? "text-yellow-500 fill-yellow-500" : 
                            i < course.rating ? "text-yellow-500 fill-yellow-500 opacity-50" : 
                            "text-gray-400"
                          )} 
                        />
                      ))}
                      <span className="text-sm text-gray-400 ml-1">{course.rating}</span>
                    </div>
                    
                    {/* Hover Content - Only visible on hover */}
                    <div className={cn(
                      "transition-all duration-300",
                      hoveredCourse === course.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden',
                      viewMode === 'list' ? 'block' : ''
                    )}>
                      <p className="text-sm text-gray-300 mb-2">
                        Master the fundamentals of AI and machine learning with hands-on projects.
                      </p>
                      <ul className="text-xs text-gray-400 mb-4 space-y-1">
                        <li>• 12 hours of video content</li>
                        <li>• 5 hands-on projects</li>
                        <li>• Certificate upon completion</li>
                      </ul>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Badge variant="outline" className="border-white/10">
                      {course.category}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* View All Button */}
        <div className="mt-10 text-center">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 group"
          >
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
