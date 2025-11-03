import { useCallback, useState } from "react"

export function useMeasure() {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return

    setWidth(node.clientWidth)
    setHeight(node.clientHeight)

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (entry) {
        setWidth(entry.contentRect.width)
        setHeight(entry.contentRect.height)
      }
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    ref,
    width,
    height,
  }
}
