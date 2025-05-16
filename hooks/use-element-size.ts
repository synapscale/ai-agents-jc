"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

interface Size {
  width: number
  height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, Size] {
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEffect(() => {
    if (!ref) return

    handleSize()

    const resizeObserver = new ResizeObserver(() => {
      handleSize()
    })

    resizeObserver.observe(ref)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, handleSize])

  // Modificado para retornar a função de callback do ref diretamente
  return [setRef, size]
}

