import { useEffect, useRef } from "react"
import { isEqualShallow } from "../utils/shallow"

export function useOnChange<T>(value: T, callback: (value: T) => void) {
  const previousValueReference = useRef(value)

  useEffect(() => {
    if (isEqualShallow(previousValueReference.current, value)) return

    callback(value)
    previousValueReference.current = value
  }, [value, callback])
}
