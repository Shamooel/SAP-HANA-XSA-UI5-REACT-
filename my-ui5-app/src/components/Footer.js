import { Link } from "react-router-dom"
import {
  Bar,
  Label,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/home.js"
import "@ui5/webcomponents-icons/dist/information.js"
import "@ui5/webcomponents-icons/dist/email.js"
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";


import config from "../config"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <Bar className="footer-bar">
        <FlexBox direction={FlexBoxDirection.Column} className="footer-content">
          <FlexBox
            direction={FlexBoxDirection.Row}
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            alignItems={FlexBoxAlignItems.Center}
            className="footer-main"
          >
            <div className="footer-logo">
              <img src="/placeholder.svg?height=40&width=120" alt="Company Logo" />
              <Label>{config.appTitle}</Label>
            </div>

            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>

            <div className="footer-social">
              {config.socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                  {link.name}
                </a>
              ))}
            </div>
          </FlexBox>

          <div className="footer-bottom">
            <p>
              © {currentYear} {config.appTitle}. All rights reserved.
            </p>
          </div>
        </FlexBox>
      </Bar>
    </footer>
  )
}

export default Footer;