'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, User, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface NavbarProps {
  className?: string
}

export function DashboardNav({ className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Mock search function
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Mock API call for search results
      const mockResults = [
        'AI Course: Introduction to Machine Learning',
        'AI Workshop: Neural Networks',
        'Internship: AI Research Assistant',
        'AI Event: Hackathon 2025'
      ].filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(mockResults)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // You would implement actual dark mode toggling here
    // document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            >
              UNAI TECH
            </motion.div>
          </Link>

          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Events', 'Internships', 'Courses', 'About Us'].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link 
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            ))}
          </nav>

          {/* Right Side Elements */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-black/30 border border-white/10 rounded-full overflow-hidden px-3 py-1.5">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="border-0 bg-transparent focus:ring-0 focus:outline-none text-sm p-0 h-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchActive(true)}
                  onBlur={() => setTimeout(() => setSearchActive(false), 200)}
                />
              </div>

              {/* Search Results Dropdown */}
              {searchActive && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <ul className="py-1">
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-150">
                          {result}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-morphism border-white/10">
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/profile" className="flex items-center w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/settings" className="flex items-center w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/logout" className="flex items-center w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="relative overflow-hidden"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
