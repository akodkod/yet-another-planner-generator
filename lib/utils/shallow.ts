// eslint-disable-next-line complexity
export function isEqualShallow<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true

  const aIsObject = typeof a === "object" && a !== null
  const bIsObject = typeof b === "object" && b !== null

  if (!aIsObject || !bIsObject) return false

  const aIsArray = Array.isArray(a)
  const bIsArray = Array.isArray(b)

  if (aIsArray || bIsArray) {
    if (!(aIsArray && bIsArray)) return false

    const arrA = a as unknown as readonly unknown[]
    const arrB = b as unknown as readonly unknown[]

    if (arrA.length !== arrB.length) return false

    for (let i = 0; i < arrA.length; i++) {
      if (!Object.is(arrA[i], arrB[i])) return false
    }

    return true
  }

  if (!isPlain(a) || !isPlain(b)) return false
  const objA = a as unknown as Record<string, unknown>
  const objB = b as unknown as Record<string, unknown>
  const aKeys = Object.keys(objA)

  if (aKeys.length !== Object.keys(objB).length) return false

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false
    if (!Object.is(objA[key], objB[key])) return false
  }

  return true
}

function isPlain(val: unknown): val is Record<string, unknown> {
  if (typeof val !== "object" || val === null) return false

  const proto = Object.getPrototypeOf(val)
  return proto === Object.prototype || proto === null
}
