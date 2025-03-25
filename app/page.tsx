"use client"

import { Space_Grotesk } from "next/font/google"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import styles from "./page.module.css"
import { useState } from "react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={`${styles.container} ${spaceGrotesk.className}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-evazSIwlqPLFU7rqnw9gOPGCRLNZdN.png"
                alt="UNAI TECH Logo"
                width={32}
                height={32}
                className={styles.logoImage}
              />
            </div>
            <span className={styles.logoText}>UNAI TECH</span>
          </Link>
          
          <div className={styles.headerButtons}>
            <Link href="/login">
              <Button variant="ghost" className={styles.signInButton}>
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className={styles.tradingButton}>Login</Button>
            </Link>
            
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <motion.div
          className={styles.floatingElement}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-mgy7DabhcSc9eKBJZE52CB0jkPiL5e.png"
            alt="AI Education"
            width={500}
            height={500}
            className={styles.crystalImage}
          />
        </motion.div>

        <motion.div
          className={styles.glassContainer}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            Revolutionize Your Learning with <span className={styles.gradientText}>UNAI TECH</span>
          </h1>
          <p className={styles.subtitle}>
            Explore cutting-edge courses in AI, and more. Join the future of education today!
          </p>
          <Link href="/Dashboard">
            <Button className={styles.glowingButton}>Start Journey →</Button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

