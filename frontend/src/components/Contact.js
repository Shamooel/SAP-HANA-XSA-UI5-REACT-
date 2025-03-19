"use client"

import { useState } from "react"
import {
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Input,
  TextArea,
  Button,
  MessageStrip,
  Card,
  Icon,
  Label,
  IllustratedMessage,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/email.js"
import "@ui5/webcomponents-icons/dist/phone.js"
import "@ui5/webcomponents-icons/dist/map.js"
import "@ui5/webcomponents-fiori/dist/illustrations/SuccessScreen.js"

import "../styles/Contact.css"
// Import the API service for contact form submission
import { submitContactForm } from "../services/apiService"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    console.log("Form submission started with data:", formData)

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Submit form data to backend API
      const response = await submitContactForm(formData)
      console.log("API Response:", response)

      if (response && response.success) {
        // Success
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        // API returned an error
        setErrorMessage(response?.message || "Something went wrong. Please try again later.")
      }
    } catch (error) {
      console.error("Contact form submission error:", error)

      // Detailed error logging
      if (error.response) {
        console.error("Error response data:", error.response.data)
        console.error("Error response status:", error.response.status)
        setErrorMessage(error.response.data?.message || "Server error. Please try again later.")
      } else if (error.request) {
        console.error("No response received:", error.request)
        setErrorMessage("No response from server. Please check your connection.")
      } else {
        console.error("Error message:", error.message)
        setErrorMessage("An error occurred. Please try again later.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <Title level="H1">Contact Us</Title>
        <Text className="contact-subtitle">
          We'd love to hear from you. Please fill out the form below or reach out using our contact information.
        </Text>
      </div>

      <div className="contact-container">
        <FlexBox
          direction={FlexBoxDirection.Row}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Stretch}
          wrap="Wrap"
          className="contact-content"
        >
          {/* Contact Form */}
          <Card className="contact-form-card">
            {submitSuccess ? (
              <div className="success-message">
                <IllustratedMessage
                  name="SuccessScreen"
                  titleText="Message Sent!"
                  subtitleText="Thank you for contacting us. We'll get back to you shortly."
                />
                <Button design="Emphasized" onClick={() => setSubmitSuccess(false)} className="new-message-btn">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <Title level="H2">Send Us a Message</Title>

                {errorMessage && (
                  <MessageStrip design="Negative" className="error-message">
                    {errorMessage}
                  </MessageStrip>
                )}

                <div className="form-group">
                  <Label for="name" required>
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label for="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <Label for="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <Label for="message" required>
                    Message
                  </Label>
                  <TextArea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>

                <div className="button-group">
                  <Button type="submit" design="Emphasized" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Contact Information */}
          <Card className="contact-info-card">
            <Title level="H2">Contact Information</Title>
            <div className="contact-info">
              <div className="contact-item">
                <Icon name="email" className="contact-icon" />
                <div className="contact-details">
                  <Label>Email</Label>
                  <Text>info@sapui5react.com</Text>
                </div>
              </div>

              <div className="contact-item">
                <Icon name="phone" className="contact-icon" />
                <div className="contact-details">
                  <Label>Phone</Label>
                  <Text>+1 (555) 123-4567</Text>
                </div>
              </div>

              <div className="contact-item">
                <Icon name="map" className="contact-icon" />
                <div className="contact-details">
                  <Label>Address</Label>
                  <Text>123 Business Avenue</Text>
                  <Text>Suite 456</Text>
                  <Text>San Francisco, CA 94107</Text>
                </div>
              </div>
            </div>

            <div className="business-hours">
              <Title level="H3">Business Hours</Title>
              <Text>Monday - Friday: 9:00 AM - 5:00 PM</Text>
              <Text>Saturday - Sunday: Closed</Text>
            </div>
          </Card>
        </FlexBox>
      </div>
    </div>
  )
}

export default Contact

