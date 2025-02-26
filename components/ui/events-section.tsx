'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Trophy, Users, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  mode: 'Online' | 'In-Person' | 'Hybrid'
  prize: string
  participants: number
  maxParticipants: number
  image: string
  registrationOpen: boolean
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "AI Hackathon 2025",
    date: "April 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Hub, Bangalore",
    mode: "Hybrid",
    prize: "₹1,00,000",
    participants: 120,
    maxParticipants: 200,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    registrationOpen: true
  },
  {
    id: 2,
    title: "Machine Learning Workshop",
    date: "March 25, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Virtual Event",
    mode: "Online",
    prize: "Certification",
    participants: 85,
    maxParticipants: 150,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    registrationOpen: true
  },
  {
    id: 3,
    title: "AI Ethics Symposium",
    date: "May 5, 2025",
    time: "11:00 AM - 4:00 PM",
    location: "Innovation Center, Delhi",
    mode: "In-Person",
    prize: "Research Grant",
    participants: 50,
    maxParticipants: 100,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    registrationOpen: false
  }
]

export function EventsSection() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  // Calculate time left until the next event
  useEffect(() => {
    // Set target date - April 15, 2025
    const targetDate = new Date('2025-04-15T09:00:00')
    
    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference <= 0) {
        clearInterval(interval)
        return
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Format number to always have 2 digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Events & Hackathons
          </h2>
          <p className="text-gray-400 mt-2">
            Join our upcoming AI events, hackathons, and workshops
          </p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <Card className="border-white/10 glass-morphism overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Next Big Event: AI Hackathon 2025</h3>
                  <p className="text-gray-400">Get ready for the biggest AI hackathon of the year!</p>
                </div>
                
                <div className="flex space-x-4">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center text-2xl font-bold">
                      {formatNumber(timeLeft.days)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Days</span>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center text-2xl font-bold">
                      {formatNumber(timeLeft.hours)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Hours</span>
                  </div>
                  
                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center text-2xl font-bold">
                      {formatNumber(timeLeft.minutes)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Minutes</span>
                  </div>
                  
                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-black/30 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center text-2xl font-bold">
                      {formatNumber(timeLeft.seconds)}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Seconds</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {mockEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              className="group"
            >
              <Card className={cn(
                "overflow-hidden border-white/10 glass-morphism transition-all duration-300 h-full",
                hoveredEvent === event.id ? 'transform scale-[1.02] shadow-lg shadow-purple-500/20' : ''
              )}>
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                    style={{ 
                      backgroundImage: `url(${event.image})`,
                      transform: hoveredEvent === event.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  {/* Event Mode Badge */}
                  <Badge 
                    className={cn(
                      "absolute top-3 left-3",
                      event.mode === 'Online' ? 'bg-green-500' : 
                      event.mode === 'In-Person' ? 'bg-blue-500' : 'bg-purple-500'
                    )}
                  >
                    {event.mode}
                  </Badge>
                  
                  {/* Registration Status */}
                  <Badge 
                    className={cn(
                      "absolute top-3 right-3",
                      event.registrationOpen ? 'bg-green-500' : 'bg-red-500'
                    )}
                  >
                    {event.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                  </Badge>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-3">{event.title}</h3>
                  
                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {/* Prize and Participants */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1 text-sm">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{event.prize}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{event.participants}/{event.maxParticipants}</span>
                    </div>
                  </div>
                  
                  {/* Register Button */}
                  <Button 
                    className={cn(
                      "w-full",
                      event.registrationOpen 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" 
                        : "bg-gray-700 cursor-not-allowed"
                    )}
                    disabled={!event.registrationOpen}
                  >
                    {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 group"
          >
            View All Events
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
