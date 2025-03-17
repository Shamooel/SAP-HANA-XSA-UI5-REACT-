// Controller for handling demo requests

// Store demo requests (in a real app, this would be in a database)
const demoRequests = []

// Handle demo request submission
exports.submitDemoRequest = (req, res) => {
  try {
    console.log("Received demo request:", req.body)

    const { firstName, lastName, email, company, jobTitle, phone, preferredDate, interests, message, agreeToTerms } =
      req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !agreeToTerms) {
      console.log("Validation failed: Missing required fields")
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields and agree to terms",
      })
    }

    // Create new demo request
    const newRequest = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      company,
      jobTitle: jobTitle || "",
      phone: phone || "",
      preferredDate: preferredDate || "",
      interests: interests || [],
      message: message || "",
      agreeToTerms,
      submittedAt: new Date().toISOString(),
    }

    // Save request (in memory for now)
    demoRequests.push(newRequest)

    // Log request (would be saved to database in production)
    console.log("New demo request saved:", newRequest)

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Demo request submitted successfully",
      request: newRequest,
    })
  } catch (error) {
    console.error("Error processing demo request:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to process demo request",
      error: error.message,
    })
  }
}

// Get all demo requests (for admin purposes)
exports.getDemoRequests = (req, res) => {
  try {
    return res.status(200).json({ requests: demoRequests })
  } catch (error) {
    console.error("Error fetching demo requests:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to fetch demo requests",
      error: error.message,
    })
  }
}

