import axios from "axios"

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Dashboard API calls
export const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard/stats")
    return response.data
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

export const fetchRecentActivity = async () => {
  try {
    const response = await api.get("/dashboard/recent-activity")
    return response.data
  } catch (error) {
    console.error("Error fetching recent activity:", error)
    throw error
  }
}

// Testimonials API calls
export const fetchTestimonials = async () => {
  try {
    const response = await api.get("/testimonials")
    return response.data
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    throw error
  }
}

// Contact API calls
export const submitContactForm = async (formData) => {
  console.log("Submitting contact form with data:", formData)
  try {
    const response = await api.post("/contact/submit", formData)
    console.log("Contact form submission response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}

// Demo Request API call
export const submitDemoRequest = async (demoData) => {
  console.log("Submitting demo request with data:", demoData);
  try {
    const response = await api.post("/demo-request", demoData);
    console.log("Demo request response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting demo request:", error);
    throw error;
  }
};


// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error("Server Error:", error.response.data)
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Network Error:", error.request)
    } else {
      // Something else triggered an error
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

export default api

