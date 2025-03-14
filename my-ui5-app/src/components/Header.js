import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShellBar, 
  ShellBarItem,
  Avatar,
  ListItemStandard,
  Popover,
  List,
  Button,
  Bar,
  Title,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems
} from '@ui5/webcomponents-react';
import { useMediaQuery } from "react-responsive"; // Corrected media query handling

import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/menu.js';
import '@ui5/webcomponents-icons/dist/settings.js';
import '@ui5/webcomponents-icons/dist/user-settings.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/search.js';
import '@ui5/webcomponents-icons/dist/log.js';
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";

import '../styles/Header.css';
import config from '../config';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Handle screen size responsiveness
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchNotifications = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications([
        { id: 1, title: 'New feature available', read: false },
        { id: 2, title: 'System update scheduled', read: false },
        { id: 3, title: 'Your report is ready', read: true }
      ]);
    };

    fetchNotifications();
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.target);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.target);
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.target);
    setUserMenuOpen(true);
  };

  const handleUserMenuClose = () => {
    setUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <ShellBar 
        logo={<img src="https://www.techcentral.ie/wp-content/uploads/2016/05/SAP_HANA_logo_web.jpg" alt="Company Logo" className="header-logo" />}
        primaryTitle={config.appTitle}
        onLogoClick={handleLogoClick}
        profile={
          <Avatar onClick={handleUserMenuClick}>
            <img src="https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg" alt="User" />
          </Avatar>
        }
        showNotifications
        showProductSwitch
        notificationsCount={notifications.filter(n => !n.read).length}
        onNotificationsClick={handleNotificationsClick}
      >
        {!isMobile && (
          <>
            <ShellBarItem 
              icon="home" 
              text="Home"
              className={isActive('/') ? 'active-nav-item' : ''}
              onClick={() => navigate('/')} 
            />
            <ShellBarItem 
              icon="information" 
              text="About"
              className={isActive('/about') ? 'active-nav-item' : ''}
              onClick={() => navigate('/about')} 
            />
            <ShellBarItem icon="search" text="Search" />
          </>
        )}
        {isMobile && <ShellBarItem icon="menu" onClick={handleMenuClick} />}
      </ShellBar>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <Popover open={menuOpen} opener={menuAnchor} onAfterClose={handleMenuClose} placementType="Bottom">
          <List>
            <ListItemStandard className={isActive('/') ? 'active-list-item' : ''} onClick={() => handleMenuItemClick('/')}>
              Home
            </ListItemStandard>
            <ListItemStandard className={isActive('/about') ? 'active-list-item' : ''} onClick={() => handleMenuItemClick('/about')}>
              About Us
            </ListItemStandard>
            <ListItemStandard className={isActive('/services') ? 'active-list-item' : ''} onClick={() => handleMenuItemClick('/services')}>
              Services
            </ListItemStandard>
            <ListItemStandard className={isActive('/contact') ? 'active-list-item' : ''} onClick={() => handleMenuItemClick('/contact')}>
              Contact
            </ListItemStandard>
          </List>
        </Popover>
      )}

      {/* Notifications Popover */}
      {notificationsOpen && (
        <Popover open={notificationsOpen} opener={notificationsAnchor} onAfterClose={handleNotificationsClose} placementType="Bottom">
          <List>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <ListItemStandard key={notification.id} className={notification.read ? 'notification-read' : 'notification-unread'}>
                  {notification.title}
                </ListItemStandard>
              ))
            ) : (
              <ListItemStandard>No notifications</ListItemStandard>
            )}
          </List>
          <Bar design="Footer">
            <Button design="Transparent">Mark all as read</Button>
          </Bar>
        </Popover>
      )}

      {/* User Menu Popover */}
      {userMenuOpen && (
        <Popover open={userMenuOpen} opener={userMenuAnchor} onAfterClose={handleUserMenuClose} placementType="Bottom">
          <div className="user-menu-header">
            <Avatar className="user-menu-avatar">
              <img src="/placeholder.svg?height=48&width=48" alt="User" />
            </Avatar>
            <FlexBox direction={FlexBoxDirection.Column} justifyContent={FlexBoxJustifyContent.Center} alignItems={FlexBoxAlignItems.Start}>
              <Title>John Doe</Title>
              <span className="user-email">john.doe@example.com</span>
            </FlexBox>
          </div>
          <List>
            <ListItemStandard icon="user-settings">Profile Settings</ListItemStandard>
            <ListItemStandard icon="settings">Preferences</ListItemStandard>
            <ListItemStandard icon="log">Logout</ListItemStandard>
          </List>
        </Popover>
      )}
    </header>
  );
}

export default Header;
