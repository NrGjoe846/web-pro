"use client"

import { useState } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import styles from "./Login.module.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your login logic here
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className={`${styles.container} ${spaceGrotesk.className}`}>
      <Link href="/" className={styles.backButton}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <motion.div
        className={styles.glassContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon} />
          <span className={styles.logoText}>UNAI TECH</span>
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required className={styles.input} />
          </div>
          <Button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account?</p>
          <Link href="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

