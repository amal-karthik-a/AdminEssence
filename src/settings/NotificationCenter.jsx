"use client"

import { useState } from "react"
import { Bell, X, Check, CheckCheck, Trash2, AlertCircle, CheckCircle, Info, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  title: string
  message: string
  type: "success" | "warning" | "info" | "error"
  timestamp: Date
  read: boolean
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
  onMarkAllAsRead: () => void
  onDelete: (id: number) => void
  onClose: () => void
}

const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClose,
}: NotificationCenterProps) => {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-green-500" />
      case "warning":
        return <AlertCircle size={16} className="text-yellow-500" />
      case "error":
        return <AlertCircle size={16} className="text-red-500" />
      default:
        return <Info size={16} className="text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "error":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
      default:
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`
    return `${Math.floor(minutes / 1440)}d ago`
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mt-3 bg-gray-100 dark:bg-gray-800 p-1 rounded">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 px-3 py-1 text-sm rounded transition-colors ${
              filter === "all" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 px-3 py-1 text-sm rounded transition-colors ${
              filter === "unread" ? "bg-white dark:bg-gray-700 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Actions */}
      {unreadCount > 0 && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="w-full flex items-center space-x-2 bg-transparent"
          >
            <CheckCheck size={14} />
            <span>Mark all as read</span>
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 ${getTypeColor(notification.type)} ${
                  !notification.read ? "ring-2 ring-blue-100 dark:ring-blue-900" : ""
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          title="Mark as read"
                        >
                          <Check size={12} />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(notification.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 rounded"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <Button variant="ghost" size="sm" className="text-xs">
          View all notifications
        </Button>
      </div>
    </div>
  )
}

export default NotificationCenter
