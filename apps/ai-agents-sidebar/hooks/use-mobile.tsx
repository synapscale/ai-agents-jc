import * as React from "react"
import { useMobile } from "@hooks/use-mobile"

export function useIsMobile() {
  const isMobile = useMobile()

  return isMobile
}
