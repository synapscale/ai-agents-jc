/**
 * @file Comprehensive parameter definitions for components
 *
 * This file contains detailed type definitions for component parameters,
 * including documentation, validation rules, and contextual information.
 */

import type React from "react"
import type { Agent, BadgeItem } from "./agent-types"

/**
 * Base properties that all components should support
 * @property className - CSS class to apply to the component
 * @property id - Unique identifier for the component (for accessibility and testing)
 * @property testId - Data attribute for testing purposes
 * @property ariaLabel - Accessible label for the component
 * @property ariaDescribedBy - ID of element that describes this component
 */
export interface BaseComponentProps {
  /**
   * CSS class to apply to the component.
   * Use this to override default styling or apply custom styles.
   * @example "mt-4 text-center"
   */
  className?: string

  /**
   * Unique identifier for the component.
   * Used for accessibility, form associations, and testing.
   * @example "user-profile-form"
   */
  id?: string

  /**
   * Data attribute for testing purposes.
   * Used by testing frameworks to locate components.
   * @example "user-profile-submit-button"
   */
  testId?: string

  /**
   * Accessible label for the component.
   * Used by screen readers when no visible label is present.
   * @example "Submit form"
   */
  ariaLabel?: string

  /**
   * ID of element that describes this component.
   * Creates an association with descriptive text for accessibility.
   * @example "profile-form-description"
   */
  ariaDescribedBy?: string
}

/**
 * Properties for interactive components
 * @property disabled - Whether the component is disabled
 * @property loading - Whether the component is in a loading state
 * @property onClick - Function to call when the component is clicked
 * @property onFocus - Function to call when the component receives focus
 * @property onBlur - Function to call when the component loses focus
 * @property tabIndex - Tab order of the component
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  /**
   * Whether the component is disabled.
   * When true, the component cannot be interacted with and appears visually disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the component is in a loading state.
   * When true, the component displays a loading indicator and may be disabled.
   * @default false
   */
  loading?: boolean

  /**
   * Function to call when the component is clicked.
   * @param event - The click event
   */
  onClick?: (event: React.MouseEvent) => void

  /**
   * Function to call when the component receives focus.
   * @param event - The focus event
   */
  onFocus?: (event: React.FocusEvent) => void

  /**
   * Function to call when the component loses focus.
   * @param event - The blur event
   */
  onBlur?: (event: React.FocusEvent) => void

  /**
   * Tab order of the component.
   * Controls the order in which elements receive focus when tabbing.
   * @example 0
   */
  tabIndex?: number
}

/**
 * Properties for form field components
 * @property label - Label text for the field
 * @property name - Name attribute for the field
 * @property error - Error message to display
 * @property required - Whether the field is required
 * @property helperText - Additional text to help the user
 * @property labelClassName - CSS class for the label element
 * @property errorClassName - CSS class for the error message
 * @property helperTextClassName - CSS class for the helper text
 * @property hideLabel - Whether to visually hide the label (still accessible to screen readers)
 * @property headerRight - Content to display on the right side of the header
 */
export interface FormFieldProps extends BaseComponentProps {
  /**
   * Label text for the field.
   * Displayed above the field and used for accessibility.
   * @example "Email Address"
   */
  label?: string

  /**
   * Name attribute for the field.
   * Used for form submission and accessibility.
   * @example "email"
   */
  name?: string

  /**
   * Error message to display.
   * Shown when the field has an error, typically after validation.
   * @example "Please enter a valid email address"
   */
  error?: string

  /**
   * Whether the field is required.
   * Adds a visual indicator and sets the HTML required attribute.
   * @default false
   */
  required?: boolean

  /**
   * Additional text to help the user.
   * Displayed below the field to provide guidance.
   * @example "We'll never share your email with anyone else"
   */
  helperText?: string

  /**
   * CSS class for the label element.
   * Use this to override default label styling.
   * @example "text-lg font-bold"
   */
  labelClassName?: string

  /**
   * CSS class for the error message.
   * Use this to override default error styling.
   * @example "text-red-600 font-bold"
   */
  errorClassName?: string

