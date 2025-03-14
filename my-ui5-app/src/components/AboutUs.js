import { useState, useEffect } from "react";
import {
  Title,
  Text,
  Panel,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  ProgressIndicator,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";

import "../styles/AboutUs.css";
import config from "../config";

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const fetchAboutData = async () => {
      setIsLoading(true);

      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + 20;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 300);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setAboutData(config.aboutUs);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
        clearInterval(interval);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="about-us">
      <div className="about-header">
        <Title level="H1">About Us</Title>
      </div>

      {isLoading ? (
        <div className="about-loading">
          <Text>Loading company information...</Text>
          <ProgressIndicator value={loadingProgress} />
        </div>
      ) : (
        <FlexBox
          direction={FlexBoxDirection.Column}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Center}
          className="about-content"
        >
          <div className="about-image">
            <img src="/placeholder.svg?height=300&width=500" alt="Company" />
          </div>

          <Panel headerText={aboutData?.title || "About Our Company"} className="about-panel">
            <Text className="about-description">{aboutData?.description}</Text>
          </Panel>

          <div className="about-mission-vision">
            <Panel headerText="Our Mission" className="mission-panel">
              <Text>{aboutData?.mission}</Text>
            </Panel>

            <Panel headerText="Our Vision" className="vision-panel">
              <Text>{aboutData?.vision}</Text>
            </Panel>
          </div>
        </FlexBox>
      )}
    </div>
  );
}

export default AboutUs;
