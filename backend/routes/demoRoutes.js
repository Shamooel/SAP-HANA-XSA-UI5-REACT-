const express = require("express")
const router = express.Router()
const demoController = require("../controllers/demoController")

// Submit demo request
router.post("/submit", demoController.submitDemoRequest)

// Get all demo requests (admin route)
router.get("/requests", demoController.getDemoRequests)

module.exports = router

