import { useCallback, useRef } from "react"

export function useDebounceFn<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}
