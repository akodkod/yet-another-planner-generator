import { IsProd } from "@/lib/data/runtime"
import { Logger } from "@/lib/modules/logger"
import { TimeoutError, withRetry, withTimeout } from "@/lib/utils/code-execution"
import { consoleError } from "@/lib/utils/console"
import { Any, AnyObject } from "@/lib/utils/types"

export abstract class BaseModule {
  abstract moduleName: string

  protected log(message: string, data?: AnyObject) {
    Logger.info(message, { context: this.moduleName, ...data })
  }

  protected logWarn(message: string, data?: AnyObject) {
    Logger.warn(message, { context: this.moduleName, ...data })
  }

  protected logError(message: string, error?: unknown, data?: AnyObject) {
    Logger.error(message, error, { context: this.moduleName, ...data })

    if (!IsProd) consoleError(error)
  }

  protected logDev(message: string, data?: AnyObject) {
    Logger.dev(message, { context: this.moduleName, ...data })
  }
}

type LoggedOptions = {
  start: string
  finish: string
  error: string
}

export function logged(options: LoggedOptions) {
  return function(_target: BaseModule, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: Any[]) {
      try {
        // oxlint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.log(options.start)

        const result = originalMethod.apply(this, args)

        // oxlint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.log(options.finish)

        return result
      } catch (error) {
        // oxlint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.logError(options.error, error)
        throw error
      }
    }
  }
}

export function retry(options: { ms?: number; retries?: number } = {}) {
  return function(_target: BaseModule, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: Any[]) {
      return withRetry(() => originalMethod.apply(this, args), options)
    }
  }
}

export function timeout(ms: number = 60_000) {
  return function(_target: BaseModule, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: Any[]) {
      try {
        return withTimeout(() => originalMethod.apply(this, args), ms)
      } catch (error) {
        if (error instanceof TimeoutError) {
          // oxlint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          this.logError(`Timeout ${ms / 1000}s`, error)
        }

        throw error
      }
    }
  }
}
