"use client"

import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Bell, Search, Settings, User, Home, Trophy, BarChart2, Book, Zap } from "lucide-react"
import styles from "./courses.module.css"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Achievements } from "@/app/components/Achievements"
import { Stats } from "@/app/components/Stats"
import { toast } from "sonner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const featuredCourses = [
  {
    title: "Low Code Web and App Development",
    image: "https://i.pinimg.com/736x/e1/4e/bd/e14ebd1396c089ca5d97d0e53a6cd3c5.jpg",
    students: "50+ enrolled",
    description: "Master web development with AI assistance and cutting-edge tools.",
  },
  {
    title: "Drug Discovery and AI",
    image: "https://www.genengnews.com/wp-content/uploads/2024/09/Getty_2149711865_ArtificialIntelligence.jpg",
    students: "30+ enrolled",
    description: "Revolutionize healthcare with our AI-powered Drug Discovery Internship!",
  },
  {
    title: "Building AI  Virtual Assistant",
    image: "https://i.pinimg.com/736x/99/92/38/999238322d33762956c1bc116f327b2e.jpg",
    students: "40+ enrolled",
    description: "Your AI-powered Personal Virtual Assistant—always ready to help!",
  },
]

const leaderboardData = [
  { color: "#9333ea", score: "98%", rank: "Top 1%", icon: "🏆" },
  { color: "#f97316", score: "95%", rank: "Top 5%", icon: "🎓" },
  { color: "#ef4444", score: "92%", rank: "Top 10%", icon: "⭐" },
]

const quickCourses = [
 {
    title: "Artificial Intelligence",
    image: "https://ideogram.ai/assets/progressive-image/balanced/response/TZPFUduWRYOT5nYWYZIcnA",
    color: "#3b82f6",
  },
  {
    title: "Machine Learning",
    image: "https://ideogram.ai/assets/image/lossless/response/dukxHP3bTFyG6FhW5jJ5Yw",
    color: "#10b981",
  },
  {
    title: "UI/UX Design",
    image: "https://ideogram.ai/assets/image/lossless/response/TVsHUxFURK-HNH_2mFFOAA",
    color: "#8b5cf6",
  },
  {
    title: "Web Development",
    image: "https://ideogram.ai/assets/image/lossless/response/mdEIcCr4Q82RDa_I5C3Nqw",
    color: "#9333ea",
  },
  {
    title: "App Development",
    image: "https://ideogram.ai/assets/image/lossless/response/BFngd_88Qe-1UxPBgP2L8Q",
    color: "#9333ea",
  },{
    title: "Python Programming",
    image: "https://ideogram.ai/assets/image/lossless/response/iUO7XnDrTFmnF_F2Qh_fQQ",
    color: "#9333ea",
  },
  {
    title: "Java Programming",
    image: "https://ideogram.ai/assets/image/lossless/response/ebyaxx-_TSKFAtYC6b5VFg",
    color: "#f97316",
  },
  {
    title: "C++ Programming",
    image: "https://ideogram.ai/assets/image/lossless/response/3NN-H3I9RhufVQ2ruTc_TQ",
    color: "#ef4444",
  },
]

