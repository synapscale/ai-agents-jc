"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BaseComponentProps } from "@/types/component-interfaces"

interface SearchBarProps extends BaseComponentProps {
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  placeholder?: string
  debounceMs?: number
  showClearButton?: boolean
  autoFocus?: boolean
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
  debounceMs,
  showClearButton = true,
  autoFocus = false,
  className,
  testId,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Handle input change with optional debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)

    if (debounceMs) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        onChange(newValue)
      }, debounceMs)
    } else {
      onChange(newValue)
    }
  }

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      e.preventDefault()
      onSearch()
    }
  }

  // Handle clear button click
  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  return (
    <div className={cn("relative flex-1", className)} data-testid={testId}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-8"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
      />
      {showClearButton && localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