  /**
   * CSS class for the helper text.
   * Use this to override default helper text styling.
   * @example "text-xs italic"
   */
  helperTextClassName?: string

  /**
   * Whether to visually hide the label.
   * When true, the label is still accessible to screen readers.
   * @default false
   */
  hideLabel?: boolean

  /**
   * Content to display on the right side of the header.
   * Useful for adding actions or additional information.
   * @example <Button>Reset</Button>
   */
  headerRight?: React.ReactNode
}

/**
 * Properties for the AgentFormHeader component
 * @property isNewAgent - Whether this is a new agent or an existing one
 * @property isSubmitting - Whether the form is currently submitting
 * @property onSubmit - Function to call when the submit button is clicked
 * @property onOpenTemplates - Function to call when the templates button is clicked
 * @property isValid - Whether the form is valid and can be submitted
 * @property title - Title to display in the header
 * @property backUrl - URL to navigate to when the back button is clicked
 * @property backText - Text to display in the back button
 * @property createButtonText - Text to display in the create button
 * @property saveButtonText - Text to display in the save button
 * @property templatesButtonText - Text to display in the templates button
 * @property headerContent - Additional content to display in the header
 * @property hideTemplatesButton - Whether to hide the templates button
 * @property hideBackButton - Whether to hide the back button
 * @property onBack - Function to call when the back button is clicked
 */
export interface AgentFormHeaderProps extends BaseComponentProps {
  /**
   * Whether this is a new agent or an existing one.
   * Controls the text of the submit button and potentially other UI elements.
   * @required
   */
  isNewAgent: boolean

  /**
   * Whether the form is currently submitting.
   * When true, the submit button shows a loading state and is disabled.
   * @required
   */
  isSubmitting: boolean

  /**
   * Function to call when the submit button is clicked.
   * Should trigger form validation and submission.
   * @required
   */
  onSubmit: () => void

  /**
   * Function to call when the templates button is clicked.
   * Should open the templates modal or navigate to templates page.
   * @required
   */
  onOpenTemplates: () => void

  /**
   * Whether the form is valid and can be submitted.
   * When false, the submit button is disabled.
   * @required
   */
  isValid: boolean

  /**
   * Title to display in the header.
   * If not provided, defaults based on isNewAgent.
   * @default isNewAgent ? "Novo Agente" : "Editar Agente"
   * @example "Criar Assistente de Vendas"
   */
  title?: string

  /**
   * URL to navigate to when the back button is clicked.
   * Only used if onBack is not provided.
   * @default "/agentes"
   */
  backUrl?: string

  /**
   * Text to display in the back button.
   * @default "Voltar"
   */
  backText?: string

  /**
   * Text to display in the create button.
   * Used when isNewAgent is true.
   * @default "Criar Agente"
   */
  createButtonText?: string

  /**
   * Text to display in the save button.
   * Used when isNewAgent is false.
   * @default "Salvar Alterações"
   */
  saveButtonText?: string

  /**
   * Text to display in the templates button.
   * @default "Templates"
   */
  templatesButtonText?: string

  /**
   * Additional content to display in the header.
   * Rendered after the title.
   * @example <Badge>Draft</Badge>
   */
  headerContent?: React.ReactNode

  /**
   * Whether to hide the templates button.
   * @default false
   */
  hideTemplatesButton?: boolean

  /**
   * Whether to hide the back button.
   * @default false
   */
  hideBackButton?: boolean

  /**
   * Function to call when the back button is clicked.
   * If provided, overrides the default behavior of navigating to backUrl.
   * Use this to handle unsaved changes confirmation.
   * @param event - The click event
   */
  onBack?: (event: React.MouseEvent) => void
}

/**
 * Properties for the PromptEditor component
 * @property value - The current value of the prompt
 * @property onChange - Function to call when the value changes
 * @property onSelectTemplate - Function to call when a template is selected
 * @property error - Error message to display
 * @property minHeight - Minimum height of the editor
 * @property label - Label for the editor
 * @property required - Whether the field is required
 * @property onBlur - Function to call when the editor loses focus
 * @property placeholder - Placeholder text to display when the editor is empty
 * @property readOnly - Whether the editor is read-only
 * @property maxLength - Maximum length of the prompt
 * @property showCharCount - Whether to show the character count
 * @property autoFocus - Whether the editor should automatically receive focus
 * @property showTemplateButton - Whether to show the template button
 */
