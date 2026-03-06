import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import './styles/original.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}
