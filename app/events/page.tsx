"use client"

import { useState, useEffect } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Bell, Search, Settings, User, CalendarIcon, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Mock events data with Google Forms links
const events = [
  {
    id: 1,
    title: "AI Workshop 2025",
    date: new Date(2025, 3, 15), // April 15, 2025
    time: "10:00 AM - 2:00 PM",
    location: "Virtual Event",
    description: "Join us for an intensive workshop on artificial intelligence and machine learning. Learn from industry experts and get hands-on experience with the latest AI tools.",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c",
    capacity: "100 seats",
    type: "Workshop",
    registrationLink: "https://forms.google.com/your-workshop-form",
    speaker: "Dr. Sarah Johnson",
    speakerTitle: "AI Research Lead",
  },
  {
    id: 2,
    title: "Data Science Symposium",
    date: new Date(2025, 3, 20), // April 20, 2025
    time: "9:00 AM - 5:00 PM",
    location: "Tech Hub, Bangalore",
    description: "A comprehensive symposium covering the latest trends in data science, big data analytics, and machine learning applications in industry.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    capacity: "150 seats",
    type: "Conference",
    registrationLink: "https://forms.google.com/your-symposium-form",
    speaker: "Prof. Michael Chen",
    speakerTitle: "Data Science Director",
  },
  {
    id: 3,
    title: "Web3 Technology Summit",
    date: new Date(2025, 4, 5), // May 5, 2025
    time: "11:00 AM - 4:00 PM",
    location: "Innovation Center",
    description: "Explore the future of web technologies, blockchain, and decentralized applications in this comprehensive summit.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    capacity: "200 seats",
    type: "Summit",
    registrationLink: "https://forms.google.com/your-summit-form",
    speaker: "Emily Rodriguez",
    speakerTitle: "Blockchain Expert",
  }
]

export default function EventsPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    const event = events.find(e => 
      date && e.date.toDateString() === date.toDateString()
    )
    setSelectedEvent(event || null)
  }

  // Function to handle event registration
  const handleRegister = (registrationLink: string) => {
    window.open(registrationLink, '_blank')
  }

  // Get dates with events for calendar highlighting
  const eventDates = events.map(event => event.date)

  return (
    <div className={`min-h-screen bg-black ${spaceGrotesk.className}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evazSIwlqPLFU7rqnw9gOPGCRLNZdN.png"
              alt="UNAI TECH Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              UNAI TECH Events
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border-white/10"
                  modifiers={{
                    event: eventDates
                  }}
                  modifiersStyles={{
                    event: { 
                      fontWeight: 'bold',
                      backgroundColor: 'rgba(147, 51, 234, 0.2)',
                      borderRadius: '50%'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Details Section */}
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-white/10">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Badge 
                      className="absolute top-4 right-4 bg-purple-500"
                      variant="secondary"
                    >
                      {selectedEvent.type}
                    </Badge>
                  </div>

                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                      <p className="text-gray-400">{selectedEvent.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-300">
                        <CalendarIcon className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{format(selectedEvent.date, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{selectedEvent.capacity}</span>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedEvent.speaker}</h3>
                          <p className="text-sm text-gray-400">{selectedEvent.speakerTitle}</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleRegister(selectedEvent.registrationLink)}
                    >
                      Register Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-white/10 flex items-center justify-center h-full">
                  <CardContent className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Select a date to view event details</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