export interface PromptEditorProps extends BaseComponentProps {
  /**
   * The current value of the prompt.
   * This is the text content of the editor.
   * @required
   */
  value: string

  /**
   * Function to call when the value changes.
   * Called with the new value whenever the user types or pastes.
   * @required
   * @param value - The new value of the prompt
   */
  onChange: (value: string) => void

  /**
   * Function to call when a template is selected.
   * If not provided, the template button will not be shown.
   * @param content - The content of the selected template
   */
  onSelectTemplate?: () => void

  /**
   * Error message to display.
   * Shown when the field has an error, typically after validation.
   * @example "Prompt is required"
   */
  error?: string

  /**
   * Minimum height of the editor.
   * Can be any valid CSS height value.
   * @default "200px"
   */
  minHeight?: string

  /**
   * Label for the editor.
   * Displayed above the editor and used for accessibility.
   * @example "Agent Prompt"
   */
  label?: string

  /**
   * Whether the field is required.
   * Adds a visual indicator and sets the HTML required attribute.
   * @default false
   */
  required?: boolean

  /**
   * Function to call when the editor loses focus.
   * Useful for triggering validation.
   */
  onBlur?: () => void

  /**
   * Placeholder text to display when the editor is empty.
   * Provides guidance to the user about what to enter.
   * @default "# Title\n\nYou are an assistant that..."
   */
  placeholder?: string

  /**
   * Whether the editor is read-only.
   * When true, the user cannot edit the content.
   * @default false
   */
  readOnly?: boolean

  /**
   * Maximum length of the prompt.
   * If provided, shows a character count and limits input.
   */
  maxLength?: number

  /**
   * Whether to show the character count.
   * Only applies if maxLength is provided.
   * @default true
   */
  showCharCount?: boolean

  /**
   * Whether the editor should automatically receive focus.
   * @default false
   */
  autoFocus?: boolean

  /**
   * Whether to show the template button.
   * If false, the template button will not be shown regardless of onSelectTemplate.
   * @default true
   */
  showTemplateButton?: boolean
}

/**
 * Properties for the BadgeList component
 * @property items - Array of badge items to display
 * @property onAdd - Function to call when the add button is clicked
 * @property onRemove - Function to call when a badge is removed
 * @property onEdit - Function to call when a badge is edited
 * @property addLabel - Label for the add button
 * @property maxItems - Maximum number of items allowed
 * @property emptyMessage - Message to display when there are no items
 * @property readOnly - Whether the list is read-only
 * @property addButtonVariant - Variant of the add button
 * @property badgeVariant - Variant of the badges
 * @property sortable - Whether the badges can be reordered
 * @property onReorder - Function to call when badges are reordered
 * @property confirmRemoval - Whether to confirm before removing a badge
 * @property removeBadgeAriaLabel - Accessible label for the remove badge button
 */
export interface BadgeListProps extends BaseComponentProps {
  /**
   * Array of badge items to display.
   * Each item must have an id and label.
   * @required
   */
  items: BadgeItem[]

  /**
   * Function to call when the add button is clicked.
   * Should add a new badge to the items array.
   * @required
   */
  onAdd: () => void

  /**
   * Function to call when a badge is removed.
   * Called with the id of the badge to remove.
   * @required
   * @param id - The id of the badge to remove
   */
  onRemove: (id: string) => void

  /**
   * Function to call when a badge is edited.
   * If provided, badges become editable on click.
   * @param id - The id of the badge to edit
   * @param newLabel - The new label for the badge
   */
  onEdit?: (id: string, newLabel: string) => void

  /**
   * Label for the add button.
   * Also used in aria-label with "Add " prefix.
   * @default "Item"
   */
  addLabel?: string

