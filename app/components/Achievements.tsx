import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Achievement {
  id: number
  title: string
  description: string
  completed: boolean
}

const achievements: Achievement[] = [
  { id: 1, title: "First Course", description: "Complete your first course", completed: true },
  { id: 2, title: "High Achiever", description: "Score over 90% on a course exam", completed: false },
  { id: 3, title: "Dedicated Learner", description: "Study for 7 consecutive days", completed: false },
]

export function Achievements({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${achievement.completed ? "bg-green-500" : "bg-gray-500"}`} />
              <div>
                <h3 className="font-semibold text-white">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

