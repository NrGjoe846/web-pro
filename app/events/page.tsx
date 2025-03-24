"use client"

import { useState, useEffect } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, ChevronLeft, ChevronRight, Bell, Search, Settings, User, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import { useRouter } from "next/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const upcomingEvents = [
  {
    title: "AI Workshop",
    date: "2023-06-15",
    description: "Learn about the latest advancements in AI technology.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Workshop",
  },
  {
    title: "Web Development Bootcamp",
    date: "2023-07-01",
    description: "Intensive 4-week program to become a full-stack developer.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Bootcamp",
  },
  {
    title: "Data Science Seminar",
    date: "2023-07-10",
    description: "Explore the world of data science and machine learning.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Seminar",
  },
]

export default function EventsPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents)
  const [categoryFilter, setCategoryFilter] = useState("All")

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500) // Simulating content loading
  }, [])

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % upcomingEvents.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + upcomingEvents.length) % upcomingEvents.length)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    filterEvents()
  }

  const filterEvents = () => {
    let filtered = upcomingEvents
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }
    if (categoryFilter !== "All") {
      filtered = filtered.filter((event) => event.category === categoryFilter)
    }
    setFilteredEvents(filtered)
  }

  useEffect(() => {
    filterEvents()
  }, [searchQuery, categoryFilter]) //Fixed useEffect dependency

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white ${spaceGrotesk.className}`}
    >
      <Parallax pages={2.5} style={{ top: "0", left: "0" }}>
        <ParallaxLayer offset={0} speed={0.5}>
          <header className="bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evazSIwlqPLFU7rqnw9gOPGCRLNZdN.png"
                  alt="UNAI TECH Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
                  UNAI TECH
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 input-glow"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                      >
                        <Bell className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                        onClick={() => router.push("/settings")}
                      >
                        <Settings className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                        onClick={() => router.push("/profile")}
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
                    Events
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section>
                      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 neon-text">
                        Event Calendar
                      </h2>
                      <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                        <CardContent className="p-4">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border-gray-700"
                          />
                        </CardContent>
                      </Card>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 neon-text">
                        Upcoming Events
                      </h2>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevEvent}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentEventIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                              <CardHeader>
                                <CardTitle>{upcomingEvents[currentEventIndex].title}</CardTitle>
                                <CardDescription>
                                  <CalendarIcon className="inline-block mr-2" />
                                  {format(new Date(upcomingEvents[currentEventIndex].date), "MMMM d, yyyy")}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <Image
                                  src={upcomingEvents[currentEventIndex].image || "/placeholder.svg"}
                                  alt={upcomingEvents[currentEventIndex].title}
                                  width={300}
                                  height={200}
                                  className="rounded-lg mb-4"
                                />
                                <p>{upcomingEvents[currentEventIndex].description}</p>
                                <Button
                                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 cyber-button"
                                  onClick={() => setShowEventDetails(true)}
                                >
                                  View Details
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </AnimatePresence>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextEvent}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2}>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
              All Events
            </h2>
            <div className="mb-6 flex justify-between items-center">
              <Select onValueChange={(value) => setCategoryFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <CalendarIcon className="inline-block mr-2" />
                        {format(new Date(event.date), "MMMM d, yyyy")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="rounded-lg mb-4"
                      />
                      <p>{event.description}</p>
                      <Button
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 cyber-button"
                        onClick={() => setShowEventDetails(true)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.1}>
          <footer className="bg-gray-800 shadow-lg backdrop-blur-lg bg-opacity-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    UNAI TECH
                  </h3>
                  <p className="text-gray-400">
                    Empowering the future through technology and innovation.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors hover-glow"
                    >
                      Twitter
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors hover-glow"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors hover-glow"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>© {new Date().getFullYear()} UNAI TECH. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ParallaxLayer>
      </Parallax>

      <AnimatePresence>
        {showEventDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full glass-morphism"
            >
              <h2 className="text-2xl font-bold mb-4 neon-text">{upcomingEvents[currentEventIndex].title}</h2>
              <p className="mb-4">{upcomingEvents[currentEventIndex].description}</p>
              <p className="mb-4">
                <CalendarIcon className="inline-block mr-2" />
                {format(new Date(upcomingEvents[currentEventIndex].date), "MMMM d, yyyy")}
              </p>
              <Image
                src={upcomingEvents[currentEventIndex].image || "/placeholder.svg"}
                alt={upcomingEvents[currentEventIndex].title}
                width={600}
                height={400}
                className="rounded-lg mb-4"
              />
              <Button onClick={() => setShowEventDetails(false)} className="cyber-button">
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

