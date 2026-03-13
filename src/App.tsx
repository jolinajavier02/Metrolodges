import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import HostDashboard from './pages/HostDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import './styles/original.css'

// Guards the /host route — redirects to login with ?intent=host if not authenticated
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) return <Navigate to="/login?intent=host&redirect=/host" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/host"
        element={
          <RequireAuth>
            <HostDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
