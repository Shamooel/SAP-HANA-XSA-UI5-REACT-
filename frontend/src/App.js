"use client"

import { useState, useEffect, useCallback } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@ui5/webcomponents-react"

// Components
import Header from "./components/Header"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import Footer from "./components/Footer"
import Contact from "./components/Contact"
import Services from "./components/Services"
import Demo from "./components/Demo"

// Styles
import "./styles/App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }, [])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const toggleLoginModal = useCallback(() => {
    setShowLogin((prev) => !prev)
  }, [])

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />
  }

  return (
    <ThemeProvider>
      <div className="app">
        <Header onLoginClick={toggleLoginModal} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="main-content">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/demo" element={<Demo />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div className="dashboard-page">
                      <h1>Dashboard (Protected Route)</h1>
                      <p>This page is only visible when logged in</p>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route for 404 */}
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                  </div>
                }
              />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

