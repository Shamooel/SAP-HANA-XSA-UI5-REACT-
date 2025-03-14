import { Link } from "react-router-dom"
import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Icon,
  Label
} from "@ui5/webcomponents-react";

import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "../styles/Footer.css";
import config from "../config";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <FlexBox direction={FlexBoxDirection.Column} className="footer-content">
        <FlexBox
          direction={FlexBoxDirection.Row}
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          alignItems={FlexBoxAlignItems.Center}
          className="footer-top"
        >
          {/* Logo & Company Name */}
          <div className="footer-logo">
            <img src="https://www.techcentral.ie/wp-content/uploads/2016/05/SAP_HANA_logo_web.jpg" alt="Company Logo" className="logo" />
            <Label className="company-name">{config.appTitle}</Label>
          </div>

          {/* Navigation Links */}
          <nav className="footer-nav">
            <Link to="/" className="footer-link">
              <Icon name="home" className="footer-icon" /> Home
            </Link>
            <Link to="/about" className="footer-link">
              <Icon name="sys-help" className="footer-icon" /> About
            </Link>
            <Link to="/contact" className="footer-link">
              <Icon name="phone" className="footer-icon" /> Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div className="footer-social">
            {config.socialLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                <Icon name={link.icon} className="social-icon" />
              </a>
            ))}
          </div>
        </FlexBox>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <Label>© {new Date().getFullYear()} {config.appTitle}. All Rights Reserved.</Label>
        </div>
      </FlexBox>
    </footer>
  );
}

export default Footer;