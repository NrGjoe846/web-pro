"use client"

import { useState } from "react"
import { Space_Grotesk } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  Bell,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  Trophy,
  Star,
  Clock,
  Shield,
  Bell as BellIcon,
  Moon,
  Sun,
  Languages,
  LogOut,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
})

// Mock user data - In a real app, this would come from your backend
const mockUserData = {
  id: "1",
  name: "Alex Johnson",
  username: "@alexj",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  bio: "AI enthusiast and lifelong learner. Currently exploring the fascinating world of machine learning and neural networks.",
  avatar: "https://i.pravatar.cc/150?img=12",
  coverPhoto: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e",
  socialLinks: {
    twitter: "twitter.com/alexj",
    linkedin: "linkedin.com/in/alexj",
    github: "github.com/alexj",
  },
  achievements: [
    { name: "Early Adopter", description: "Joined in the first month", icon: Star },
    { name: "Course Master", description: "Completed 10 courses", icon: BookOpen },
    { name: "Top Performer", description: "Achieved 95% score", icon: Trophy },
  ],
  stats: {
    coursesCompleted: 12,
    certificatesEarned: 5,
    totalHoursLearned: 156,
    averageScore: 92,
  },
  skills: ["Machine Learning", "Python", "Neural Networks", "Data Science", "AI Ethics"],
  recentActivity: [
    { type: "course", name: "Advanced AI Concepts", date: "2 days ago" },
    { type: "certificate", name: "Machine Learning Expert", date: "1 week ago" },
    { type: "achievement", name: "Perfect Score", date: "2 weeks ago" },
  ],
}

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(mockUserData)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpdateProfile = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully!")
  }

  const handleAvatarUpload = () => {
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      toast.success("Profile picture updated!")
    }, 1500)
  }

  return (
    <div className={`min-h-screen bg-black text-white ${spaceGrotesk.className}`}>
      {/* Cover Photo */}
      <div 
        className="h-48 md:h-64 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${userData.coverPhoto})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-black">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full"
              onClick={handleAvatarUpload}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                Pro Member
              </Badge>
            </div>
            <p className="text-gray-400 mt-1">{userData.username}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {userData.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {userData.joinDate}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            <Button variant="outline">
              Share Profile
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bio & Skills */}
              <Card className="md:col-span-2 bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea 
                      value={userData.bio}
                      className="mb-4 bg-gray-800 border-gray-700"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-300 mb-4">{userData.bio}</p>
                  )}
                  
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Courses Completed</span>
                      <span className="font-semibold">{userData.stats.coursesCompleted}</span>
                    </div>
                    <Progress value={75} className="bg-gray-800" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Average Score</span>
                      <span className="font-semibold">{userData.stats.averageScore}%</span>
                    </div>
                    <Progress value={92} className="bg-gray-800" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Hours Learned</span>
                      <span className="font-semibold">{userData.stats.totalHoursLearned}h</span>
                    </div>
                    <Progress value={60} className="bg-gray-800" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="md:col-span-2 bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          {activity.type === 'course' && <BookOpen className="h-5 w-5" />}
                          {activity.type === 'certificate' && <Trophy className="h-5 w-5" />}
                          {activity.type === 'achievement' && <Star className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Social */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Contact & Social</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <Link href={userData.socialLinks.twitter} className="text-blue-400 hover:underline">
                      Twitter
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Activity Timeline */}
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="relative pl-8 pb-8 border-l border-gray-800">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-800 border-2 border-purple-500" />
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userData.achievements.map((achievement, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Receive email updates</span>
                      <Switch 
                        checked={notifications} 
                        onCheckedChange={setNotifications} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Theme Preference</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Dark Mode</span>
                      <Switch 
                        checked={isDarkMode} 
                        onCheckedChange={setIsDarkMode}
                      />
                    </div>
                  </div>

                  <Button variant="destructive" className="w-full" onClick={() => router.push("/login")}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Make profile public</span>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Enable 2FA</span>
                      <Switch />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
