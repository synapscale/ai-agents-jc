import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { BaseComponentProps } from "@/types/component-interfaces"

interface CardSkeletonProps extends BaseComponentProps {
  withTags?: boolean
  withFooter?: boolean
  withImage?: boolean
  imageHeight?: number
  lines?: number
  lineWidths?: string[]
}

export function CardSkeleton({
  withTags = true,
  withFooter = true,
  withImage = false,
  imageHeight = 200,
  lines = 2,
  lineWidths = ["100%", "75%"],
  className,
  testId,
}: CardSkeletonProps) {
  return (
    <Card className={className} data-testid={testId}>
      {withImage && (
        <div className="w-full" style={{ height: `${imageHeight}px` }}>
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <CardHeader className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={`line-${i}`}
            className="h-4 mt-1"
            style={{ width: lineWidths[i % lineWidths.length] || "100%" }}
          />
        ))}
        {withTags && (
          <div className="flex gap-1 mt-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        )}
      </CardContent>
      {withFooter && (
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </CardFooter>
      )}
    </Card>
  )
}
