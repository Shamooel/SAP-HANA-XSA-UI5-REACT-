// Controller for handling contact form submissions

// Store contact form submissions (in a real app, this would be in a database)
const contactSubmissions = []

// Handle contact form submission
exports.submitContactForm = (req, res) => {
  try {
    console.log("Received contact form submission:", req.body)

    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      console.log("Validation failed: Missing required fields")
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      })
    }

    // Create new contact submission
    const newSubmission = {
      id: Date.now(),
      name,
      email,
      subject: subject || "(No subject)",
      message,
      submittedAt: new Date().toISOString(),
    }

    // Save submission (in memory for now)
    contactSubmissions.push(newSubmission)

    // Log submission (would be saved to database in production)
    console.log("New contact form submission saved:", newSubmission)

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      submission: newSubmission,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to process contact form submission",
      error: error.message,
    })
  }
}

// Get all contact submissions (for admin purposes)
exports.getContactSubmissions = (req, res) => {
  try {
    return res.status(200).json({ submissions: contactSubmissions })
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions",
      error: error.message,
    })
  }
}

