"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Title,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxWrap,
  Card,
  CardHeader,
  Text,
  Button,
  AnalyticalTable,
  IllustratedMessage,
  MessageStrip,
  ProgressIndicator,
  Carousel,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/add.js"
import "@ui5/webcomponents-icons/dist/arrow-right.js"
import "@ui5/webcomponents-icons/dist/customer.js"
import "@ui5/webcomponents-icons/dist/product.js"
import "@ui5/webcomponents-icons/dist/sales-order.js"
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";


import HeroSection from "./HeroSection"
import Features from "./Features"
import "../styles/Home.css"


function Home() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Simulate fetching dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200))

        setDashboardData({
          stats: [
            { id: 1, title: "Active Users", value: 1254, icon: "customer", trend: "up", percentage: 12 },
            { id: 2, title: "Products", value: 87, icon: "product", trend: "up", percentage: 5 },
            { id: 3, title: "Orders", value: 342, icon: "sales-order", trend: "down", percentage: 3 },
          ],
          recentActivity: [
            { id: 1, user: "John Doe", action: "Created a new project", time: "10 minutes ago" },
            { id: 2, user: "Jane Smith", action: "Updated product catalog", time: "1 hour ago" },
            { id: 3, user: "Mike Johnson", action: "Completed order #12345", time: "3 hours ago" },
          ],
        })

        setTestimonials([
          { id: 1, name: "Yusha Ali", company: "TechCorp", quote: "Fantastic service!", image: "https://play-lh.googleusercontent.com/7Ac5TgaL15Ra4bvFVHJKCdJp4qvnL4djZj5bKc6RN-MZjzrvkeHbJytek0NPTSdZcp8" },
          {
            id: 2,
            name: "Hamna Ali",
            company: "BizInc",
            quote: "Really transformed our workflow.",
            image: "https://wallpapers.com/images/hd/anime-hijab-drawing-nvuysmz0txskbxmn.jpg",
          },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Auto-hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleCloseWelcomeMessage = () => {
    setShowWelcomeMessage(false)
  }

  const tableColumns = [
    { Header: "User", accessor: "user" },
    { Header: "Action", accessor: "action" },
    { Header: "Time", accessor: "time" },
  ]

  return (
    <div className="home">
      {/* Welcome Message */}
      {showWelcomeMessage && (
        <MessageStrip onClose={handleCloseWelcomeMessage} className="welcome-message">
          Welcome to our SAP UI5 React application! Explore our features and services.
        </MessageStrip>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Dashboard Section */}
      <section className="dashboard-section">
        <div className="section-container">
          <Title level="H2" className="section-title">
            Dashboard
          </Title>

          {/* Dashboard Tabs */}
          <div className="dashboard-tabs">
            <Button
              design={activeTab === "overview" ? "Emphasized" : "Default"}
              onClick={() => handleTabChange("overview")}
              className="tab-button"
            >
              Overview
            </Button>
            <Button
              design={activeTab === "analytics" ? "Emphasized" : "Default"}
              onClick={() => handleTabChange("analytics")}
              className="tab-button"
            >
              Analytics
            </Button>
            <Button
              design={activeTab === "reports" ? "Emphasized" : "Default"}
              onClick={() => handleTabChange("reports")}
              className="tab-button"
            >
              Reports
            </Button>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <ProgressIndicator value={70} />
              <Text>Loading dashboard data...</Text>
            </div>
          ) : (
            <div className="dashboard-content">
              {activeTab === "overview" && (
                <>
                  {/* Stats Cards */}
                  <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    wrap={FlexBoxWrap.Wrap}
                    className="stats-container"
                  >
                    {dashboardData?.stats.map((stat) => (
                      <Card key={stat.id} className="stat-card">
                        <CardHeader
                          avatar={
                            <div className="stat-icon-container">
                              <i className={`ui5-icon-${stat.icon}`}></i>
                            </div>
                          }
                          titleText={stat.title}
                          subtitleText={`${stat.trend === "up" ? "+" : "-"}${stat.percentage}% from last month`}
                        />
                        <div className="stat-content">
                          <div className="stat-value">{stat.value.toLocaleString()}</div>
                          <div className={`stat-trend ${stat.trend}`}>
                            {stat.trend === "up" ? "↑" : "↓"} {stat.percentage}%
                          </div>
                        </div>
                      </Card>
                    ))}
                  </FlexBox>

                  {/* Recent Activity */}
                  <Card className="activity-card">
                    <CardHeader titleText="Recent Activity" />
                    <div className="activity-content">
                      <AnalyticalTable
                        data={dashboardData?.recentActivity || []}
                        columns={tableColumns}
                        visibleRows={5}
                        minRows={5}
                        scaleWidthMode="Grow"
                        selectionMode="None"
                      />
                    </div>
                  </Card>
                </>
              )}

              {activeTab === "analytics" && (
                <div className="analytics-placeholder">
                  <IllustratedMessage
                    name="NoData"
                    titleText="Analytics Coming Soon"
                    subtitleText="We're working on this feature. Check back later!"
                  />
                </div>
              )}

              {activeTab === "reports" && (
                <div className="reports-placeholder">
                  <IllustratedMessage
                    name="NoData"
                    titleText="Reports Coming Soon"
                    subtitleText="We're working on this feature. Check back later!"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <Title level="H2" className="section-title">
            What Our Clients Say
          </Title>

          <Carousel cyclic onNavigate={function noRefCheck() {}} className="testimonials-carousel">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="carousel-item">
                <div className="testimonial-card">
                  <Text>{testimonial.quote}</Text>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image || "/placeholder.svg?height=60&width=60"}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                    <Text>
                      {testimonial.name}, {testimonial.company}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="section-container">
          <FlexBox
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.Center}
            alignItems={FlexBoxAlignItems.Center}
            className="cta-content"
          >
            <Title level="H2">Ready to Transform Your Business?</Title>
            <Text className="cta-text">
              Get started with our SAP UI5 solutions today and experience the difference.
            </Text>
            <div className="cta-buttons">
              <Button design="Emphasized" onClick={() => navigate("/contact")}>
                Contact Sales
              </Button>
              <Button design="Transparent" onClick={() => navigate("/demo")}>
                Request Demo
              </Button>
            </div>
          </FlexBox>
        </div>
      </section>
    </div>
  )
}

export default Home

