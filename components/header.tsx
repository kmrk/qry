"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  FileText, 
  Grid, 
  Eye, 
  Code, 
  User, 
  Settings,
  Search,
  RotateCcw,
  Save,
  Download,
  Plus,
  Trash2,
  Filter
} from "lucide-react"

export function Header() {
  const menuItems = [
    { label: "File", items: ["New", "Open", "Save", "Export"] },
    { label: "Edit", items: ["Undo", "Redo", "Copy", "Paste"] },
    { label: "View", items: ["Zoom In", "Zoom Out", "Full Screen"] },
    { label: "Table", items: ["New Table", "Design Table", "Data"] },
    { label: "Favorites", items: ["Add to Favorites", "Manage Favorites"] },
    { label: "Tools", items: ["Query Builder", "Data Transfer", "Backup"] },
    { label: "Window", items: ["Cascade", "Tile", "Close All"] },
    { label: "Help", items: ["Documentation", "About"] },
  ]

  const toolbarItems = [
    { icon: Database, label: "Connection", active: false },
    { icon: FileText, label: "New Query", active: false },
    { icon: Grid, label: "Table", active: true },
    { icon: Eye, label: "View", active: false },
    { icon: Grid, label: "Materialized View", active: false },
    { icon: Code, label: "Function", active: false },
    { icon: User, label: "Role", active: false },
    { icon: Settings, label: "Others", active: false },
    { icon: Search, label: "Query", active: false },
    { icon: Download, label: "Backup", active: false },
    { icon: Settings, label: "Automation", active: false },
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Menu Bar */}
      <div className="flex items-center px-4 py-1 border-b border-gray-200 bg-gray-50">
        {menuItems.map((menu) => (
          <div key={menu.label} className="relative group">
            <button className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-white rounded">
              {menu.label}
            </button>
            <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-32">
              {menu.items.map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 space-x-1 bg-white">
        {toolbarItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-8 px-2 text-xs",
              item.active 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-3 w-3 mr-1" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
