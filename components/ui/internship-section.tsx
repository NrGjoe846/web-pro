'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  Filter,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Internship {
  id: number
  company: string
  role: string
  location: string
  stipend: string
  duration: string
  deadline: string
  logo: string
  skills: string[]
  isRemote: boolean
  isHotspot: boolean
}

const mockInternships: Internship[] = [
  {
    id: 1,
    company: "TechAI Solutions",
    role: "Machine Learning Intern",
    location: "Bangalore, India",
    stipend: "₹20,000/month",
    duration: "3 months",
    deadline: "Apr 10, 2025",
    logo: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
    skills: ["Python", "TensorFlow", "Data Analysis"],
    isRemote: true,
    isHotspot: true
  },
  {
    id: 2,
    company: "DataVision Corp",
    role: "Data Science Intern",
    location: "Delhi, India",
    stipend: "₹15,000/month",
    duration: "6 months",
    deadline: "Mar 25, 2025",
    logo: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
    skills: ["SQL", "Python", "Statistics"],
    isRemote: false,
    isHotspot: false
  },
  {
    id: 3,
    company: "NeuralWorks",
    role: "AI Research Intern",
    location: "Mumbai, India",
    stipend: "₹25,000/month",
    duration: "4 months",
    deadline: "Apr 5, 2025",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    skills: ["PyTorch", "Research", "Computer Vision"],
    isRemote: true,
    isHotspot: true
  },
  {
    id: 4,
    company: "CloudTech AI",
    role: "NLP Engineer Intern",
    location: "Hyderabad, India",
    stipend: "₹18,000/month",
    duration: "3 months",
    deadline: "Mar 30, 2025",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
    skills: ["NLP", "Python", "BERT"],
    isRemote: false,
    isHotspot: false
  }
]

export function InternshipSection() {
  const [hoveredInternship, setHoveredInternship] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    remote: false,
    hotspots: false
  })
  
  // Filter internships based on search query and filters
  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch = 
      internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRemote = selectedFilters.remote ? internship.isRemote : true
    const matchesHotspot = selectedFilters.hotspots ? internship.isHotspot : true
    
    return matchesSearch && matchesRemote && matchesHotspot
  })
  
  const toggleFilter = (filter: 'remote' | 'hotspots') => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Internship & Career Opportunities
          </h2>
          <p className="text-gray-400 mt-2">
            Find AI-related internships and kickstart your career
          </p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-white/10 glass-morphism overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by role, company, or location..." 
                    className="pl-10 bg-black/20 border-white/10 focus:border-purple-500/50 transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Filter Button */}
                <Button 
                  variant="outline" 
                  className="border-white/10 hover:bg-white/5 flex items-center"
                  onClick={() => setFiltersVisible(!filtersVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              {/* Filter Options */}
              {filtersVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant={selectedFilters.remote ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        selectedFilters.remote 
                          ? "bg-purple-500 hover:bg-purple-600" 
                          : "border-white/10 hover:bg-white/5"
                      )}
                      onClick={() => toggleFilter('remote')}
                    >
                      {selectedFilters.remote && <CheckCircle className="h-3 w-3 mr-1" />}
                      Remote
                    </Button>
                    
                    <Button 
                      variant={selectedFilters.hotspots ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        selectedFilters.hotspots 
                          ? "bg-purple-500 hover:bg-purple-600" 
                          : "border-white/10 hover:bg-white/5"
                      )}
                      onClick={() => toggleFilter('hotspots')}
                    >
                      {selectedFilters.hotspots && <CheckCircle className="h-3 w-3 mr-1" />}
                      Hotspot Opportunities
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              onMouseEnter={() => setHoveredInternship(internship.id)}
              onMouseLeave={() => setHoveredInternship(null)}
            >
              <Card className={cn(
                "overflow-hidden border-white/10 glass-morphism transition-all duration-300",
                hoveredInternship === internship.id ? 'transform scale-[1.02] shadow-lg shadow-purple-500/20' : ''
              )}>
                <CardContent className="p-0">
                  <div className="flex p-5">
                    {/* Company Logo */}
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 overflow-hidden flex items-center justify-center">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${internship.logo})` }}
                        />
                      </div>
                    </div>
                    
                    {/* Internship Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{internship.role}</h3>
                          <p className="text-gray-400">{internship.company}</p>
                        </div>
                        
                        {/* Badges */}
                        <div className="flex space-x-2">
                          {internship.isRemote && (
                            <Badge className="bg-green-500">Remote</Badge>
                          )}
                          {internship.isHotspot && (
                            <Badge className="bg-yellow-500">Hotspot</Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Location, Stipend, Duration */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{internship.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span>{internship.stipend}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                          <Briefcase className="h-3 w-3 mr-1" />
                          <span>{internship.duration}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Apply by: {internship.deadline}</span>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {internship.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="border-white/10 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="p-4 bg-black/20 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Apply by <span className="font-medium text-white">{internship.deadline}</span>
                    </span>
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Quick Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 group"
          >
            View More Internships
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
