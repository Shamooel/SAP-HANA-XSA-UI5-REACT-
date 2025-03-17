const express = require("express")
const router = express.Router()
const dashboardController = require("../controllers/dashboardController")

// Get dashboard stats
router.get("/stats", dashboardController.getDashboardStats)

// Get recent activity
router.get("/recent-activity", dashboardController.getRecentActivity)

module.exports = router

