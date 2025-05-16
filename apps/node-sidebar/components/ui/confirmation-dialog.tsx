"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { BaseComponentProps } from "@/types/component-interfaces"

interface ConfirmationDialogProps extends BaseComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  isConfirming?: boolean
  onConfirm: () => void
  onCancel?: () => void
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  confirmVariant = "default",
  isConfirming = false,
  onConfirm,
  onCancel,
  className,
  testId,
}: ConfirmationDialogProps) {
  // Handle cancel
  const handleCancel = () => {
    onOpenChange(false)
    onCancel?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className} data-testid={testId}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? "Processando..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