export default function CoursesPage() {
  const router = useRouter()
  const [sidebarItems, setSidebarItems] = useState([
    { icon: Home, label: "Home", active: true, action: () => router.push("/") },
    { icon: Trophy, label: "Achievements", action: () => setShowAchievements(true) },
    { icon: BarChart2, label: "Stats", action: () => setShowStats(true) },
    { icon: Book, label: "Library", action: () => router.push("/library") },
    { icon: Zap, label: "Progress", action: () => setShowProgress(true) },
  ])
  const [showAchievements, setShowAchievements] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false)
  const [showAllQuickCourses, setShowAllQuickCourses] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(featuredCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCourse, setActiveCourse] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [xp, setXp] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100))
    }, 60000) // Increase progress by 1% every minute, up to 100%
    return () => clearInterval(timer)
  }, [])

  const handleStartCourse = (courseTitle: string) => {
    setXp((prevXp) => prevXp + Math.floor(Math.random() * 10) + 1)
    toast.success(`Started ${courseTitle}! You earned some XP.`)
  }

  return (
    <div className={`${styles.container} ${spaceGrotesk.className}`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <div className={styles.logoIcon}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evazSIwlqPLFU7rqnw9gOPGCRLNZdN.png"
                alt="UNAI TECH Logo"
                width={40}
                height={40}
                className={styles.logoImage}
              />
            </div>
          </Link>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`${styles.sidebarButton} ${item.active ? styles.active : ""}`}
              onClick={() => {
                setSidebarItems((prev) =>
                  prev.map((prevItem, i) => ({
                    ...prevItem,
                    active: i === index,
                  })),
                )
                item.action()
              }}
            >
              {item.active && <div className={styles.activeIndicator} />}
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <Input
              type="search"
              placeholder="Search for courses..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                const filtered = featuredCourses.filter((course) =>
                  course.title.toLowerCase().includes(e.target.value.toLowerCase()),
                )
                setFilteredCourses(filtered)
              }}
            />
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="ghost"
              size="icon"
              className={styles.iconButton}
              onClick={() => toast.info("You have no new notifications")}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={styles.iconButton}
              onClick={() => toast.info("Settings page coming soon!")}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button className={styles.profileButton} onClick={() => router.push("/profile")}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Zap className="mr-2 text-yellow-400" />
            <span>Progress: {progress}%</span>
          </div>
          <div className="flex items-center">
            <Trophy className="mr-2 text-blue-400" />
            <span>XP: {xp}</span>
          </div>
        </div>

        {/* Featured Courses */}
        <section className={styles.featuredCourses}>
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={index}
                className={styles.courseCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveCourse(index)}
                onHoverEnd={() => setActiveCourse(null)}
              >
                <div className={styles.courseImageContainer}>
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className={styles.courseImage}
                  />
                  <div className={styles.courseOverlay} />
                </div>
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseStudents}>{course.students}</p>
                  {activeCourse === index && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.courseDescription}>
                      {course.description}
                    </motion.p>
                  )}
                </div>
                <Button className={styles.startButton} onClick={() => handleStartCourse(course.title)}>
                  Start Course
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Quick Courses */}
        <section className={styles.quickCourses}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Free Internship Program</h2>
            <Button variant="ghost" onClick={() => setShowAllQuickCourses(true)}>
              View All
            </Button>
          </div>
          <div className={styles.quickCourseGrid}>
            {quickCourses.map((course, index) => (
              <motion.div
                key={index}
                className={styles.quickCourseCard}
                style={{ "--card-color": course.color } as any}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={150}
                  height={150}
                  className={styles.quickCourseImage}
                />
                <span className={styles.quickCourseTitle}>{course.title}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section className={styles.leaderboard}>
          <div className={styles.leaderboardHeader}>
            <h2 className={styles.sectionTitle}>Leaderboard</h2>
            <Button variant="ghost" className={styles.seeAllButton} onClick={() => setShowFullLeaderboard(true)}>
              See All
            </Button>
          </div>
          <div className={styles.leaderboardCards}>
            {leaderboardData.map((item, index) => (
              <motion.div
                key={index}
                className={styles.leaderboardCard}
                style={{ "--card-color": item.color } as any}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.leaderboardInfo}>
                  <div className={styles.leaderboardScore}>
                    <span className={styles.scoreIcon}>{item.icon}</span>
                    <span>{item.score}</span>
                  </div>
                  <span className={styles.rankBadge}>{item.rank}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      {showAchievements && <Achievements onClose={() => setShowAchievements(false)} />}
      {showStats && <Stats onClose={() => setShowStats(false)} />}
    </div>
  )
}

