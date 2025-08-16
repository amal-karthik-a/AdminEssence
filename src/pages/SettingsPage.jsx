import { useState } from "react"
import {
  User,
  Shield,
  Bell,
  Database,
  SettingsIcon,
  ChevronRight,
  Palette,
  Lock,
  Mail,
  HardDrive,
  UserCheck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./../components/ui/card"
import { Button } from "./../components/ui/button"
import { Badge } from "./../components/ui/badge"
import ProfileSettings from "./../settings/ProfileSettings"
import SecuritySettings from "./../settings/SecuritySettings"
import NotificationSettings from "./../settings/NotificationSettings"
import DatabaseSettings from "./../settings/DatabaseSettings"
import GeneralSettings from "./../settings/GeneralSettings"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [darkMode, setDarkMode] = useState(false)

  const settingsCategories = [
    {
      id: "profile",
      title: "Profile Settings",
      description: "Manage your personal information and account details",
      icon: User,
      color: "bg-blue-500",
      badge: null,
      stats: "Last updated 2 days ago",
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Password, 2FA, login devices, and privacy controls",
      icon: Shield,
      color: "bg-red-500",
      badge: "Important",
      stats: "2FA enabled",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Email, push notifications, and alert preferences",
      icon: Bell,
      color: "bg-yellow-500",
      badge: "3 Active",
      stats: "Email & Push enabled",
    },
    {
      id: "database",
      title: "Database Management",
      description: "Database connections, backups, and data management",
      icon: Database,
      color: "bg-green-500",
      badge: "Connected",
      stats: "Last backup: Today",
    },
    {
      id: "general",
      title: "General Preferences",
      description: "Theme, language, timezone, and default settings",
      icon: SettingsIcon,
      color: "bg-purple-500",
      badge: null,
      stats: "Auto-save enabled",
    },
  ]

  const quickActions = [
    { icon: Palette, label: "Change Theme", action: () => setDarkMode(!darkMode) },
    { icon: Lock, label: "Change Password", action: () => setActiveTab("security") },
    { icon: Mail, label: "Email Settings", action: () => setActiveTab("notifications") },
    { icon: HardDrive, label: "Backup Data", action: () => setActiveTab("database") },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <SecuritySettings />
      case "notifications":
        return <NotificationSettings />
      case "database":
        return <DatabaseSettings />
      case "general":
        return <GeneralSettings />
      default:
        return renderOverview()
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon size={20} />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Frequently used settings and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                onClick={action.action}
              >
                <action.icon size={20} />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="grid gap-4">
        {settingsCategories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => setActiveTab(category.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                      {category.badge && (
                        <Badge variant={category.badge === "Important" ? "destructive" : "secondary"}>
                          {category.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{category.stats}</p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <UserCheck size={16} className="text-white" />
              </div>
              <p className="font-semibold text-green-700 dark:text-green-400">Active</p>
              <p className="text-sm text-green-600 dark:text-green-500">All systems operational</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Database size={16} className="text-white" />
              </div>
              <p className="font-semibold text-blue-700 dark:text-blue-400">Connected</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Database online</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <p className="font-semibold text-purple-700 dark:text-purple-400">Secure</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">2FA enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
        {activeTab !== "overview" && (
          <Button variant="outline" onClick={() => setActiveTab("overview")} className="flex items-center space-x-2">
            <SettingsIcon size={16} />
            <span>Back to Overview</span>
          </Button>
        )}
      </div>

      {/* Navigation Tabs */}
      {activeTab !== "overview" && (
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === category.id
                  ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <category.icon size={16} />
              <span className="hidden md:inline">{category.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {renderTabContent()}
    </div>
  )
}

export default SettingsPage
