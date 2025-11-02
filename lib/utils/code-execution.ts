export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

export function unreachable(value: never): never {
  throw new Error(`Unreachable: ${JSON.stringify(value)}`)
}

export function raise(message: string): never {
  throw new Error(message)
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TimeoutError"
  }
}

export function withTimeout<T>(promise: () => Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new TimeoutError("Timeout")), ms),
    ),
  ])
}

export async function withRetry<T>(promise: () => Promise<T>, { ms = 300, attempts = 3 }: { ms?: number; attempts?: number }): Promise<T> {
  try {
    return await promise()
  } catch (error) {
    if (attempts > 1) {
      return withRetry(promise, { ms, attempts: attempts - 1 })
    }

    throw error
  }
}

export function ignoreErrors<T>(fn: () => T): T | undefined {
  try {
    return fn()
  } catch {
    return undefined
  }
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, ms: number) {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => fn(...args), ms)
  }
}
