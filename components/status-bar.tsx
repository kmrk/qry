"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBarProps {
  currentDatabase?: string
  currentTable?: string
  itemCount?: number
  timezone?: string
  language?: string
}

export function StatusBar({
  currentDatabase = "Everything - 副本.db",
  currentTable = "devices",
  itemCount = 1,
  timezone = "CST",
  language = "zh"
}: StatusBarProps) {
  return (
    <div className="bg-background border-t border-border px-4 py-1 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center space-x-4">
        <span>{currentDatabase}</span>
        <span>{currentTable}</span>
        <span>中{itemCount}个项目 448 MB</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>{timezone}</span>
        <span>{language}</span>
      </div>
    </div>
  )
}
