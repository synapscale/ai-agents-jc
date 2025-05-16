export interface Agent {
  id: string;
  name: string;
  description?: string;
  model: string;
  type: "chat" | "texto" | "imagem";
  status: "active" | "draft" | "archived";
  systemMessage?: string;
  examples?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentCardProps {
  // Required props
  agent: Agent;
  onDuplicate: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
  formatDate: (date: string) => string;

  // Optional props with defaults
  onView?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onTest?: (agent: Agent) => void;
  showActions?: boolean;
  customActions?: Array<{
    label: string;
    onClick: (agent: Agent) => void;
    icon?: React.ReactNode;
    className?: string;
  }>;
  showFooter?: boolean;
  showBadges?: boolean;
  onClick?: (agent: Agent) => void;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (agent: Agent) => void;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentBasicInfoProps {
  // Required props
  name: string;
  type: string;
  model: string;
  description: string;
  status: string;
  onChangeName: (value: string) => void;
  onChangeType: (value: string) => void;
  onChangeModel: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeStatus: (value: string) => void;
  onBlurName: () => void;
  isNewAgent: boolean;

  // Optional props with defaults
  nameError?: string;
  descriptionMaxLength?: number;
  nameMaxLength?: number;
  descriptionPlaceholder?: string;
  namePlaceholder?: string;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentConnectionsTabProps {
  // Required props
  agents: Array<{ id: string; name: string }>;
  urls: Array<{ id: string; url: string }>;
  onAddAgent: () => void;
  onRemoveAgent: (id: string) => void;
  onAddUrl: () => void;
  onRemoveUrl: (id: string) => void;

  // Optional props with defaults
  onEditAgent?: (id: string) => void;
  onEditUrl?: (id: string) => void;
  maxAgents?: number;
  maxUrls?: number;
  agentsEmptyMessage?: string;
  urlsEmptyMessage?: string;
  showAgentsSection?: boolean;
  showUrlsSection?: boolean;
  agentsSectionTitle?: string;
  urlsSectionTitle?: string;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentDeleteDialogProps {
  // Required props
  agent: Agent | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;

  // Optional props with defaults
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;

  // Accessibility props
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentFormActionsProps {
  // Required props
  onSave: () => void;
  onCancel: () => void;

  // Optional props with defaults
  isSaving?: boolean;
  isValid?: boolean;
  saveText?: string;
  cancelText?: string;
  showCancel?: boolean;
  position?: "top" | "bottom";
  saveIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentFormHeaderProps {
  // Required props
  title: string;
  activeTab: string;
  onTabChange: (value: string) => void;

  // Optional props with defaults
  subtitle?: string;
  tabs?: Array<{ id: string; label: string }>;
  showTabs?: boolean;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentFormLoadingProps {
  // Optional props with defaults
  showHeader?: boolean;
  showBasicInfo?: boolean;
  showTabs?: boolean;
  showActions?: boolean;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentListEmptyProps {
  // Required props
  onCreateNew: () => void;

  // Optional props with defaults
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: React.ReactNode;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentListFiltersProps {
  // Required props
  searchQuery: string;
  onSearchChange: (value: string) => void;

  // Optional props with defaults
  statusFilter?: string[];
  onStatusFilterChange?: (value: string[]) => void;
  typeFilter?: string[];
  onTypeFilterChange?: (value: string[]) => void;
  modelFilter?: string[];
  onModelFilterChange?: (value: string[]) => void;
  showStatusFilter?: boolean;
  showTypeFilter?: boolean;
  showModelFilter?: boolean;
  searchPlaceholder?: string;
  statusOptions?: Array<{ value: string; label: string }>;
  typeOptions?: Array<{ value: string; label: string }>;
  modelOptions?: Array<{ value: string; label: string }>;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentListHeaderProps {
  // Required props
  title: string;
  onCreateNew: () => void;

  // Optional props with defaults
  subtitle?: string;
  buttonText?: string;
  showButton?: boolean;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentNotFoundProps {
  // Required props
  onBack: () => void;

  // Optional props with defaults
  title?: string;
  description?: string;
  buttonText?: string;
  icon?: React.ReactNode;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentParametersTabProps {
  // Required props
  temperature: number;
  maxTokens: number;
  onChangeTemperature: (value: number) => void;
  onChangeMaxTokens: (value: number) => void;

  // Optional props with defaults
  topP?: number;
  onChangeTopP?: (value: number) => void;
  frequencyPenalty?: number;
  onChangeFrequencyPenalty?: (value: number) => void;
  presencePenalty?: number;
  onChangePresencePenalty?: (value: number) => void;
  stopSequences?: string;
  onChangeStopSequences?: (value: string) => void;
  showAdvancedParameters?: boolean;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}

export interface AgentPromptTabProps {
  // Required props
  systemMessage: string;
  onChangeSystemMessage: (value: string) => void;

  // Optional props with defaults
  examples?: string;
  onChangeExamples?: (value: string) => void;
  systemMessagePlaceholder?: string;
  examplesPlaceholder?: string;
  showExamples?: boolean;

  // Accessibility props
  className?: string;
  id?: string;
  testId?: string;
  ariaLabel?: string;
}
