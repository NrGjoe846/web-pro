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
  CheckCircle2,
  Star,
  MessageCircle,
  Brain,
  Cpu,
  Network,
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

import { SplineSceneBasic } from '@/components/ui/code-demo'
import { FeaturedCourses } from '@/components/ui/featured-courses'
import { LearningProgress } from '@/components/ui/learning-progress'
import { TechInsights } from '@/components/ui/tech-insights'
import { EventsSection } from '@/components/ui/events-section'
import { InternshipSection } from '@/components/ui/internship-section'
import { CommunitySection } from '@/components/ui/community-section'
import { DashboardFooter } from '@/components/ui/dashboard-footer'
import { DashboardNav } from '@/components/ui/dashboard-nav'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend)

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Enhanced animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const glowVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: 1.05,
    opacity: 0.8,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
}

const featuredCards = [
  {
    title: "Upcoming Events",
    description: "Check out our exciting lineup of events and workshops.",
    icon: CalendarIcon,
    link: "/events",
    color: "from-purple-500/80 to-blue-500/80",
    glow: "purple",
  },
  {
    title: "Learning Platform",
    description: "Access our comprehensive learning resources and courses.",
    icon: Brain,
    link: "/courses",
    color: "from-green-500/80 to-teal-500/80",
    glow: "green",
  },
  {
    title: "Internships",
    description: "Explore internship opportunities to kickstart your career.",
    icon: Network,
    link: "/courses",
    color: "from-yellow-500/80 to-orange-500/80",
    glow: "yellow",
  },
  {
    title: "About Us",
    description: "Learn more about our mission and team.",
    icon: Users,
    link: "/about",
    color: "from-red-500/80 to-pink-500/80",
    glow: "red",
  },
]

const services = [
  {
    title: "Building career in AI",
    description: "Empowering through innovative workshops and hands-on experiences.",
    icon: Book,
  },
  {
    title: "Business and AI consultancy",
    description: "Upgrading businesses through AI-powered automations and tools.",
    icon: BarChart2,
  },
  {
    title: "AI integrated Developments",
    description: "Extending AI development for tailored business requirements.",
    icon: Zap,
  },
  {
    title: "AI Research",
    description: "Exploring the realm of AI with cutting-edge research strategies.",
    icon: Trophy,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  // Neural network background animation
  useEffect(() => {
    const canvas = document.getElementById('neural-bg') as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Neural network animation code here
        // ... (implementation details for neural network animation)
      }
    }
  }, [])

  return (
    <div className={`min-h-screen bg-black text-white ${spaceGrotesk.className}`}>
      {/* Navigation */}
      <DashboardNav />
      
      {/* 3D Interactive Hero Section */}
      <SplineSceneBasic />
      
      {/* Featured Courses Section */}
      <FeaturedCourses />
      
      {/* Learning Progress Section */}
      <LearningProgress />
      
      {/* Tech Insights Section */}
      <TechInsights />
      
      {/* Events & Hackathons Section */}
      <EventsSection />
      
      {/* Internship & Career Opportunities Section */}
      <InternshipSection />
      
      {/* Community & Collaboration Section */}
      <CommunitySection />
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}
