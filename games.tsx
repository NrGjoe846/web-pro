"use client"

import { Space_Grotesk } from "next/font/google"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Bell, Search, Settings, User } from "lucide-react"
import styles from "./Games.module.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const featuredGames = [
  {
    title: "Brawl Star",
    image: "/placeholder.svg?height=200&width=300",
    players: "12.5k Players",
  },
  {
    title: "Star Wars",
    image: "/placeholder.svg?height=200&width=300",
    players: "10.2k Players",
  },
  {
    title: "Clash Mini",
    image: "/placeholder.svg?height=200&width=300",
    players: "8.3k Players",
  },
]

const leaderboardData = [
  { color: "#9333ea", score: "$300", rank: "$500" },
  { color: "#f97316", score: "$350", rank: "$550" },
  { color: "#ef4444", score: "$200", rank: "$400" },
]

const quickGames = [
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
  { title: "PLANET", image: "/placeholder.svg?height=150&width=150" },
]

export default function GamesPage() {
  return (
    <div className={`${styles.container} ${spaceGrotesk.className}`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evazSIwlqPLFU7rqnw9gOPGCRLNZdN.png"
              alt="UNAI TECH Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <Button variant="ghost" className={styles.sidebarButton}>
            <div className={styles.activeIndicator} />
            <div className={styles.iconWrapper}>🎮</div>
          </Button>
          <Button variant="ghost" className={styles.sidebarButton}>
            <div className={styles.iconWrapper}>🏆</div>
          </Button>
          <Button variant="ghost" className={styles.sidebarButton}>
            <div className={styles.iconWrapper}>📊</div>
          </Button>
          <Button variant="ghost" className={styles.sidebarButton}>
            <div className={styles.iconWrapper}>💎</div>
          </Button>
          <Button variant="ghost" className={styles.sidebarButton}>
            <div className={styles.iconWrapper}>⚡</div>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <Input type="search" placeholder="Search for games..." className={styles.searchInput} />
          </div>
          <div className={styles.headerActions}>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button className={styles.profileButton}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Featured Games */}
        <section className={styles.featuredGames}>
          {featuredGames.map((game, index) => (
            <motion.div
              key={index}
              className={styles.gameCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={game.image || "/placeholder.svg"}
                alt={game.title}
                width={300}
                height={200}
                className={styles.gameImage}
              />
              <div className={styles.gameInfo}>
                <h3>{game.title}</h3>
                <p>{game.players}</p>
              </div>
              <Button className={styles.playButton}>Play Now</Button>
            </motion.div>
          ))}
        </section>

        {/* Leaderboard */}
        <section className={styles.leaderboard}>
          <div className={styles.leaderboardHeader}>
            <h2>Leaderboard</h2>
            <Button variant="ghost" className={styles.seeAllButton}>
              See All
            </Button>
          </div>
          <div className={styles.leaderboardCards}>
            {leaderboardData.map((item, index) => (
              <div key={index} className={styles.leaderboardCard} style={{ "--card-color": item.color } as any}>
                <div className={styles.leaderboardInfo}>
                  <span>{item.score}</span>
                  <span>{item.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Games */}
        <section className={styles.quickGames}>
          <div className={styles.sectionHeader}>
            <h2>Quick games</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className={styles.quickGameGrid}>
            {quickGames.map((game, index) => (
              <motion.div
                key={index}
                className={styles.quickGameCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  width={150}
                  height={150}
                  className={styles.quickGameImage}
                />
                <span className={styles.quickGameTitle}>{game.title}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

