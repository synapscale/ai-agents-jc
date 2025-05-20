"use client"

import { forwardRef, useState } from "react"
import { FormField } from "@/components/form/form-field"
import { ChevronDown } from "lucide-react"

export const SelectField = forwardRef(function SelectField(
  {
    id,
    name,
    label,
    value,
    onChange,
    options,
    placeholder = "Selecione uma opção",
    required = false,
    error,
    helperText,
    className = "",
    disabled = false,
    ...props
  },
  ref,
) {
  const selectId = id || name
  const [isFocused, setIsFocused] = useState(false)

  function handleChange(e) {
    if (onChange) onChange(e.target.value)
  }

  // Build className string
  let selectClassName =
    "flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 "
  if (isFocused) selectClassName += "border-purple-500 ring-1 ring-purple-500 "
  if (error) selectClassName += "border-red-300 focus-visible:ring-red-500 "
  selectClassName += className

  return (
    <FormField label={label} name={name} error={error} required={required} helperText={helperText} id={selectId}>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={selectClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </FormField>
  )
})
