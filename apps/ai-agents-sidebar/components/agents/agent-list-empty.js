"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentListEmpty = AgentListEmpty;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
/**
 * Empty state component for the agent listing page
 *
 * This component displays a message and create button when there are no agents.
 *
 * @example
 * ```tsx
 * <AgentListEmpty
 *   onCreateAgent={handleCreateAgent}
 *   message="No agents found matching your filters"
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentListEmpty(_a) {
    var 
    // Required props
    onCreateAgent = _a.onCreateAgent, 
    // Optional props with defaults
    _b = _a.message, 
    // Optional props with defaults
    message = _b === void 0 ? "Nenhum agente encontrado." : _b, _c = _a.createButtonText, createButtonText = _c === void 0 ? "Criar Novo Agente" : _c, _d = _a.showCreateButton, showCreateButton = _d === void 0 ? true : _d, icon = _a.icon, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "agent-list-empty";
    return (<div className={(0, utils_1.cn)("text-center py-12 border rounded-lg bg-muted/20", className)} id={componentId} data-testid={testId} aria-label={ariaLabel || "Nenhum agente encontrado"}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <p className="text-muted-foreground mb-4" data-testid={"".concat(componentId, "-message")}>
        {message}
      </p>
      {showCreateButton && (<button_1.Button onClick={onCreateAgent} className="bg-purple-600 hover:bg-purple-700 text-white" aria-label={createButtonText} data-testid={"".concat(componentId, "-create-button")}>
          <lucide_react_1.Plus className="mr-2 h-4 w-4" aria-hidden="true"/>
          {createButtonText}
        </button_1.Button>)}
    </div>);
}
