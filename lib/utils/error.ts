import * as z from "zod"
import { isObject } from "./object"

type ErrorWithMessage = {
  name: string
  message: string
  stack?: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    const message = typeof maybeError === "string"
      ? maybeError
      : JSON.stringify(maybeError)

    return new Error(message)
  } catch {
    return new Error(String(maybeError))
  }
}

export function getErrorName(error: unknown) {
  return toErrorWithMessage(error).name
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function getErrorStack(error: unknown) {
  const errorWithMessage = toErrorWithMessage(error)
  const isErrorWithStack = "stack" in errorWithMessage
  if (!isErrorWithStack) return

  return String(errorWithMessage.stack) || undefined
}

const ErrorsSchema = z.object({
  errors: z.record(z.string(), z.string().array()),
})

export type Errors = Record<string, string[]>

export function fillErrors(errors: Errors, data: unknown) {
  if (isObject(data)) {
    const { data: parsedData, success } = ErrorsSchema.safeParse(data)
    if (success) return parsedData.errors

    for (const [key, value] of Object.entries(data)) {
      errors[key] = toListOfErrors(value)
    }
  }

  if (Array.isArray(data)) {
    for (const error of data) {
      fillErrors(errors, error)
    }
  }
}

export function toListOfErrors(data: unknown): string[] {
  if (typeof data === "string") {
    return [data]
  } else if (Array.isArray(data)) {
    return data.flatMap((error) => {
      if (isObject(error) && "message" in error) {
        return [String(error.message)]
      } else {
        return toListOfErrors(error)
      }
    })
  } else if (data instanceof z.core.$ZodError) {
    return data.issues.map((issue) => issue.message)
  } else {
    return [getErrorMessage(data)]
  }
}
