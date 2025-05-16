"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsavedChangesDialog = UnsavedChangesDialog;
var alert_dialog_1 = require("@/components/ui/alert-dialog");
/**
 * Dialog for confirming navigation away from unsaved changes
 *
 * This component displays a confirmation dialog when the user tries to
 * navigate away from a form with unsaved changes.
 *
 * @example
 * ```tsx
 * <UnsavedChangesDialog
 *   open={showUnsavedDialog}
 *   onOpenChange={setShowUnsavedDialog}
 *   onConfirm={handleConfirmNavigation}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function UnsavedChangesDialog(_a) {
    var 
    // Required props
    open = _a.open, onOpenChange = _a.onOpenChange, onConfirm = _a.onConfirm, 
    // Optional props with defaults
    _b = _a.title, 
    // Optional props with defaults
    title = _b === void 0 ? "Alterações não salvas" : _b, _c = _a.description, description = _c === void 0 ? "Você tem alterações não salvas. Tem certeza que deseja sair sem salvar?" : _c, _d = _a.cancelText, cancelText = _d === void 0 ? "Cancelar" : _d, _e = _a.confirmText, confirmText = _e === void 0 ? "Sair sem salvar" : _e, _f = _a.confirmVariant, confirmVariant = _f === void 0 ? "destructive" : _f, 
    // Accessibility props
    id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "unsaved-changes-dialog";
    return (<alert_dialog_1.AlertDialog open={open} onOpenChange={onOpenChange}>
      <alert_dialog_1.AlertDialogContent id={componentId} data-testid={testId} aria-label={ariaLabel || title}>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>{title}</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>{description}</alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel data-testid={"".concat(componentId, "-cancel-button")}>{cancelText}</alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction onClick={onConfirm} className={confirmVariant === "destructive"
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : ""} data-testid={"".concat(componentId, "-confirm-button")}>
            {confirmText}
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
