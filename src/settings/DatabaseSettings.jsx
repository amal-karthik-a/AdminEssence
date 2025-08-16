"use client"

import { useState } from "react"
import { Database, Download, Upload, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const DatabaseSettings = () => {
  const [backupProgress, setBackupProgress] = useState(0)
  const [isBackingUp, setIsBackingUp] = useState(false)

  const handleBackup = () => {
    setIsBackingUp(true)
    setBackupProgress(0)

    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackingUp(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Database Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage database connections, backups, and data operations
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database size={20} />
            <span>Database Connection</span>
            <Badge variant="default" className="bg-green-500">
              Connected
            </Badge>
          </CardTitle>
          <CardDescription>Current database connection status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500">Database Type</p>
              <p className="font-semibold">PostgreSQL</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500">Connection Pool</p>
              <p className="font-semibold">8/10 Active</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500">Last Backup</p>
              <p className="font-semibold">Today, 3:00 AM</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500">Database Size</p>
              <p className="font-semibold">2.4 GB</p>
            </div>
          </div>

          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <RefreshCw size={16} />
            <span>Test Connection</span>
          </Button>
        </CardContent>
      </Card>

      {/* Backup & Restore */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download size={20} />
            <span>Backup & Restore</span>
          </CardTitle>
          <CardDescription>Create and manage database backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isBackingUp && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Creating backup...</span>
                <span className="text-sm">{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="w-full" />
            </div>
          )}

          <div className="flex space-x-3">
            <Button onClick={handleBackup} disabled={isBackingUp} className="flex items-center space-x-2">
              <Download size={16} />
              <span>{isBackingUp ? "Creating Backup..." : "Create Backup"}</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Upload size={16} />
              <span>Restore Backup</span>
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recent Backups</h4>
            <div className="space-y-2">
              {[
                { name: "backup_2024_01_15_03_00.sql", size: "2.4 GB", date: "Today, 3:00 AM", status: "success" },
                { name: "backup_2024_01_14_03_00.sql", size: "2.3 GB", date: "Yesterday, 3:00 AM", status: "success" },
                { name: "backup_2024_01_13_03_00.sql", size: "2.3 GB", date: "2 days ago, 3:00 AM", status: "success" },
              ].map((backup, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-green-500" />
                    <div>
                      <p className="font-medium">{backup.name}</p>
                      <p className="text-sm text-gray-500">
                        {backup.size} • {backup.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your data and storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">1,247</p>
              <p className="text-sm text-blue-600">Total Products</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600">3,891</p>
              <p className="text-sm text-green-600">Total Orders</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">567</p>
              <p className="text-sm text-purple-600">Total Customers</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">Import Data</Button>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card className="border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
            <AlertCircle size={20} />
            <span>Maintenance</span>
          </CardTitle>
          <CardDescription>Database maintenance and optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Regular maintenance helps keep your database running smoothly. Consider running optimization during
              low-traffic hours.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline">Optimize Tables</Button>
            <Button variant="outline">Analyze Performance</Button>
            <Button variant="outline">Vacuum Database</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DatabaseSettings
