// components/layouts/Footer.jsx
import { Dumbbell } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} WorkoutBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer