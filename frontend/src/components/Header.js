"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  ShellBar,
  ShellBarItem,
  Avatar,
  ListItemStandard,
  Popover,
  List,
  Title,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
} from "@ui5/webcomponents-react"
import { useMediaQuery } from "react-responsive"

// Import icons
import "@ui5/webcomponents-icons/dist/home.js"
import "@ui5/webcomponents-icons/dist/menu.js"
import "@ui5/webcomponents-icons/dist/settings.js"
import "@ui5/webcomponents-icons/dist/user-settings.js"
import "@ui5/webcomponents-icons/dist/log.js"
import "@ui5/webcomponents-icons/dist/search.js"
import "@ui5/webcomponents-icons/dist/bell.js"
import "@ui5/webcomponents-icons/dist/employee.js" 

import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"

import "../styles/Header.css";
import config from "../config"

function Header({ onLoginClick, isLoggedIn, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handleLogoClick = () => navigate("/")

  const handleMenuClick = (event) => {
    setMenuAnchor(event.target)
    setMenuOpen(true)
  }

  const handleMenuClose = () => setMenuOpen(false)

  const handleMenuItemClick = (path) => {
    navigate(path)
    handleMenuClose()
  }

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.target)
    setUserMenuOpen(true)
  }

  const handleUserMenuClose = () => setUserMenuOpen(false)

  const handleLogout = () => {
    onLogout()
    handleUserMenuClose()
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <ShellBar
        logo={
          <img
            src="https://www.techcentral.ie/wp-content/uploads/2016/05/SAP_HANA_logo_web.jpg"
            alt="Company Logo"
            className="header-logo"
            onClick={handleLogoClick}
          />
        }
        primaryTitle={config.appTitle}
        profile={
          isLoggedIn ? (
            <Avatar 
              image="https://i.pinimg.com/736x/50/f4/fb/50f4fb7f863bfcfa8afcf424882d216c.jpg"
              onClick={handleUserMenuClick}
            />
          ) : (
            <ShellBarItem icon="log" text="Login" onClick={onLoginClick} />
          )
        }
        showNotifications
      >
        {!isMobile && (
          <>
            <ShellBarItem
              icon="home"
              text="Home"
              className={isActive("/") ? "active-nav-item" : ""}
              onClick={() => navigate("/")}
            />
            <ShellBarItem
              icon="information"
              text="About"
              className={isActive("/about") ? "active-nav-item" : ""}
              onClick={() => navigate("/about")}
            />
            <ShellBarItem
              icon="wrench"
              text="Services"
              className={isActive("/services") ? "active-nav-item" : ""}
              onClick={() => navigate("/services")}
            />
            <ShellBarItem
              icon="phone"
              text="Contact"
              className={isActive("/contact") ? "active-nav-item" : ""}
              onClick={() => navigate("/contact")}
            />
            <ShellBarItem icon="search" text="Search" onClick={() => setShowSearch(!showSearch)} />
            {isLoggedIn && (
              <ShellBarItem
                icon="desktop-mobile"
                text="Dashboard"
                className={isActive("/dashboard") ? "active-nav-item" : ""}
                onClick={() => navigate("/dashboard")}
              />
            )}
          </>
        )}
        {isMobile && <ShellBarItem icon="menu" onClick={handleMenuClick} />}
      </ShellBar>

      {menuOpen && (
        <Popover open={menuOpen} opener={menuAnchor} onAfterClose={handleMenuClose} className="mobile-menu">
          <List>
            <ListItemStandard className={isActive("/") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/")}>
              Home
            </ListItemStandard>
            <ListItemStandard className={isActive("/about") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/about")}>
              About Us
            </ListItemStandard>
            <ListItemStandard className={isActive("/services") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/services")}>
              Services
            </ListItemStandard>
            <ListItemStandard className={isActive("/contact") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/contact")}>
              Contact
            </ListItemStandard>
            <ListItemStandard className={isActive("/demo") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/demo")}>
              Request Demo
            </ListItemStandard>
            {isLoggedIn && (
              <ListItemStandard className={isActive("/dashboard") ? "active-list-item" : ""} onClick={() => handleMenuItemClick("/dashboard")}>
                Dashboard
              </ListItemStandard>
            )}
            {isLoggedIn ? (
              <ListItemStandard icon="log" onClick={handleLogout}> Logout </ListItemStandard>
            ) : (
              <ListItemStandard icon="log" onClick={onLoginClick}> Login </ListItemStandard>
            )}
          </List>
        </Popover>
      )}

      {userMenuOpen && (
        <Popover open={userMenuOpen} opener={userMenuAnchor} onAfterClose={handleUserMenuClose} className="user-menu">
          <div className="user-menu-header">
            <Avatar className="user-menu-avatar" image="https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg" />
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Center} alignItems={FlexBoxAlignItems.Start}>
              <Title>John Doe</Title>
              <span className="user-email">john.doe@example.com</span>
            </FlexBox>
          </div>
          <List>
            <ListItemStandard icon="user-settings">Profile Settings</ListItemStandard>
            <ListItemStandard icon="settings">Preferences</ListItemStandard>
            <ListItemStandard icon="desktop-mobile" onClick={() => { navigate("/dashboard"); handleUserMenuClose(); }}>
              Dashboard
            </ListItemStandard>
            <ListItemStandard icon="log" onClick={handleLogout}> Logout </ListItemStandard>
          </List>
        </Popover>
      )}
    </header>
  )
}

export default Header
