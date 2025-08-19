"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Grid, Share } from "lucide-react"

interface InfoPanelProps {
  tableName?: string
  databasePath?: string
  rowCount?: number
}

export function InfoPanel({ 
  tableName = "film",
  databasePath = "PostgreSQL > dvdrental > public",
  rowCount = 1000
}: InfoPanelProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2 mb-3">
          <Grid className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-800">{tableName}</span>
          <Share className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
        <div className="text-sm text-gray-600">
          {databasePath}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">OID:</span>
            <span className="text-gray-800">16455</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Owner:</span>
            <span className="text-gray-800">postgres</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Rows:</span>
            <span className="text-gray-800">{rowCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Table Type:</span>
            <span className="text-gray-800">Normal</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Partition Of:</span>
            <span className="text-gray-500">--</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tablespace:</span>
            <span className="text-gray-500">--</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Inherits from:</span>
            <span className="text-gray-500">--</span>
          </div>
        </div>
      </div>
    </div>
  )
}