  /**
   * Maximum number of items allowed.
   * When reached, the add button is disabled.
   * @default 10
   */
  maxItems?: number

  /**
   * Message to display when there are no items.
   * @default "Nenhum item adicionado"
   */
  emptyMessage?: string

  /**
   * Whether the list is read-only.
   * When true, badges cannot be removed or edited.
   * @default false
   */
  readOnly?: boolean

  /**
   * Variant of the add button.
   * Controls the visual style of the button.
   * @default "outline"
   */
  addButtonVariant?: "default" | "outline" | "ghost" | "link"

  /**
   * Variant of the badges.
   * Controls the visual style of the badges.
   * @default "secondary"
   */
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"

  /**
   * Whether the badges can be reordered.
   * When true, badges can be dragged to change order.
   * @default false
   */
  sortable?: boolean

  /**
   * Function to call when badges are reordered.
   * Called with the new order of badge items.
   * @param items - The new order of badge items
   */
  onReorder?: (items: BadgeItem[]) => void

  /**
   * Whether to confirm before removing a badge.
   * When true, shows a confirmation dialog.
   * @default false
   */
  confirmRemoval?: boolean

  /**
   * Accessible label for the remove badge button.
   * If not provided, defaults to "Remove {label}".
   * @example "Remove tag"
   */
  removeBadgeAriaLabel?: string
}

/**
 * Properties for the AgentBasicInfo component
 * @property name - Name of the agent
 * @property type - Type of the agent
 * @property model - Model of the agent
 * @property description - Description of the agent
 * @property status - Status of the agent
 * @property onChangeName - Function to call when the name changes
 * @property onChangeType - Function to call when the type changes
 * @property onChangeModel - Function to call when the model changes
 * @property onChangeDescription - Function to call when the description changes
 * @property onChangeStatus - Function to call when the status changes
 * @property errors - Object containing error messages for each field
 * @property readOnly - Whether the component is read-only
 * @property agentTypes - Array of available agent types
 * @property models - Array of available models
 */
export interface AgentBasicInfoProps extends BaseComponentProps {
  /**
   * Name of the agent.
   * Used as the primary identifier for the agent.
   * @required
   */
  name: string

  /**
   * Type of the agent.
   * Determines the agent's capabilities and behavior.
   * @required
   */
  type: string

  /**
   * Model of the agent.
   * The AI model used by the agent.
   * @required
   */
  model: string

  /**
   * Description of the agent.
   * Provides additional context about the agent's purpose.
   * @required
   */
  description: string

  /**
   * Status of the agent.
   * Indicates whether the agent is active, draft, etc.
   * @required
   */
  status: string

  /**
   * Function to call when the name changes.
   * @required
   * @param name - The new name value
   */
  onChangeName: (name: string) => void

  /**
   * Function to call when the type changes.
   * @required
   * @param type - The new type value
   */
  onChangeType: (type: string) => void

  /**
   * Function to call when the model changes.
   * @required
   * @param model - The new model value
   */
  onChangeModel: (model: string) => void

  /**
   * Function to call when the description changes.
   * @required
   * @param description - The new description value
   */
  onChangeDescription: (description: string) => void

  /**
   * Function to call when the status changes.
   * @required
   * @param status - The new status value
   */
  onChangeStatus: (status: string) => void

  /**
   * Object containing error messages for each field.
   * Keys should match field names.
   * @example { name: "Name is required", description: "Description is too short" }
   */
  errors?: {
    name?: string
    type?: string
    model?: string
    description?: string
    status?: string
  }

  /**
   * Whether the component is read-only.
   * When true, fields cannot be edited.
   * @default false
   */
  readOnly?: boolean

  /**
   * Array of available agent types.
   * Each type must have an id and name.
   * @default [{ id: "assistant", name: "Assistente" }, { id: "chatbot", name: "Chatbot" }]
   */
  agentTypes?: Array<{ id: string; name: string }>

  /**
   * Array of available models.
   * Each model must have an id and name.
   * @default [{ id: "gpt-4", name: "GPT-4" }, { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" }]
   */
  models?: Array<{ id: string; name: string }>
}
