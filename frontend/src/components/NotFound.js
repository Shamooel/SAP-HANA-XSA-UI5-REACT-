import { Link } from "react-router-dom"
import {
  IllustratedMessage,
  Button,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-fiori/dist/illustrations/PageNotFound.js"

import "../styles/NotFound.css"

function NotFound() {
  return (
    <div className="not-found-page">
      <FlexBox
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
        className="not-found-content"
      >
        <IllustratedMessage
          name="PageNotFound"
          titleText="Page Not Found"
          subtitleText="We couldn't find the page you're looking for."
        />
        <div className="not-found-actions">
          <Link to="/">
            <Button design="Emphasized">Go to Home Page</Button>
          </Link>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </FlexBox>
    </div>
  )
}

export default NotFound

