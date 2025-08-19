"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { 
  Play, 
  RotateCcw, 
  Undo2, 
  Database, 
  Save,
  RefreshCw,
  X,
  Plus,
  Trash2,
  Filter,
  Download
} from "lucide-react"

interface ToolbarProps {
  currentDatabase?: string
  onDatabaseChange?: (database: string) => void
  onRefresh?: () => void
  onSave?: () => void
  onCancel?: () => void
  onAddRow?: () => void
  onDeleteRow?: () => void
  onExport?: () => void
}

export function Toolbar({
  currentDatabase = "Everything - 副本.db",
  onDatabaseChange,
  onRefresh,
  onSave,
  onCancel,
  onAddRow,
  onDeleteRow,
  onExport
}: ToolbarProps) {
  const databases = [
    "Everything - 副本.db",
    "dev.db",
    "label-studio",
    "postgres@localhost:5432",
    "yxxchpms@192.168.1.100:5432"
  ]

  return (
    <div className="bg-background border-b border-border px-4 py-2 flex items-center justify-between">
      {/* Left side - Database controls */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-1" />
          SQL
        </Button>
        <Button variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" />
          提交
        </Button>
        <Button variant="outline" size="sm">
          <Undo2 className="h-4 w-4 mr-1" />
          回滚
        </Button>
        <Button variant="outline" size="sm">
          <Database className="h-4 w-4 mr-1" />
          Auto
        </Button>
        
        <Select
          value={currentDatabase}
          onValueChange={onDatabaseChange}
          className="w-48"
        >
          {databases.map((db) => (
            <option key={db} value={db}>
              {db}
            </option>
          ))}
        </Select>
      </div>

      {/* Right side - Table controls */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-1" />
          刷新
        </Button>
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-1" />
          保存
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          取消
        </Button>
        <Button variant="outline" size="sm" onClick={onAddRow}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onDeleteRow}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-1" />
          导出数据...
        </Button>
      </div>
    </div>
  )
}
