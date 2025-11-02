import { EmptyObject } from "type-fest"
import type { Any, AnyObject } from "./types"

export function removeUndefinedValues<T extends Record<string, unknown>>(object: T): {
  [P in keyof T]: Exclude<T[P], undefined>
} {
  const result: Partial<T> = {}

  for (const key in object) {
    if (object[key] !== undefined) {
      result[key] = object[key] as Exclude<T[typeof key], undefined>
    }
  }

  return result as { [P in keyof T]: Exclude<T[P], undefined> }
}

export function removeUndefinedAndNullValues<T extends Record<string, unknown>>(object: T): {
  [P in keyof T]: Exclude<T[P], undefined | null>
} {
  const result: Partial<T> = {}

  for (const key in object) {
    if (object[key] !== undefined && object[key] !== null) {
      result[key] = object[key] as Exclude<T[typeof key], undefined | null>
    }
  }

  return result as { [P in keyof T]: Exclude<T[P], undefined | null> }
}

export function removeEmptyValues<T extends Record<string, unknown>>(object: T): {
  [P in keyof T]: Exclude<T[P], undefined | null | "" | EmptyObject>
} {
  const result: Partial<T> = {}

  for (const key in object) {
    if (object[key] !== undefined && object[key] !== null && object[key] !== "" && (typeof object[key] !== "object" || !isEmptyObject(object[key] as Record<string, unknown>))) {
      result[key] = object[key] as Exclude<T[typeof key], undefined | null | "" | EmptyObject>
    }
  }

  return result as { [P in keyof T]: Exclude<T[P], undefined | null | "" | EmptyObject> }
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function isEmptyObject(object: Record<string, unknown>) {
  return Object.keys(object).length === 0
}

export function byPath(object: Record<string, Any>, path: PropertyKey[]) {
  try {
    // oxlint-disable-next-line unicorn/no-array-reduce
    return path.reduce((accumulator, key) => accumulator[key as string], object)
  } catch {}
}

export function pick<T, K extends keyof T>(object: T, ...keys: K[]): Pick<T, K> {
  const result: Any = {}

  for (const key of keys) {
    result[key] = object[key]
  }

  return result
}

export function omit<T, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
  const result: Any = {}

  for (const key in object) {
    if (!keys.includes(key as Any)) {
      result[key] = object[key]
    }
  }

  return result
}

export function insertBefore<T extends Record<string, unknown>>(
  object: T,
  beforeKey: keyof T,
  key: keyof T,
  value: unknown,
) {
  const entries = Object.entries(object)
  const index = entries.findIndex(([k]) => k === beforeKey)
  entries.splice(index, 0, [key as string, value])

  return Object.fromEntries(entries) as T
}

export function insertAfter<T extends Record<string, unknown>>(
  object: T,
  afterKey: keyof T,
  key: keyof T,
  value: unknown,
) {
  const entries = Object.entries(object)
  const index = entries.findIndex(([k]) => k === afterKey)
  entries.splice(index + 1, 0, [key as string, value])

  return Object.fromEntries(entries) as T
}

export function deepTrim<T>(object: T): T {
  if (Array.isArray(object)) {
    return object.map((item) => deepTrim(item)) as T
  }

  if (isObject(object)) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, deepTrim(value)])) as T
  }

  if (typeof object === "string") {
    return object.trim() as unknown as T
  }

  return object
}

export function transformValues<T extends Record<string, R>, R>(object: T, transform: (value: R) => unknown): unknown {
  return Object.fromEntries(
    Object
      .entries(object)
      .map(([key, value]) => [
        key,
        transform(value),
      ]),
  )
}

export function transformValuesKeepType<T extends Record<string, R>, R>(object: T, transform: (value: R) => unknown): T {
  return transformValues(object, transform) as T
}

export function objectPresence<T extends AnyObject>(object: T): T | undefined {
  return Object.keys(object).length > 0 ? object : undefined
}

export function getKey(item: Any): string {
  if (item instanceof Object) {
    if ("key" in item) return String(item.key)
    if ("id" in item) return String(item.id)
    if ("value" in item) return String(item.value)
    if ("label" in item) return String(item.label)
  }

  return String(item)
}
