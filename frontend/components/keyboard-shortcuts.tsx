"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface KeyboardShortcutsProps {
  onClose?: () => void
}

/**
 * KeyboardShortcuts component.
 *
 * Displays a dialog with keyboard shortcuts for the workflow editor.
 * Can be opened with Shift+? keyboard shortcut.
 */
export function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Safe close function that handles optional onClose prop
  const safeClose = useCallback(() => {
    setIsOpen(false)
    if (onClose) onClose()
  }, [onClose])

  // Listen for keyboard shortcut to open dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + ? to open shortcuts dialog
      if (e.shiftKey && e.key === "?") {
        e.preventDefault()
        setIsOpen(true)
      }

      // Escape to close dialog
      if (e.key === "Escape" && isOpen) {
        safeClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, safeClose])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-2">
            {/* Canvas Navigation */}
            <div>
              <h3 className="text-lg font-medium mb-2">Canvas Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                <ShortcutItem keys={["Middle Mouse", "Alt + Drag"]} description="Pan canvas" />
                <ShortcutItem keys={["Ctrl/Cmd + Scroll"]} description="Zoom in/out" />
                <ShortcutItem keys={["Scroll"]} description="Vertical scroll" />
                <ShortcutItem keys={["Shift + Scroll"]} description="Horizontal scroll" />
                <ShortcutItem keys={["Arrow Keys"]} description="Pan canvas" />
                <ShortcutItem keys={["R"]} description="Reset view" />
                <ShortcutItem keys={["G"]} description="Toggle grid" />
              </div>
            </div>

            {/* Node Operations */}
            <div>
              <h3 className="text-lg font-medium mb-2">Node Operations</h3>
              <div className="grid grid-cols-2 gap-2">
                <ShortcutItem keys={["Click"]} description="Select node" />
                <ShortcutItem keys={["Shift + Click"]} description="Multi-select nodes" />
                <ShortcutItem keys={["Drag"]} description="Move node" />
                <ShortcutItem keys={["Double Click"]} description="Edit node" />
                <ShortcutItem keys={["Delete", "Backspace"]} description="Delete selected nodes" />
                <ShortcutItem keys={["Ctrl/Cmd + D"]} description="Duplicate selected nodes" />
                <ShortcutItem keys={["Ctrl/Cmd + A"]} description="Select all nodes" />
                <ShortcutItem keys={["Escape"]} description="Deselect all nodes" />
              </div>
            </div>

            {/* General */}
            <div>
              <h3 className="text-lg font-medium mb-2">General</h3>
              <div className="grid grid-cols-2 gap-2">
                <ShortcutItem keys={["Ctrl/Cmd + K"]} description="Open command palette" />
                <ShortcutItem keys={["Ctrl/Cmd + S"]} description="Save workflow" />
                <ShortcutItem keys={["Ctrl/Cmd + Z"]} description="Undo" />
                <ShortcutItem keys={["Ctrl/Cmd + Y", "Ctrl/Cmd + Shift + Z"]} description="Redo" />
                <ShortcutItem keys={["A"]} description="Add node" />
                <ShortcutItem keys={["Shift + ?"]} description="Show this dialog" />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

interface ShortcutItemProps {
  keys: string[]
  description: string
}

/**
 * ShortcutItem component.
 *
 * Displays a single keyboard shortcut with its description.
 */
function ShortcutItem({ keys, description }: ShortcutItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
      <span className="text-sm">{description}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, index) => (
          <span key={index} className="px-2 py-1 bg-secondary rounded text-xs font-mono">
            {key}
          </span>
        ))}
      </div>
    </div>
  )
}
