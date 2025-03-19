// Controller for handling services data

// Mock data for services
const mockServices = [
    {
      id: 1,
      title: "SAP UI5 Development",
      icon: "wrench",
      description: "Custom UI5 application development tailored to your business needs.",
      features: [
        "Responsive UI design",
        "Integration with SAP backend systems",
        "Custom control development",
        "Performance optimization",
      ],
    },
    {
      id: 2,
      title: "SAP Fiori Implementation",
      icon: "database",
      description: "End-to-end implementation of SAP Fiori applications.",
      features: [
        "Fiori launchpad configuration",
        "App customization",
        "Role-based access control",
        "User experience optimization",
      ],
    },
    {
      id: 3,
      title: "Cloud Solutions",
      icon: "cloud",
      description: "Cloud-based SAP solutions for modern enterprises.",
      features: [
        "SAP BTP implementation",
        "Cloud migration strategies",
        "Hybrid cloud architecture",
        "Scalable solutions",
      ],
    },
    {
      id: 4,
      title: "Security Services",
      icon: "shield",
      description: "Comprehensive security solutions for SAP environments.",
      features: ["Security assessment", "Authorization concept design", "Compliance management", "Security monitoring"],
    },
    {
      id: 5,
      title: "Training & Education",
      icon: "education",
      description: "Expert training for your development and business teams.",
      features: [
        "UI5/Fiori development workshops",
        "Best practices training",
        "Custom curriculum development",
        "Hands-on labs",
      ],
    },
    {
      id: 6,
      title: "Support & Maintenance",
      icon: "headset",
      description: "Ongoing support and maintenance for your SAP applications.",
      features: ["24/7 technical support", "Performance monitoring", "Regular updates and patches", "Issue resolution"],
    },
  ]
  
  // Get all services
  exports.getAllServices = (req, res) => {
    try {
      // In a real application, this would fetch from SAP HANA
      // For now, we'll use mock data
      res.status(200).json({ services: mockServices })
    } catch (error) {
      console.error("Error fetching services:", error)
      res.status(500).json({
        success: false,
        message: "Failed to fetch services",
        error: error.message,
      })
    }
  }
  
  // Get service by ID
  exports.getServiceById = (req, res) => {
    try {
      const serviceId = Number.parseInt(req.params.id)
      const service = mockServices.find((s) => s.id === serviceId)
  
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        })
      }
  
      res.status(200).json({ service })
    } catch (error) {
      console.error("Error fetching service:", error)
      res.status(500).json({
        success: false,
        message: "Failed to fetch service",
        error: error.message,
      })
    }
  }
  
  