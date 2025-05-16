"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentListHeader = AgentListHeader;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
/**
 * Header component for the agent listing page
 *
 * This component displays the header of the agent listing page,
 * including the title and create button.
 *
 * @example
 * ```tsx
 * <AgentListHeader
 *   onCreateAgent={handleCreateAgent}
 *   title="AI Agents"
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentListHeader(_a) {
    var 
    // Required props
    onCreateAgent = _a.onCreateAgent, 
    // Optional props with defaults
    _b = _a.title, 
    // Optional props with defaults
    title = _b === void 0 ? "Agentes" : _b, _c = _a.createButtonText, createButtonText = _c === void 0 ? "Novo Agente" : _c, _d = _a.showCreateButton, showCreateButton = _d === void 0 ? true : _d, additionalActions = _a.additionalActions, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "agent-list-header";
    return (<div className={(0, utils_1.cn)("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", className)} id={componentId} data-testid={testId} aria-label={ariaLabel || "Cabeçalho da lista de agentes"}>
      <h1 className="text-2xl font-bold" data-testid={"".concat(componentId, "-title")}>
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {showCreateButton && (<button_1.Button onClick={onCreateAgent} className="bg-purple-600 hover:bg-purple-700 text-white" aria-label={"Criar ".concat(createButtonText.toLowerCase())} data-testid={"".concat(componentId, "-create-button")}>
            <lucide_react_1.Plus className="mr-2 h-4 w-4" aria-hidden="true"/>
            {createButtonText}
          </button_1.Button>)}
        {additionalActions}
      </div>
    </div>);
}
