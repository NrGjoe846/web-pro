// This is a mock Firebase configuration
// Replace this with your actual Firebase configuration when you set it up

export const auth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Simulate authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ user: { email } })
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    // Simulate user creation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ user: { email } })
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  },
}

export const googleProvider = {
  // Add any necessary properties or methods for Google sign-in
}

