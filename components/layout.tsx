"use client"

import * as React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { MainContent } from "./main-content"
import { InfoPanel } from "./info-panel"

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const mockConnections = [
    {
      id: "1",
      name: "PostgreSQL",
      type: "PostgreSQL",
      isExpanded: true,
      databases: [
        {
          id: "db1",
          name: "dvdrental",
          isExpanded: true,
          schemas: [
            {
              id: "schema1",
              name: "public",
              isExpanded: true,
              tables: [
                { id: "table1", name: "film", isSelected: true },
                { id: "table2", name: "actor" },
                { id: "table3", name: "category" },
                { id: "table4", name: "language" },
              ],
              views: [],
              functions: []
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "SQL Server",
      type: "SQL Server",
      isExpanded: false,
      databases: []
    },
    {
      id: "3",
      name: "Test SQL Server Express",
      type: "SQL Server",
      isExpanded: false,
      databases: []
    },
    {
      id: "4",
      name: "Oracle",
      type: "Oracle",
      isExpanded: false,
      databases: []
    },
    {
      id: "5",
      name: "Chinook",
      type: "SQLite",
      isExpanded: false,
      databases: []
    },
    {
      id: "6",
      name: "SQLite (old)",
      type: "SQLite",
      isExpanded: false,
      databases: []
    },
    {
      id: "7",
      name: "local",
      type: "MongoDB",
      isExpanded: false,
      databases: []
    },
    {
      id: "8",
      name: "MongoDB",
      type: "MongoDB",
      isExpanded: false,
      databases: []
    },
    {
      id: "9",
      name: "Redis",
      type: "Redis",
      isExpanded: false,
      databases: []
    }
  ]

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar connections={mockConnections} />
        
        {/* Center Content */}
        <div className="flex-1 flex flex-col">
          <MainContent />
        </div>
        
        {/* Right Info Panel */}
        <InfoPanel />
      </div>
    </div>
  )
}
