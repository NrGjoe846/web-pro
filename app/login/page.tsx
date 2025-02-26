"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [isNavigating, setIsNavigating] = useState(false) // Added state
  const router = useRouter()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: "",
      password: "",
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      toast.success("Logged in successfully!")
      // Handle successful login here (e.g., redirect to dashboard)
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success("Successfully signed in with Google!")
      // Handle successful login here (e.g., redirect to dashboard)
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-[1200px] overflow-hidden rounded-[32px] grid lg:grid-cols-2 glass-morphism animate-pulse-glow">
        <div className="relative hidden lg:block p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 animate-pulse" />
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="relative z-10 transform-gpu"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x-SZaVKtNLCA74SrX2i257Hx8twC5JnV.png"
              alt="Geometric Crystal"
              width={800}
              height={800}
              className="w-full h-full object-contain animate-float drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              priority
            />
          </motion.div>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="space-y-8 max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Login to Your Account
              </h2>
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="relative group">
                    <Input
                      placeholder="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/50 
                        focus:bg-white/10 transition-all duration-300 group-hover:bg-white/10 input-glow"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <div className="relative group">
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/50 
                        focus:bg-white/10 transition-all duration-300 group-hover:bg-white/10 input-glow pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs text-red-400"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 
                    hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 
                    transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Login"}
                </Button>
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 
                    hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 
                    transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue with Google
                </Button>
              </motion.div>
            </form>
            <div className="text-center text-white/50">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up
              </Link>
              <div className="mt-4">
                <Button
                  variant="link"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  onClick={() => router.push("/Dashboard")}
                >
                  Skip 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

