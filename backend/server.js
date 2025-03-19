const express = require("express")
const cors = require("cors")
const path = require("path")
const dashboardRoutes = require("./routes/dashboardRoutes")
const testimonialRoutes = require("./routes/testimonialRoutes")
const contactRoutes = require("./routes/contactRoutes")
const demoRoutes = require("./routes/demoRoutes")
const servicesRoutes = require("./routes/servicesRoutes")

// Initialize express app
const app = express()

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  if (req.method === "POST") {
    console.log("Request body:", JSON.stringify(req.body, null, 2))
  }
  next()
})

// API Routes
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/testimonials", testimonialRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/demo", demoRoutes)
app.use("/api/services", servicesRoutes)

// Test route to verify server is running
app.get("/api/test", (req, res) => {
  res.json({ message: "API server is running" })
})

// Serve static files from the frontend build directory in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err)
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  })
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})

