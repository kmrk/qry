"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Edit3, 
  Filter, 
  Columns, 
  Search, 
  Plus, 
  Trash2, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  AlertTriangle
} from "lucide-react"

interface Film {
  film_id: number
  title: string
  description: string
  release_year: string
  language_id: number
}

interface MainContentProps {
  currentTable?: string
}

const columns = [
  { key: "film_id", header: "film_id", type: "int4", icon: "#" },
  { key: "title", header: "title", type: "varchar(255)", icon: "ABC" },
  { key: "description", header: "description", type: "text", icon: "ABC" },
  { key: "release_year", header: "release_year", type: "char(4)", icon: "ABC" },
  { key: "language_id", header: "language_id", type: "int2", icon: "#" },
]

const sampleData: Film[] = [
  {
    film_id: 1,
    title: "ACADEMY DINOSAUR",
    description: "A Epic Tale of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    release_year: "2006 Epic Tale of a Feminist And a Mad Scientist who must Battle a Teacher ",
    language_id: 1,
  },
  {
    film_id: 2,
    title: "ACE GOLDFINGER",
    description: "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
    release_year: "2006",
    language_id: 1,
  },
  {
    film_id: 3,
    title: "ADAPTATION HOLES",
    description: "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
    release_year: "2006",
    language_id: 1,
  },
  {
    film_id: 4,
    title: "AFFAIR PREJUDICE",
    description: "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
    release_year: "2006",
    language_id: 1,
  },
  {
    film_id: 5,
    title: "AFRICAN EGG",
    description: "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
    release_year: "2006",
    language_id: 1,
  },
  {
    film_id: 6,
    title: "AGENT TRUMAN",
    description: "A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China",
    release_year: "2006",
    language_id: 1,
  },
  {
    film_id: 7,
    title: "AIRPLANE SIERRA",
    description: "A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat",
    release_year: "2006",
    language_id: 1,
  },
]

