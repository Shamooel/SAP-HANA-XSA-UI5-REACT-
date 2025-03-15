import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/App.css"

// Import UI5 Web Components
import "@ui5/webcomponents/dist/Assets.js"
import "@ui5/webcomponents-fiori/dist/Assets.js"
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js"

// Set the default theme
setTheme("sap_horizon")

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)