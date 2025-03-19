const express = require("express")
const router = express.Router()
const servicesController = require("../controllers/servicesController")

// Get all services
router.get("/", servicesController.getAllServices)

// Get service by ID
router.get("/:id", servicesController.getServiceById)

module.exports = router

