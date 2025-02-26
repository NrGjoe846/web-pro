"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the username in your backend
    toast.success(`Username updated to ${username}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button type="submit">Update Username</Button>
      </form>
      <Button variant="outline" className="mt-4" onClick={() => router.push("/courses")}>
        Back to Courses
      </Button>
    </div>
  )
}

