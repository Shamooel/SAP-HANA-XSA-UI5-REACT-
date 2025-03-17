// Mock data for dashboard
const mockData = {
    stats: [
      { id: 1, title: "Active Users", value: 1254, icon: "customer", trend: "up", percentage: 12 },
      { id: 2, title: "Products", value: 87, icon: "product", trend: "up", percentage: 5 },
      { id: 3, title: "Orders", value: 342, icon: "sales-order", trend: "down", percentage: 3 },
    ],
    recentActivity: [
      { id: 1, user: "John Doe", action: "Created a new project", time: "10 minutes ago" },
      { id: 2, user: "Jane Smith", action: "Updated product catalog", time: "1 hour ago" },
      { id: 3, user: "Mike Johnson", action: "Completed order #12345", time: "3 hours ago" },
    ],
  }
  
  // Get dashboard stats
  exports.getDashboardStats = (req, res) => {
    try {
      // Simulate a slight delay to mimic database fetch
      setTimeout(() => {
        res.status(200).json({ stats: mockData.stats })
      }, 300)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      res.status(500).json({ message: "Failed to fetch dashboard statistics", error: error.message })
    }
  }
  
  // Get recent activity
  exports.getRecentActivity = (req, res) => {
    try {
      // Simulate a slight delay to mimic database fetch
      setTimeout(() => {
        res.status(200).json({ recentActivity: mockData.recentActivity })
      }, 300)
    } catch (error) {
      console.error("Error fetching recent activity:", error)
      res.status(500).json({ message: "Failed to fetch recent activity", error: error.message })
    }
  }
  
  