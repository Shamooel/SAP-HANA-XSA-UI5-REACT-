"use client"

import { useState } from "react"
import {
  Input,
  Button,
  Card,
  Title,
  Text,
  Icon,
  MessageStrip,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/key.js"
import "@ui5/webcomponents-icons/dist/hide.js"
import "@ui5/webcomponents-icons/dist/show.js"
import "@ui5/webcomponents-icons/dist/decline.js"
import "../styles/LoginComponent.css";
import "../App.js";


const LoginComponent = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation
      if (formData.username === "admin" && formData.password === "password") {
        // Success - handle login
        if (onSuccess) onSuccess()
        onClose()
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-overlay">
      <Card className="login-card">
        <FlexBox
          direction={FlexBoxDirection.Column}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Center}
          className="login-content"
        >
          <Icon name="user" className="login-avatar" />
          <Title level="H2">Welcome Back</Title>
          <Text className="login-subtitle">Please sign in to continue</Text>

          {error && (
            <MessageStrip design="Negative" className="login-error">
              {error}
            </MessageStrip>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <Icon name="user" className="input-icon" />
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="login-input"
              />
            </div>

            <div className="input-group">
              <Icon name="key" className="input-icon" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
              />
              <Icon
                name={showPassword ? "hide" : "show"}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <Button design="Emphasized" type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="login-footer">
            <Button design="Transparent" onClick={() => {}}>
              Forgot Password?
            </Button>
            <Button design="Transparent" onClick={() => {}}>
              Create Account
            </Button>
          </div>
        </FlexBox>

        <Button icon="decline" design="Transparent" onClick={onClose} className="close-button" />
      </Card>
    </div>
  )
}

export default LoginComponent

