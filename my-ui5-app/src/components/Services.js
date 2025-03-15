"use client"

import {
  Title,
  Text,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxWrap,
  Card,
  Icon,
  Button,
  List,
  ListItemStandard,
  ProgressIndicator,
} from "@ui5/webcomponents-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "@ui5/webcomponents-icons/dist/wrench.js"
import "@ui5/webcomponents-icons/dist/desktop-mobile.js"
import "@ui5/webcomponents-icons/dist/cloud.js"
import "@ui5/webcomponents-icons/dist/database.js"
import "@ui5/webcomponents-icons/dist/education.js"
import "@ui5/webcomponents-icons/dist/shield.js"
import "@ui5/webcomponents-icons/dist/arrow-right.js"

import "../styles/Services.css"

function Services() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setServices([
          {
            id: 1,
            title: "SAP UI5 Development",
            description: "Custom SAP UI5 application development tailored to your business needs",
            icon: "desktop-mobile",
            features: [
              "Responsive UI design",
              "Custom components",
              "Integration with SAP backend systems",
              "Performance optimization",
            ],
          },
          {
            id: 2,
            title: "SAP Fiori Implementation",
            description: "End-to-end SAP Fiori implementation services for enhanced user experience",
            icon: "wrench",
            features: [
              "Fiori launchpad configuration",
              "App personalization",
              "Role-based access control",
              "Fiori app extension",
            ],
          },
          {
            id: 3,
            title: "Cloud Solutions",
            description: "Migrate and optimize your SAP applications for cloud environments",
            icon: "cloud",
            features: [
              "SAP Cloud Platform integration",
              "Cloud migration strategy",
              "Hybrid cloud solutions",
              "Cloud performance monitoring",
            ],
          },
          {
            id: 4,
            title: "Data Management",
            description: "Comprehensive data management solutions for your SAP ecosystem",
            icon: "database",
            features: [
              "Data modeling and architecture",
              "ETL processes",
              "Data quality management",
              "Business intelligence integration",
            ],
          },
          {
            id: 5,
            title: "Training & Support",
            description: "Expert training and ongoing support for your SAP UI5 applications",
            icon: "education",
            features: [
              "Developer training programs",
              "End-user training",
              "24/7 application support",
              "Knowledge transfer",
            ],
          },
          {
            id: 6,
            title: "Security Services",
            description: "Protect your SAP applications with our comprehensive security services",
            icon: "shield",
            features: [
              "Security assessment",
              "Authentication & authorization",
              "Data encryption",
              "Security monitoring",
            ],
          },
        ])
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="services-page">
      <div className="services-header">
        <Title level="H1">Our Services</Title>
        <Text className="services-subtitle">
          Comprehensive SAP UI5 and Fiori services to transform your business applications
        </Text>
      </div>

      {isLoading ? (
        <div className="services-loading">
          <Text>Loading our services...</Text>
          <ProgressIndicator value={70} className="loading-progress" />
        </div>
      ) : (
        <div className="services-container">
          <FlexBox
            direction={FlexBoxDirection.Row}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Stretch}
            wrap={FlexBoxWrap.Wrap}
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
                    <ListItemStandard key={index} className="feature-item">
                      {feature}
                    </ListItemStandard>
                  ))}
                </List>

                <Button
                  design="Transparent"
                  icon="arrow-right"
                  className="service-button"
                  onClick={() => navigate("/contact")}
                >
                  Learn More
                </Button>
              </Card>
            ))}
          </FlexBox>
        </div>
      )}

      <div className="services-cta">
        <Card className="cta-card">
          <FlexBox
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Center}
            className="cta-content"
          >
            <Title level="H2">Need a Custom Solution?</Title>
            <Text className="cta-text">
              Contact our team to discuss your specific requirements and how we can help you achieve your business
              goals.
            </Text>
            <Button design="Emphasized" onClick={() => navigate("/contact")} className="cta-button">
              Contact Us
            </Button>
          </FlexBox>
        </Card>
      </div>
    </div>
  )
}

export default Services

