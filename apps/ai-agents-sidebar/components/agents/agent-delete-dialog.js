"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentDeleteDialog = AgentDeleteDialog;
var alert_dialog_1 = require("@/components/ui/alert-dialog");
/**
 * Dialog for confirming agent deletion
 *
 * This component displays a confirmation dialog when the user tries to
 * delete an agent.
 *
 * @example
 * ```tsx
 * <AgentDeleteDialog
 *   agent={agentToDelete}
 *   onOpenChange={(open) => !open && setAgentToDelete(null)}
 *   onConfirm={handleDeleteAgent}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentDeleteDialog(_a) {
    var 
    // Required props
    agent = _a.agent, onOpenChange = _a.onOpenChange, onConfirm = _a.onConfirm, 
    // Optional props with defaults
    _b = _a.title, 
    // Optional props with defaults
    title = _b === void 0 ? "Excluir agente" : _b, description = _a.description, _c = _a.cancelText, cancelText = _c === void 0 ? "Cancelar" : _c, _d = _a.confirmText, confirmText = _d === void 0 ? "Excluir" : _d, 
    // Accessibility props
    id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "agent-delete-dialog";
    var defaultDescription = agent
        ? "Tem certeza que deseja excluir o agente \"".concat(agent.name, "\"? Esta a\u00E7\u00E3o n\u00E3o pode ser desfeita.")
        : "Tem certeza que deseja excluir este agente? Esta ação não pode ser desfeita.";
    return (<alert_dialog_1.AlertDialog open={!!agent} onOpenChange={onOpenChange}>
      <alert_dialog_1.AlertDialogContent id={componentId} data-testid={testId} aria-label={ariaLabel || title}>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>{title}</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>{description || defaultDescription}</alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel data-testid={"".concat(componentId, "-cancel-button")}>{cancelText}</alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700" data-testid={"".concat(componentId, "-confirm-button")}>
            {confirmText}
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
