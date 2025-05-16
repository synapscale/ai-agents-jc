"use client";
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPromptTab = AgentPromptTab;
var prompt_editor_1 = require("@/components/agents/prompt-editor");
var prompt_tools_bar_1 = require("@/components/agents/prompt-tools-bar");
var _constants_1 = require("@constants");
/**
 * Component for the prompt tab of the agent form
 *
 * This component displays and manages the prompt editor and tools for an agent.
 *
 * @example
 * ```tsx
 * <AgentPromptTab
 *   prompt={form.values.prompt}
 *   onChangePrompt={(value) => form.handleChange("prompt", value)}
 *   onBlurPrompt={() => form.handleBlur("prompt")}
 *   promptError={form.errors.prompt}
 *   onOpenTemplates={openTemplatesModal}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentPromptTab(_a) {
    var 
    // Required props
    prompt = _a.prompt, onChangePrompt = _a.onChangePrompt, onBlurPrompt = _a.onBlurPrompt, onOpenTemplates = _a.onOpenTemplates, 
    // Optional props with defaults
    promptError = _a.promptError, _b = _a.minHeight, minHeight = _b === void 0 ? "300px" : _b, _c = _a.showToolbar, showToolbar = _c === void 0 ? true : _c, _d = _a.toolbarPosition, toolbarPosition = _d === void 0 ? "top" : _d, _e = _a.customTools, customTools = _e === void 0 ? [] : _e, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    // Handle tool click
    var handleToolClick = function (toolId) {
        var snippet = _constants_1.PROMPT_TOOL_SNIPPETS[toolId];
        if (snippet) {
            onChangePrompt(prompt + snippet);
        }
        else if (customTools) {
            var customTool = customTools.find(function (tool) { return tool.id === toolId; });
            if (customTool === null || customTool === void 0 ? void 0 : customTool.snippet) {
                onChangePrompt(prompt + customTool.snippet);
            }
        }
    };
    var componentId = id || "agent-prompt-tab";
    var allTools = __spreadArray(__spreadArray([], _constants_1.PROMPT_TOOLS, true), customTools, true);
    return (<div className={className} id={componentId} data-testid={testId} aria-label={ariaLabel || "Editor de prompt do agente"}>
      {/* Barra de ferramentas de prompt */}
      {showToolbar && toolbarPosition === "top" && (<prompt_tools_bar_1.PromptToolsBar tools={allTools} onToolClick={handleToolClick} id={"".concat(componentId, "-toolbar")} aria-label="Ferramentas de prompt"/>)}

      {/* Editor de prompt */}
      <prompt_editor_1.PromptEditor value={prompt} onChange={onChangePrompt} onBlur={onBlurPrompt} error={promptError} minHeight={minHeight} label="Prompt do Agente" required onSelectTemplate={onOpenTemplates} id={"".concat(componentId, "-editor")} aria-describedby={promptError ? "".concat(componentId, "-editor-error") : undefined}/>

      {/* Barra de ferramentas de prompt (se posição for bottom) */}
      {showToolbar && toolbarPosition === "bottom" && (<prompt_tools_bar_1.PromptToolsBar tools={allTools} onToolClick={handleToolClick} className="mt-3" id={"".concat(componentId, "-toolbar")} aria-label="Ferramentas de prompt"/>)}
    </div>);
}
