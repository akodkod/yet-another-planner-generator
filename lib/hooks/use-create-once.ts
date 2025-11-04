/* eslint-disable react-hooks/refs */
import { useRef } from "react"

export function useCreateOnce<T>(create: () => T) {
  const value = useRef<T | null>(null)
  if (!value.current) value.current = create()

  return value.current
}
