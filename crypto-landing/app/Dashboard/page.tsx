"use client"

import { useState, useEffect } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  Search,
  Settings,
  User,
  CalendarIcon,
  Zap,
  Book,
  Trophy,
  ArrowRight,
  BarChart2,
  Users,
  Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Parallax } from "react-scroll-parallax"
import { ParallaxProvider } from "react-scroll-parallax"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend)

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const featuredCards = [
  {
    title: "Upcoming Events",
    description: "Check out our exciting lineup of events and workshops.",
    icon: CalendarIcon,
    link: "/events",
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "Learning Platform",
    description: "Access our comprehensive learning resources and courses.",
    icon: Book,
    link: "/courses",
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Internships",
    description: "Explore internship opportunities to kickstart your career.",
    icon: Zap,
    link: "/courses",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "About Us",
    description: "Learn more about our mission and team.",
    icon: Users,
    link: "/about",
    color: "from-red-500 to-pink-500",
  },
]

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User Activity",
    },
  },
}

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Active Users",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "New Sign-ups",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New course available: AI Fundamentals" },
    { id: 2, message: "Upcoming event: Tech Talk on Quantum Computing" },
    { id: 3, message: "Your project submission is due in 2 days" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500) // Simulating content loading

    // Simulating progress increase
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 1, 100)
        if (newProgress === 100) {
          clearInterval(timer)
        }
        return newProgress
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <ParallaxProvider>
      <div
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white ${spaceGrotesk.className}`}
      >
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
                      className="relative text-gray-300 hover:text-white transition-colors duration-300 hover-glow"
                      onClick={toggleNotifications}
                    >
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                          {notifications.length}
                        </span>
                      )}
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Parallax speed={-5}>
                  <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 neon-text">
                    Welcome to Your Dashboard
                  </h1>
                </Parallax>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {featuredCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <Card className="bg-gray-800 border-gray-700 overflow-hidden glass-morphism hover-glow">
                        <CardHeader className={`bg-gradient-to-r ${card.color}`}>
                          <CardTitle className="flex items-center space-x-2 text-white">
                            <card.icon className="h-6 w-6" />
                            <span>{card.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="mt-4">
                          <CardDescription className="text-gray-300">{card.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 group cyber-button"
                            onClick={() => router.push(card.link)}
                          >
                            Explore
                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart2 className="h-6 w-6 text-blue-500" />
                        <span>Your Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={progress} className="h-2 mb-2" />
                      <p className="text-sm text-gray-400">{progress}% complete</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        <span>Achievements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4">
                        {[1, 2, 3].map((_, index) => (
                          <motion.div
                            key={index}
                            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            🏆
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Parallax speed={5}>
                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow mb-12">
                    <CardHeader>
                      <CardTitle>User Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Line options={chartOptions} data={chartData} />
                    </CardContent>
                  </Card>
                </Parallax>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-gray-700"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700 glass-morphism hover-glow">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                          <li key={index} className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-300">Activity item {index + 1}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-lg p-4 overflow-y-auto glass-morphism"
            >
              <h2 className="text-xl font-bold mb-4 neon-text">Notifications</h2>
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    className="bg-gray-700 p-3 rounded-lg hover-glow"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {notification.message}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ParallaxProvider>
  )
}

