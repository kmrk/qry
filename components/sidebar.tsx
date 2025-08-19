"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  ChevronDown, 
  ChevronRight, 
  Database, 
  Grid, 
  Eye, 
  Code, 
  User, 
  Settings,
  Search,
  Folder,
  FolderOpen
} from "lucide-react"

interface DatabaseConnection {
  id: string
  name: string
  type: string
  host?: string
  port?: string
  databases: Database[]
  isExpanded?: boolean
}

interface Database {
  id: string
  name: string
  schemas: Schema[]
  isExpanded?: boolean
}

interface Schema {
  id: string
  name: string
  tables: Table[]
  views: View[]
  functions: Function[]
  isExpanded?: boolean
}

interface Table {
  id: string
  name: string
  isSelected?: boolean
}

interface View {
  id: string
  name: string
}

interface Function {
  id: string
  name: string
}

interface SidebarProps {
  connections: DatabaseConnection[]
  onTableSelect?: (connectionId: string, databaseId: string, schemaId: string, tableId: string) => void
}

export function Sidebar({ connections, onTableSelect }: SidebarProps) {
  const [expandedConnections, setExpandedConnections] = React.useState<Set<string>>(
    new Set(connections.filter(c => c.isExpanded).map(c => c.id))
  )
  const [expandedDatabases, setExpandedDatabases] = React.useState<Set<string>>(new Set())
  const [expandedSchemas, setExpandedSchemas] = React.useState<Set<string>>(new Set())

  const toggleConnection = (connectionId: string) => {
    const newExpanded = new Set(expandedConnections)
    if (newExpanded.has(connectionId)) {
      newExpanded.delete(connectionId)
    } else {
      newExpanded.add(connectionId)
    }
    setExpandedConnections(newExpanded)
  }

  const toggleDatabase = (databaseId: string) => {
    const newExpanded = new Set(expandedDatabases)
    if (newExpanded.has(databaseId)) {
      newExpanded.delete(databaseId)
    } else {
      newExpanded.add(databaseId)
    }
    setExpandedDatabases(newExpanded)
  }

  const toggleSchema = (schemaId: string) => {
    const newExpanded = new Set(expandedSchemas)
    if (newExpanded.has(schemaId)) {
      newExpanded.delete(schemaId)
    } else {
      newExpanded.add(schemaId)
    }
    setExpandedSchemas(newExpanded)
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <h3 className="font-semibold text-sm text-gray-800">My Connections</h3>
      </div>

      {/* Connections List */}
      <div className="flex-1 overflow-y-auto p-2">
        {connections.map((connection) => (
          <div key={connection.id} className="mb-1">
            {/* Connection Header */}
            <div
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                expandedConnections.has(connection.id) && "bg-gray-200"
              )}
              onClick={() => toggleConnection(connection.id)}
            >
              {expandedConnections.has(connection.id) ? (
                <ChevronDown className="h-3 w-3 text-gray-600" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-600" />
              )}
              <Database className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-gray-800 truncate">
                {connection.name}
              </span>
            </div>

            {/* Databases */}
            {expandedConnections.has(connection.id) && (
              <div className="ml-4 mt-1">
                {connection.databases.map((database) => (
                  <div key={database.id} className="mb-1">
                    <div
                      className={cn(
                        "flex items-center space-x-1 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                        expandedDatabases.has(database.id) && "bg-gray-200"
                      )}
                      onClick={() => toggleDatabase(database.id)}
                    >
                      {expandedDatabases.has(database.id) ? (
                        <ChevronDown className="h-3 w-3 text-gray-600" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                      )}
                      <Database className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-gray-800 truncate">
                        {database.name}
                      </span>
                    </div>

                    {/* Schemas */}
                    {expandedDatabases.has(database.id) && (
                      <div className="ml-4 mt-1">
                        {database.schemas.map((schema) => (
                          <div key={schema.id} className="mb-1">
                            <div
                              className={cn(
                                "flex items-center space-x-1 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                                expandedSchemas.has(schema.id) && "bg-gray-200"
                              )}
                              onClick={() => toggleSchema(schema.id)}
                            >
                              {expandedSchemas.has(schema.id) ? (
                                <ChevronDown className="h-3 w-3 text-gray-600" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-gray-600" />
                              )}
                              <FolderOpen className="h-3 w-3 text-orange-600" />
                              <span className="text-xs font-medium text-gray-800 truncate">
                                {schema.name}
                              </span>
                            </div>

                            {/* Tables */}
                            {expandedSchemas.has(schema.id) && (
                              <div className="ml-4 mt-1">
                                <div className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600">
                                  <Grid className="h-3 w-3" />
                                  <span>Tables</span>
                                </div>
                                {schema.tables.map((table) => (
                                  <div
                                    key={table.id}
                                    className={cn(
                                      "flex items-center space-x-1 px-2 py-1 ml-2 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                                      table.isSelected && "bg-blue-100"
                                    )}
                                    onClick={() => onTableSelect?.(connection.id, database.id, schema.id, table.id)}
                                  >
                                    <Grid className="h-3 w-3 text-blue-600" />
                                    <span className="text-xs text-gray-800 truncate">{table.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
