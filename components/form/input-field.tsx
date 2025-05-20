"use client"

import { forwardRef, useState } from "react"
import { FormField } from "./form-field"
import { Input } from "@/components/ui/input"

export const InputField = forwardRef(function InputField(
  {
    id,
    name,
    label,
    value = "",
    onChange,
    placeholder,
    type = "text",
    required = false,
    error,
    helperText,
    className = "",
    disabled = false,
    maxLength,
    autoComplete,
    autoFocus = false,
    ...props
  },
  ref,
) {
  const inputId = id || name
  const [isFocused, setIsFocused] = useState(false)
  const showCharCount = maxLength && type === "text"

  function handleChange(e) {
    if (onChange) onChange(e.target.value)
  }

  // Build className string
  let inputClassName = ""
  if (isFocused) inputClassName += "border-purple-500 ring-1 ring-purple-500 "
  if (error) inputClassName += "border-red-300 focus-visible:ring-red-500 "
  if (showCharCount) inputClassName += "pr-16 "
  inputClassName += className

  return (
    <FormField label={label} name={name} error={error} required={required} helperText={helperText} id={inputId}>
      <div className="relative">
        <Input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          required={required}
          {...props}
        />
        {showCharCount && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </FormField>
  )
})
