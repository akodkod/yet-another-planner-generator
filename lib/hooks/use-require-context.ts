import { Context, useContext } from "react"

export function useRequireContext<T>(context: Context<T | null>): T {
  const value = useContext(context)
  if (!value) throw new Error("Context not found")

  return value
}
