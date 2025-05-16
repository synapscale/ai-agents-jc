import * as React from "react"
import { useMobile } from "@shared/hooks/use-mobile"

export function useIsMobile() {
  const isMobile = useMobile()

  return isMobile
}
