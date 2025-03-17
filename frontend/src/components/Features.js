"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  Text,
  Title,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Icon,
  ProgressIndicator,
  IllustratedMessage,
  Button,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/building.js"
import "@ui5/webcomponents-icons/dist/resize.js"
import "@ui5/webcomponents-icons/dist/accessibility.js"
import "@ui5/webcomponents-icons/dist/connected.js"
import "@ui5/webcomponents-icons/dist/arrow-right.js"
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"

import "../styles/Features.css"
import config from "../config"

function Features() {
  const [features, setFeatures] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const fetchFeatures = async () => {
      setIsLoading(true)

      // Simulate progress loading
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return newProgress
        })
      }, 100)

      try {
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Use actual image paths from config.js
        const featuresWithImages = config.features.map((feature) => ({
          ...feature,
          imageUrl: feature.image,
        }))

        setFeatures(featuresWithImages)
      } catch (error) {
        console.error("Error fetching features:", error)
      } finally {
        clearInterval(interval)
        setLoadingProgress(100)
        setTimeout(() => setIsLoading(false), 200)
      }
    }

    fetchFeatures()
  }, [])

  return (
    <section id="features" className="features-section">
      <div className="features-background"></div>

      <div className="features-content">
        <Title level="H2" className="features-title">
          Our Features
        </Title>
        <Text className="features-subtitle">Discover the powerful capabilities that make our solution stand out</Text>

        {isLoading ? (
          <div className="features-loading">
            <IllustratedMessage
              name="BeforeSearch"
              titleText="Loading Features"
              subtitleText="Please wait while we prepare amazing features for you"
            />
            <ProgressIndicator value={loadingProgress} className="features-progress" />
          </div>
        ) : (
          <FlexBox
            direction={FlexBoxDirection.Row}
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.Wrap}
            className="features-container"
          >
            {features.map((feature, index) => (
              <Card key={feature.id} className={`feature-card feature-card-${index}`}>
                <div className="feature-image-container">
                  <img src={feature.imageUrl} alt={feature.title} className="feature-image" />
                  <div className="feature-icon-overlay">
                    <Icon name={feature.icon} className="feature-icon" />
                  </div>
                </div>
                <CardHeader titleText={feature.title} className="feature-header" />
                <div className="feature-content">
                  <Text className="feature-description">{feature.description}</Text>
                  <Button design="Transparent" icon="arrow-right" className="feature-button">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </FlexBox>
        )}
      </div>
    </section>
  )
}

export default Features
