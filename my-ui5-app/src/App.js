"use client"

import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@ui5/webcomponents-react"

// Components
import Header from "./components/Header"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import Footer from "./components/Footer"

// Styles
import "./styles/App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              {/* Add more routes as needed */}
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

