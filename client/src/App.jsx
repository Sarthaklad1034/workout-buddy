// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import VerificationPending from './pages/VerificationPending';

const App = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
          />
           <Route path="/verification-pending" element={<VerificationPending />} />
           <Route path="/verify/:token" element={<VerificationPending />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App