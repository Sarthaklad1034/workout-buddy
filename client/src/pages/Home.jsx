import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { Dumbbell, LineChart, Target } from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="h-screen overflow-hidden flex flex-col justify-between">
      {/* Hero Section with improved vertical centering */}
      <section className="h-[55vh] flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Your Personal
              <span className="block text-blue-600 mt-1 lg:mt-2">Workout Journey</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Take control of your fitness journey with personalized workout tracking, 
              progress monitoring, and goal setting - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 px-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 sm:px-8 py-3 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition duration-200 shadow-lg"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto inline-flex justify-center items-center px-6 sm:px-8 py-3 bg-white text-gray-800 text-base font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition duration-200 shadow-lg"
                  >
                    Welcome Back
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 sm:px-8 py-3 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition duration-200 shadow-lg"
                >
                  View Your Workouts
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with balanced spacing */}
      <section className="h-[45vh] bg-gray-50 flex items-center px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 h-full">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                  <Dumbbell className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 pt-2">
                  Personal Workout Log
                </h3>
              </div>
              <p className="text-sm lg:text-base text-gray-600">
                Create and maintain your personalized workout routine with ease.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                  <LineChart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 pt-2">
                  Track Progress
                </h3>
              </div>
              <p className="text-sm lg:text-base text-gray-600">
                Monitor your improvements and track your personal bests.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 pt-2">
                  Set Your Goals
                </h3>
              </div>
              <p className="text-sm lg:text-base text-gray-600">
                Define and track your fitness goals with milestone tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home