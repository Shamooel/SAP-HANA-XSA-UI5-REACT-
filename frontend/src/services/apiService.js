import axios from "axios"

// Create axios instance with base URL - ensure it's pointing to your backend
const API_BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Dashboard API calls
export const fetchDashboardStats = async () => {
  console.log("Fetching dashboard stats from:", `${API_BASE_URL}/dashboard/stats`)
  try {
    const response = await api.get("/dashboard/stats")
    console.log("Dashboard stats response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

export const fetchRecentActivity = async () => {
  console.log("Fetching recent activity from:", `${API_BASE_URL}/dashboard/recent-activity`)
  try {
    const response = await api.get("/dashboard/recent-activity")
    console.log("Recent activity response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    throw error
  }
}

// Testimonials API calls
export const fetchTestimonials = async () => {
  console.log("Fetching testimonials from:", `${API_BASE_URL}/testimonials`)
  try {
    const response = await api.get("/testimonials")
    console.log("Testimonials response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    throw error
  }
}

// Contact API calls
export const submitContactForm = async (formData) => {
  console.log("Submitting contact form to:", `${API_BASE_URL}/contact/submit`)
  console.log("Contact form data:", formData)
  try {
    const response = await api.post("/contact/submit", formData)
    console.log("Contact form submission response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}

// Demo API calls
export const submitDemoRequest = async (formData) => {
  console.log("Submitting demo request to:", `${API_BASE_URL}/demo/submit`)
  console.log("Demo request data:", formData)
  try {
    const response = await api.post("/demo/submit", formData)
    console.log("Demo request submission response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error submitting demo request:", error)
    throw error
  }
}

// Services API calls
export const fetchServices = async () => {
  console.log("Fetching services from:", `${API_BASE_URL}/services`)
  try {
    const response = await api.get("/services")
    console.log("Services response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching services:", error)
    throw error
  }
}

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error("Server Error:", error.response.data)
      console.error("Status:", error.response.status)
      console.error("Headers:", error.response.headers)
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error - No response received:", error.request)
    } else {
      // Something else triggered an error
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  },
)

export default api