export function MainContent({ currentTable = "film" }: MainContentProps) {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(7)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [editableData, setEditableData] = React.useState<Film[]>(sampleData)
  const [columnWidths, setColumnWidths] = React.useState<{ [key: string]: number }>({
    film_id: 120,
    title: 250,
    description: 500,
    release_year: 120,
    language_id: 120,
  })
  const [isResizing, setIsResizing] = React.useState<{ column: string; startX: number; startWidth: number; currentX: number } | null>(null)
  const [editingCell, setEditingCell] = React.useState<{ rowIndex: number; columnKey: string } | null>(null)
  const [showFullText, setShowFullText] = React.useState<{ rowIndex: number; columnKey: string; columnIndex: number; rect: DOMRect } | null>(null)
  const totalPages = 1
  const totalRecords = 1000

  const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault()
    setIsResizing({
      column: columnKey,
      startX: e.clientX,
      startWidth: columnWidths[columnKey],
      currentX: e.clientX
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    
    const deltaX = e.clientX - isResizing.startX
    const newWidth = Math.max(50, isResizing.startWidth + deltaX)
    
    setColumnWidths(prev => ({
      ...prev,
      [isResizing.column]: newWidth
    }))
    
    setIsResizing(prev => prev ? { ...prev, currentX: e.clientX } : null)
  }

  const handleMouseUp = () => {
    setIsResizing(null)
  }

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing])

  const getTotalWidth = () => {
    return Object.values(columnWidths).reduce((sum, width) => sum + width, 0)
  }

    return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* 拖拽指示器 */}
      {isResizing && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-px h-full bg-blue-500" 
               style={{ left: `${isResizing.currentX}px` }} />
        </div>
      )}
      
             {/* 单元格弹出编辑框 */}
       {showFullText && (() => {
         const row = editableData[showFullText.rowIndex]
         const text = row[showFullText.columnKey as keyof Film]
         const column = columns.find(col => col.key === showFullText.columnKey)
         
         return (
                       <div className="fixed inset-0 z-50" onClick={() => {
              setShowFullText(null)
              setEditingCell(null)
            }}>
                           <div 
                className="absolute bg-white border border-blue-500 rounded shadow-lg z-50"
                style={{
                  left: `${showFullText.rect.left}px`,
                  top: `${showFullText.rect.top}px`,
                  width: `${showFullText.rect.width + 100}px`,
                  height: `${showFullText.rect.height}px`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                               <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    const newData = [...editableData]
                    newData[showFullText.rowIndex] = {
                      ...newData[showFullText.rowIndex],
                      [showFullText.columnKey]: e.target.value
                    }
                    setEditableData(newData)
                  }}
                  className="w-full h-full p-2 border-none outline-none text-sm focus:ring-1 focus:ring-blue-500"
                  placeholder="输入内容..."
                  autoFocus
                />
             </div>
           </div>
         )
       })()}
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-1 px-4">
          <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white border-b-2 border-transparent hover:border-blue-500">
            Table Profile
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white border-b-2 border-transparent hover:border-blue-500">
            Begin Transaction
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
            <Edit3 className="h-3 w-3 mr-1" />
            Cell Editor
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
            <Filter className="h-3 w-3 mr-1" />
            Filter & Sort
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
            <Columns className="h-3 w-3 mr-1" />
            Columns
          </Button>
        </div>
      </div>

                  {/* Data Table */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse" style={{ width: `${getTotalWidth()}px` }}>
          <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="h-10 px-3 text-left align-middle font-medium text-gray-700 text-xs border-r border-gray-200 last:border-r-0 relative"
                  style={{ 
                    width: columnWidths[column.key],
                    minWidth: columnWidths[column.key]
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-xs">{column.icon}</span>
                    <span className="text-gray-500 text-xs">{column.type}</span>
                    <span className="font-semibold">{column.header}</span>
                  </div>
                  <div
                    className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-blue-400 bg-gray-300 opacity-0 hover:opacity-100 transition-opacity"
                    onMouseDown={(e) => handleMouseDown(e, column.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
                      <tbody className="bg-white">
              {editableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-gray-100 hover:bg-blue-50 transition-colors",
                  selectedRow === row.film_id && "bg-blue-100"
                )}
                onClick={() => setSelectedRow(row.film_id)}
              >
                                  {columns.map((column, colIndex) => (
                                         <td
                       key={colIndex}
                                               className={cn(
                          "px-3 py-2 text-sm border-r border-gray-100 last:border-r-0 relative",
                          selectedRow === row.film_id && "bg-blue-200 border-blue-300",
                          editingCell && editingCell.rowIndex === rowIndex && editingCell.columnKey === column.key && "bg-white border border-blue-500 rounded shadow-lg"
                        )}
                       style={{ 
                         width: columnWidths[column.key],
                         minWidth: columnWidths[column.key]
                       }}
                     >
                       <div className="relative">
                         <input
                           type="text"
                           value={row[column.key as keyof Film]}
                           onChange={(e) => {
                             const newData = [...editableData]
                             newData[rowIndex] = {
                               ...newData[rowIndex],
                               [column.key]: e.target.value
                             }
                             setEditableData(newData)
                           }}
                           className="w-full bg-transparent border-none outline-none text-gray-900 resize-none"
                           style={{ 
                             width: '100%',
                             minWidth: '100%'
                           }}
                                                       onClick={(e) => {
                              e.stopPropagation()
                              // 先选中这一行
                              setSelectedRow(row.film_id)
                              // 设置编辑状态
                              setEditingCell({ rowIndex, columnKey: column.key })
                              // 检查文本是否超过列宽
                              const text = row[column.key as keyof Film]
                              const textWidth = e.currentTarget.scrollWidth
                              const containerWidth = e.currentTarget.clientWidth
                              if (textWidth > containerWidth) {
                                const rect = e.currentTarget.getBoundingClientRect()
                                // 获取父级td元素的高度
                                const tdElement = e.currentTarget.closest('td')
                                const tdRect = tdElement?.getBoundingClientRect()
                                setShowFullText({ 
                                  rowIndex, 
                                  columnKey: column.key, 
                                  columnIndex: colIndex, 
                                  rect: tdRect || rect 
                                })
                              }
                            }}
                         />
                         
                       </div>
                     </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 p-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input placeholder="Search..." className="w-48 h-8 text-xs" />
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-600 font-mono">
              SELECT * FROM &quot;public&quot;.&quot;{currentTable}&quot; LIMIT 1000 OFFSET 0
            </div>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-600 px-2">1</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-600">
              Record {selectedRow || 7} of {totalRecords} in page {currentPage}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
