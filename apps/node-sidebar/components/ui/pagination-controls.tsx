"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BaseComponentProps, PaginationProps } from "@/types/component-interfaces"

interface PaginationControlsProps extends BaseComponentProps, PaginationProps {
  hasMorePages?: boolean
  isLoading?: boolean
  showLoadMore?: boolean
  loadMoreText?: string
  previousText?: string
  nextText?: string
}

export function PaginationControls({
  currentPage,
  totalPages,
  hasMorePages,
  onPageChange,
  isLoading = false,
  showLoadMore = false,
  loadMoreText = "Carregar mais",
  previousText = "Anterior",
  nextText = "Próxima",
  className,
  testId,
}: PaginationControlsProps) {
  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1)
    }
  }

  // Handle next page
  const handleNextPage = () => {
    if ((hasMorePages || currentPage < totalPages) && !isLoading) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={cn("flex items-center", className)} data-testid={testId}>
      {!showLoadMore ? (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || isLoading}
            onClick={handlePreviousPage}
            aria-label="Página anterior"
          >
            {previousText}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!(hasMorePages || currentPage < totalPages) || isLoading}
            onClick={handleNextPage}
            aria-label="Próxima página"
          >
            {nextText}
          </Button>
        </div>
      ) : (
        hasMorePages && (
          <Button variant="outline" disabled={isLoading} onClick={handleNextPage}>
            {isLoading ? "Carregando..." : loadMoreText}
          </Button>
        )
      )}
    </div>
  )
}
