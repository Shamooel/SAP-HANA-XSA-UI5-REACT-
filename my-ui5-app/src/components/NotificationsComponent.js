"use client"

import { useState, useEffect } from "react"
import {
  List,
  ListItemStandard,
  Card,
  Icon,
  Title,
  Text,
  Button,
  Badge,
  FlexBox,
  FlexBoxDirection,
} from "@ui5/webcomponents-react"
import "@ui5/webcomponents-icons/dist/bell.js"
import "@ui5/webcomponents-icons/dist/bell-filled.js"
import "./NotificationsComponent.css"

const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = async () => {
      const mockNotifications = [
        {
          id: 1,
          title: "New Feature Available",
          message: "Check out our latest UI components",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          read: false,
          type: "feature",
        },
        {
          id: 2,
          title: "System Update",
          message: "System maintenance scheduled for tomorrow",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
          type: "system",
        },
        {
          id: 3,
          title: "Welcome!",
          message: "Welcome to our platform",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true,
          type: "info",
        },
      ]

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.read).length)
    }

    fetchNotifications()
  }, [])

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const formatTimestamp = (date) => {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)

    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return `${Math.floor(minutes / 1440)}d ago`
  }

  return (
    <div className="notifications-container">
      <div className="notifications-trigger" onClick={() => setShowNotifications(!showNotifications)}>
        <Icon name={unreadCount > 0 ? "bell-filled" : "bell"} className="notifications-icon" />
        {unreadCount > 0 && <Badge className="notifications-badge">{unreadCount}</Badge>}
      </div>

      {showNotifications && (
        <Card className="notifications-panel">
          <div className="notifications-header">
            <Title level="H2">Notifications</Title>
            {unreadCount > 0 && (
              <Button design="Transparent" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>

          {notifications.length > 0 ? (
            <List className="notifications-list">
              {notifications.map((notification) => (
                <ListItemStandard
                  key={notification.id}
                  className={`notification-item ${notification.read ? "read" : "unread"}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <FlexBox direction={FlexBoxDirection.Column} className="notification-content">
                    <div className="notification-header">
                      <Title level="H3">{notification.title}</Title>
                      <Text className="notification-time">{formatTimestamp(notification.timestamp)}</Text>
                    </div>
                    <Text className="notification-message">{notification.message}</Text>
                  </FlexBox>
                </ListItemStandard>
              ))}
            </List>
          ) : (
            <div className="no-notifications">
              <Text>No notifications</Text>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

export default NotificationsComponent

