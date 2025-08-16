"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone, Volume2, VolumeX, Clock, Users, Package, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerInquiries: true,
    systemUpdates: false,
    marketingEmails: false,
    weeklyReports: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerInquiries: true,
    systemAlerts: true,
    reminders: false,
  })

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [frequency, setFrequency] = useState("immediate")

  const notificationCategories = [
    {
      id: "orders",
      title: "Orders & Sales",
      description: "New orders, payment confirmations, and sales updates",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      id: "inventory",
      title: "Inventory Management",
      description: "Low stock alerts, reorder notifications, and inventory updates",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: "customers",
      title: "Customer Communications",
      description: "Customer inquiries, reviews, and support requests",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: "security",
      title: "Security & System",
      description: "Login alerts, system updates, and security notifications",
      icon: Shield,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Customize how and when you receive notifications</p>
      </div>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell size={20} />
            <span>Quick Settings</span>
          </CardTitle>
          <CardDescription>Global notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <div>
                <p className="font-medium">Sound Notifications</p>
                <p className="text-sm text-gray-500">Play sound for new notifications</p>
              </div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock size={20} />
              <div>
                <p className="font-medium">Notification Frequency</p>
                <p className="text-sm text-gray-500">How often to receive notifications</p>
              </div>
            </div>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly digest</SelectItem>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail size={20} />
            <span>Email Notifications</span>
            <Badge variant="secondary">admin@cocovirginoil.com</Badge>
          </CardTitle>
          <CardDescription>Choose which email notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="text-sm text-gray-500">{getNotificationDescription(key)}</p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => setEmailNotifications((prev) => ({ ...prev, [key]: checked }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone size={20} />
            <span>Push Notifications</span>
            <Badge variant="outline">Browser</Badge>
          </CardTitle>
          <CardDescription>Real-time notifications in your browser</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="text-sm text-gray-500">{getNotificationDescription(key)}</p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => setPushNotifications((prev) => ({ ...prev, [key]: checked }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>Manage notifications by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {notificationCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{category.title}</h4>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Active</Badge>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

const getNotificationDescription = (key) => {
  const descriptions = {
    newOrders: "Get notified when new orders are placed",
    lowStock: "Alert when inventory levels are low",
    customerInquiries: "New customer messages and inquiries",
    systemUpdates: "System maintenance and updates",
    marketingEmails: "Promotional content and marketing updates",
    weeklyReports: "Weekly business performance reports",
    systemAlerts: "Critical system alerts and errors",
    reminders: "Task reminders and follow-ups",
  }
  return descriptions[key] || "Notification setting"
}

export default NotificationSettings
