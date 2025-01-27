"use client"

import { useState, useEffect } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Bell, Search, Settings, User, Loader2 } from "lucide-react"
import { Parallax, ParallaxLayer } from "@react-spring/parallax"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const achievements = [
  { title: "Students Enrolled", count: "10,000+", icon: "👨‍🎓" },
  { title: "Courses Offered", count: "100+", icon: "📚" },
  { title: "Industry Partners", count: "50+", icon: "🤝" },
  { title: "Success Rate", count: "95%", icon: "🏆" },
]

const teamMembers = [
  { name: "John Doe", role: "Founder & CEO", image: "/placeholder.svg?height=200&width=200" },
  { name: "Jane Smith", role: "CTO", image: "/placeholder.svg?height=200&width=200" },
  { name: "Mike Johnson", role: "Head of Education", image: "/placeholder.svg?height=200&width=200" },
  { name: "Sarah Brown", role: "Lead Instructor", image: "/placeholder.svg?height=200&width=200" },
]

const teamPhotos = [
  { image: "/placeholder.svg?height=400&width=600", description: "Team building workshop" },
  { image: "/placeholder.svg?height=400&width=600", description: "Annual company retreat" },
  { image: "/placeholder.svg?height=400&width=600", description: "Celebrating our 5th anniversary" },
  { image: "/placeholder.svg?height=400&width=600", description: "Volunteer day at local school" },
]

const milestones = [
  {
    year: 2018,
    title: "Company Founded",
    description: "UNAI TECH was established with a vision to revolutionize tech education.",
  },
  {
    year: 2019,
    title: "First Course Launched",
    description: "Successfully launched our flagship AI course with 100 students.",
  },
  {
    year: 2020,
    title: "Expansion to Online Learning",
    description: "Adapted to global challenges by moving all courses online.",
  },
  {
    year: 2021,
    title: "Industry Partnerships",
    description: "Formed partnerships with 20 leading tech companies for internships.",
  },
  { year: 2022, title: "Global Reach", description: "Expanded our student base to over 50 countries worldwide." },
  {
    year: 2023,
    title: "AI Innovation Hub",
    description: "Launched our AI Innovation Hub for cutting-edge research and development.",
  },
]

export default function AboutPage() {
  const router = useRouter()
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500) // Simulating content loading
  }, [])

  const nextMember = () => {
    setCurrentMemberIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentMemberIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % teamPhotos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + teamPhotos.length) % teamPhotos.length)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white ${spaceGrotesk.className}`}
    >
      <Parallax pages={4} style={{ top: "0", left: "0" }}>
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
                    placeholder="Search..."
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
                    About Us
                  </h1>

                  <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 neon-text">
                      Our Achievements
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {achievements.map((achievement) => (
                        <motion.div key={achievement.title} whileHover={{ scale: 1.05 }} className="group">
                          <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                            <CardContent className="p-6 text-center">
                              <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 group-hover:from-green-400 group-hover:to-blue-600 transition-all duration-300">
                                {achievement.count}
                              </p>
                              <p className="text-xl">{achievement.icon}</p>
                              <p className="text-sm text-gray-400">{achievement.title}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2}>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
              Our Team
            </h2>
            <div className="relative">
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevMember}
                  className="absolute left-0 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <motion.div
                  key={currentMemberIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Image
                    src={teamMembers[currentMemberIndex].image || "/placeholder.svg"}
                    alt={teamMembers[currentMemberIndex].name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4 hover-glow"
                  />
                  <h3 className="text-xl font-semibold neon-text">{teamMembers[currentMemberIndex].name}</h3>
                  <p className="text-gray-400">{teamMembers[currentMemberIndex].role}</p>
                </motion.div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMember}
                  className="absolute right-0 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-600 neon-text">
              Team Photos
            </h2>
            <div className="relative">
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPhoto}
                  className="absolute left-0 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <motion.div
                  key={currentPhotoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Image
                    src={teamPhotos[currentPhotoIndex].image || "/placeholder.svg"}
                    alt={teamPhotos[currentPhotoIndex].description}
                    width={600}
                    height={400}
                    className="rounded-lg mx-auto mb-4 hover-glow"
                  />
                  <p className="text-gray-400">{teamPhotos[currentPhotoIndex].description}</p>
                </motion.div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPhoto}
                  className="absolute right-0 z-10 text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.2}>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
              Our Journey
            </h2>
            <div className="relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="mb-8 flex"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-24 text-right mr-4">
                    <div className="text-2xl font-bold neon-text">{milestone.year}</div>
                  </div>
                  <div className="flex-grow">
                    <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}

