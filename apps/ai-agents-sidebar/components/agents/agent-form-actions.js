"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentFormActions = AgentFormActions;
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
/**
 * Component for the form actions of the agent form
 *
 * This component displays the action buttons for the agent form,
 * including reset and submit buttons.
 *
 * @example
 * ```tsx
 * <AgentFormActions
 *   onReset={handleReset}
 *   onSubmit={handleSubmit}
 *   isSubmitting={isSubmitting}
 *   isValid={isValid}
 *   hasUnsavedChanges={hasUnsavedChanges}
 *   isNewAgent={isNewAgent}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentFormActions(_a) {
    var 
    // Required props
    onReset = _a.onReset, isSubmitting = _a.isSubmitting, isValid = _a.isValid, hasUnsavedChanges = _a.hasUnsavedChanges, isNewAgent = _a.isNewAgent, 
    // Optional props with defaults
    onSubmit = _a.onSubmit, _b = _a.resetButtonText, resetButtonText = _b === void 0 ? "Redefinir" : _b, submitButtonText = _a.submitButtonText, _c = _a.showResetButton, showResetButton = _c === void 0 ? true : _c, _d = _a.confirmReset, confirmReset = _d === void 0 ? false : _d, _e = _a.confirmSubmit, confirmSubmit = _e === void 0 ? false : _e, _f = _a.submitButtonVariant, submitButtonVariant = _f === void 0 ? "default" : _f, _g = _a.resetButtonVariant, resetButtonVariant = _g === void 0 ? "outline" : _g, additionalActions = _a.additionalActions, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var handleReset = function () {
        if (confirmReset && hasUnsavedChanges) {
            if (window.confirm("Tem certeza que deseja redefinir o formulário? Todas as alterações não salvas serão perdidas.")) {
                onReset();
            }
        }
        else {
            onReset();
        }
    };
    var handleSubmit = function () {
        if (confirmSubmit) {
            if (window.confirm("Tem certeza que deseja salvar as alterações?")) {
                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
            }
        }
        else {
            onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
        }
    };
    var defaultSubmitText = isSubmitting ? "Salvando..." : isNewAgent ? "Criar Agente" : "Salvar Alterações";
    var finalSubmitText = submitButtonText || defaultSubmitText;
    var componentId = id || "agent-form-actions";
    return (<div className={(0, utils_1.cn)("flex justify-end gap-3 pt-4 border-t", className)} id={componentId} data-testid={testId} aria-label={ariaLabel || "Ações do formulário"}>
      {additionalActions && <div className="mr-auto">{additionalActions}</div>}

      {showResetButton && (<button_1.Button type="button" variant={resetButtonVariant} onClick={handleReset} disabled={isSubmitting || !hasUnsavedChanges} aria-label={resetButtonText} data-testid={"".concat(componentId, "-reset-button")}>
          {resetButtonText}
        </button_1.Button>)}

      <button_1.Button type={onSubmit ? "button" : "submit"} onClick={onSubmit ? handleSubmit : undefined} disabled={isSubmitting || !isValid} variant={submitButtonVariant} className={(0, utils_1.cn)("bg-purple-600 hover:bg-purple-700 text-white", !hasUnsavedChanges && "opacity-50")} aria-label={finalSubmitText} aria-disabled={isSubmitting || !isValid} data-testid={"".concat(componentId, "-submit-button")}>
        {finalSubmitText}
      </button_1.Button>
    </div>);
}
