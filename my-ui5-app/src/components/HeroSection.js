"use client";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Button,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Text,
} from "@ui5/webcomponents-react";
import "../styles/HeroSection.css";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";


function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <FlexBox
          direction={FlexBoxDirection.Column}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Center}
          className="hero-flex"
        >
          <Title className="Title">Transform Your Business with SAP UI5  And Empower Innovation. See How. Join The SAP Revolution. See Cutting-edge Solutions To Achieve Operational Excellence. Intelligent enterprise.💫</Title>
          <Text className="hero-subtitle">
            Build enterprise-grade applications with the power of SAP UI5 and the flexibility of React
          </Text>
          <FlexBox className="hero-buttons">
            <Button design="Emphasized" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button design="Transparent" onClick={handleLearnMore}>
              Learn More
            </Button>
          </FlexBox>
        </FlexBox>
      </div>
      <div className="hero-image">
        <img src="https://media.licdn.com/dms/image/v2/D4D12AQFQAk_TDvmOuQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1718371632826?e=2147483647&v=beta&t=WF4MSkoaDUuW9u5EY0Y7I2GL40N4iEXP0etxGfoWcX4" alt="Hero" />
      </div>

    </section>
  );
}

export default HeroSection;
 