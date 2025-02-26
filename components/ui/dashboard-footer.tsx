'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail,
  ArrowRight
} from 'lucide-react'

export function DashboardFooter() {
  return (
    <footer className="py-16 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              UNAI TECH
            </h2>
            <p className="text-gray-400">
              Upscale your Skills with AI Powered Solutions. Learn AI be Smart.
            </p>
            <div className="flex space-x-4 pt-2">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          {/* Links Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Events
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Links Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  API Reference
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest AI trends, courses, and events.
            </p>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Your email" 
                  className="pl-10 bg-black/20 border-white/10 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 UNAI TECH. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
