import { ComponentType, JSX, JSXElementConstructor } from "react"

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any
export type AnyObject = Record<string, unknown>
export type AnyComponent = ComponentType<Any>

export type TimerId = ReturnType<typeof setTimeout>
export type VoidFn = () => void
export type AsyncVoidFn = () => Promise<void>

export type MethodReturnType<TClass, TMethod extends keyof TClass> = TClass[TMethod] extends (...args: Any[]) => infer R ? R : never
export type NativeElement = keyof JSX.IntrinsicElements | JSXElementConstructor<Any>

export type AriaProps = {
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}
