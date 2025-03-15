"use client"

import { useState } from "react"
import {
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Input,
  TextArea,
  Button,
  MessageStrip,
  Card,
  Label,
  DatePicker,
  CheckBox,
  IllustratedMessage,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/calendar.js"
import "@ui5/webcomponents-fiori/dist/illustrations/SuccessScreen.js"

import "../styles/Demo.css"

function Demo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    preferredDate: "",
    interests: [],
    message: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const interestOptions = [
    "SAP UI5 Development",
    "SAP Fiori Implementation",
    "Cloud Solutions",
    "Data Management",
    "Training & Support",
    "Security Services",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleInterestChange = (interest) => {
    const newInterests = [...formData.interests]

    if (newInterests.includes(interest)) {
      const index = newInterests.indexOf(interest)
      newInterests.splice(index, 1)
    } else {
      newInterests.push(interest)
    }

    setFormData({
      ...formData,
      interests: newInterests,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      setErrorMessage("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    if (!formData.agreeToTerms) {
      setErrorMessage("You must agree to the terms and conditions")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      setSubmitSuccess(true)
      window.scrollTo(0, 0)
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="demo-page">
      <div className="demo-header">
        <Title level="H1">Request a Demo</Title>
        <Text className="demo-subtitle">
          Experience the power of our SAP UI5 solutions with a personalized demo tailored to your business needs.
        </Text>
      </div>

      <div className="demo-container">
        {submitSuccess ? (
          <Card className="success-card">
            <div className="success-message">
              <IllustratedMessage
                name="SuccessScreen"
                titleText="Demo Request Submitted!"
                subtitleText="Thank you for your interest. Our team will contact you shortly to schedule your personalized demo."
              />
              <Button
                design="Emphasized"
                onClick={() => {
                  setSubmitSuccess(false)
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    company: "",
                    jobTitle: "",
                    phone: "",
                    preferredDate: "",
                    interests: [],
                    message: "",
                    agreeToTerms: false,
                  })
                }}
                className="new-request-btn"
              >
                Submit Another Request
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="demo-form-card">
            <form onSubmit={handleSubmit} className="demo-form">
              <Title level="H2">Your Information</Title>

              {errorMessage && (
                <MessageStrip design="Negative" className="error-message">
                  {errorMessage}
                </MessageStrip>
              )}

              <FlexBox
                direction={FlexBoxDirection.Row}
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                wrap={FlexBoxWrap.Wrap}
                className="form-row"
              >
                <div className="form-group half">
                  <Label for="firstName" required>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group half">
                  <Label for="lastName" required>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </FlexBox>

              <FlexBox
                direction={FlexBoxDirection.Row}
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                wrap={FlexBoxWrap.Wrap}
                className="form-row"
              >
                <div className="form-group half">
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

                <div className="form-group half">
                  <Label for="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </FlexBox>

              <FlexBox
                direction={FlexBoxDirection.Row}
                justifyContent={FlexBoxJustifyContent.SpaceBetween}
                wrap={FlexBoxWrap.Wrap}
                className="form-row"
              >
                <div className="form-group half">
                  <Label for="company" required>
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group half">
                  <Label for="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Your job title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </FlexBox>

              <div className="form-group">
                <Label for="preferredDate">Preferred Demo Date</Label>
                <DatePicker
                  id="preferredDate"
                  name="preferredDate"
                  placeholder="Select a date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  formatPattern="YYYY-MM-dd"
                  minDate="2023-01-01"
                />
              </div>

              <div className="form-group">
                <Label>Areas of Interest</Label>
                <div className="interests-container">
                  {interestOptions.map((interest, index) => (
                    <CheckBox
                      key={index}
                      text={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="interest-checkbox"
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <Label for="message">Additional Information</Label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="Tell us about your specific requirements or questions"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="form-group terms">
                <CheckBox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  text="I agree to the terms and conditions"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  required
                />
              </div>

              <Button type="submit" design="Emphasized" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Submitting..." : "Request Demo"}
              </Button>
            </form>
          </Card>
        )}
      </div>

      <div className="demo-features">
        <Title level="H2" className="features-title">
          What to Expect in Your Demo
        </Title>

        <FlexBox
          direction={FlexBoxDirection.Row}
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          className="features-container"
        >
          <Card className="feature-card">
            <Title level="H3">Personalized Walkthrough</Title>
            <Text>
              Get a customized demonstration of our SAP UI5 solutions tailored to your industry and business needs.
            </Text>
          </Card>

          <Card className="feature-card">
            <Title level="H3">Expert Consultation</Title>
            <Text>
              Speak directly with our SAP specialists who can answer your technical questions and provide insights.
            </Text>
          </Card>

          <Card className="feature-card">
            <Title level="H3">Use Case Examples</Title>
            <Text>See real-world examples of how our solutions have helped businesses similar to yours.</Text>
          </Card>

          <Card className="feature-card">
            <Title level="H3">Implementation Roadmap</Title>
            <Text>Receive a high-level overview of what implementation would look like for your organization.</Text>
          </Card>
        </FlexBox>
      </div>
    </div>
  )
}

export default Demo

