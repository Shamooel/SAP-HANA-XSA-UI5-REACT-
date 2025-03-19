"use client"

import { useState, useEffect } from "react"
import {
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Card,
  Icon,
  List,
  ListItemStandard,
  IllustratedMessage,
  ProgressIndicator,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/wrench.js"
import "@ui5/webcomponents-icons/dist/database.js"
import "@ui5/webcomponents-icons/dist/cloud.js"
import "@ui5/webcomponents-icons/dist/shield.js"
import "@ui5/webcomponents-icons/dist/education.js"
import "@ui5/webcomponents-icons/dist/headset.js"
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"

import "../styles/Services.css"

// Import API service
import { fetchServices } from "../services/apiService"

function Services() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getServices = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch services from backend
        const response = await fetchServices()
        setServices(response.services)
      } catch (error) {
        console.error("Error fetching services:", error)
        setError("Failed to load services. Please try again later.")
        setServices([])
      } finally {
        setIsLoading(false)
      }
    }

    getServices()
  }, [])

  return (
    <div className="services-page">
      <div className="services-header">
        <Title level="H1">Our Services</Title>
        <Text className="services-subtitle">
          We offer a comprehensive range of SAP UI5 and Fiori services to help your business thrive in the digital era.
        </Text>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <ProgressIndicator value={70} />
          <Text>Loading services...</Text>
        </div>
      ) : error ? (
        <div className="error-container">
          <IllustratedMessage name="NoData" titleText="Could not load services" subtitleText={error} />
        </div>
      ) : (
        <div className="services-container">
          <FlexBox
            direction={FlexBoxDirection.Row}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Stretch}
            wrap="Wrap"
            className="services-grid"
          >
            {services.map((service) => (
              <Card key={service.id} className="service-card">
                <div className="service-icon-container">
                  <Icon name={service.icon} className="service-icon" />
                </div>
                <Title level="H2" className="service-title">
                  {service.title}
                </Title>
                <Text className="service-description">{service.description}</Text>
                <List className="service-features">
                  {service.features.map((feature, index) => (
                    <ListItemStandard key={index}>{feature}</ListItemStandard>
                  ))}
                </List>
              </Card>
            ))}
          </FlexBox>
        </div>
      )}

      <div className="services-cta">
        <Card className="cta-card">
          <Title level="H2">Need a Custom Solution?</Title>
          <Text>
            Our team of experts can develop tailored solutions to address your specific business challenges. Contact us
            today to discuss your requirements.
          </Text>
          <div className="cta-buttons">
            <a href="/contact" className="ui5-button-primary">
              Contact Us
            </a>
            <a href="/demo" className="ui5-button-secondary">
              Request Demo
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Services

