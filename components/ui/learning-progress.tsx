'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap, Book, Trophy, ArrowRight, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock user data
const userData = {
  name: 'Alex Johnson',
  progress: 68,
  streak: 12,
  xp: 1250,
  level: 5,
  lastCourse: 'Advanced Neural Networks',
  lastLesson: 'Recurrent Neural Networks',
  completedCourses: 3,
  totalCourses: 8,
  dailyChallenge: 'Complete a quiz on Machine Learning Algorithms'
}

export function LearningProgress() {
  const [progress, setProgress] = useState(0)
  const [showMotivation, setShowMotivation] = useState(false)
  const [motivationMessage, setMotivationMessage] = useState('')
  
  // Motivational messages
  const motivationalMessages = [
    "You're making incredible progress! Keep it up!",
    "Every day of learning brings you closer to mastery!",
    "Your dedication to learning AI is impressive!",
    "You're on fire! 🔥 Your streak is building up!",
    "Knowledge compounds - you're building something amazing!"
  ]
  
  // Animate progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(userData.progress)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Show random motivation message on hover
  const handleMotivationHover = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    setMotivationMessage(randomMessage)
    setShowMotivation(true)
  }

  return (
    <section className="py-12 px-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-blue-500/20 rounded-full animate-pulse-slow" />
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Your Learning Journey
          </h2>
          <p className="text-gray-400 mt-2">
            Track your progress and keep up your learning streak
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
            onMouseEnter={handleMotivationHover}
            onMouseLeave={() => setShowMotivation(false)}
          >
            <Card className="border-white/10 glass-morphism overflow-hidden relative h-full">
              {/* Animated gradient border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ margin: '-1px' }} />
              
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Learning Progress</span>
                  <div className="flex items-center space-x-1 text-sm font-normal text-gray-400">
                    <span>{userData.completedCourses}/{userData.totalCourses} courses</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Overall Progress</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                  
                  {/* Motivation Message */}
                  <AnimatePresence>
                    {showMotivation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm text-gray-300 italic mt-2"
                      >
                        "{motivationMessage}"
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Current Course */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Continue Learning</h3>
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Current Course</p>
                        <p className="font-medium">{userData.lastCourse}</p>
                        <p className="text-sm text-gray-400 mt-1">Lesson: {userData.lastLesson}</p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                      >
                        Resume
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-2xl font-bold">{userData.streak}</span>
                      <span className="text-xs text-gray-400">Day Streak</span>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                        <Trophy className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-2xl font-bold">{userData.xp}</span>
                      <span className="text-xs text-gray-400">XP Points</span>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-3 border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <Book className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-2xl font-bold">{userData.level}</span>
                      <span className="text-xs text-gray-400">Level</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Daily Challenge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-white/10 glass-morphism overflow-hidden h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>Daily Challenge</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/10">
                  <p className="text-sm text-gray-300">{userData.dailyChallenge}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs text-gray-400">+50 XP</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/10 hover:bg-white/5"
                    >
                      Start Challenge
                    </Button>
                  </div>
                </div>
                
                {/* Eve AI Assistant */}
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg p-4 border border-purple-500/20 relative overflow-hidden group">
                  {/* Animated particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 5}s`,
                          animation: 'float 5s infinite ease-in-out'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Eve AI</h3>
                        <p className="text-xs text-gray-400">Your Learning Assistant</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4">
                      Need help with your learning? Ask Eve AI for assistance!
                    </p>
                    
                    <Button 
                      className="w-full bg-black/30 hover:bg-black/50 text-white border border-white/10 group-hover:border-purple-500/50 transition-all duration-300"
                    >
                      Chat with Eve AI
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
