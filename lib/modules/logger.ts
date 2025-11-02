// import { logger } from "@sentry/react"
import camelcaseKeys from "camelcase-keys"
import pc from "picocolors"
import snakecaseKeys from "snakecase-keys"
import { IsDev, IsProd } from "@/lib/data/runtime"
import { consoleError } from "@/lib/utils/console"
import { isEmptyObject, removeEmptyValues, removeUndefinedAndNullValues } from "@/lib/utils/object"
import { camelize } from "@/lib/utils/string"
import { AnyObject } from "@/lib/utils/types"
import { unreachable } from "@/lib/utils/code-execution"

export type LogContext = AnyObject & {
  module?: string
  service?: string
  serviceStep?: string
  duration?: number
  style?: "success" | "warn" | "error" | "info" | "gray"
  depth?: number
}

class LoggerModule {
  public info(message: string, context?: LogContext) {
    this.deliver("info", message, context)
  }

  public warn(message: string, context?: LogContext) {
    this.deliver("warn", message, context)
  }

  public error(message: string, error?: unknown, context?: LogContext) {
    this.deliver("error", message, (context || error) ? { ...context, error } : undefined)
  }

  public perf(message: string, startTime: number, context?: LogContext) {
    const duration = Math.round(performance.now() - startTime)
    this.deliver("info", message, { ...context, performanceMetric: true, duration })
  }

  public dev(message: string, context?: LogContext) {
    if (IsProd) return

    this.deliver("info", message, context)
  }

  private deliver(level: "info" | "warn" | "error", message: string, context: LogContext = {}) {
    message = this.messageMiddleware(message, context)
    context = this.contextMiddleware(context)

    // logger[level](message, context)
    this.devDeliver(level, message, context)
  }

  private devDeliver(level: "info" | "warn" | "error", message: string, context: LogContext = {}) {
    if (!IsDev) return

    const { module: _, service: __, duration: ___, serviceStep: ____, error, ...rest } = camelcaseKeys(context)
    const cleanContext = removeEmptyValues(rest)
    const logArguments = isEmptyObject(cleanContext) ? [message] : [message, pc.dim(JSON.stringify(cleanContext))]

    console[level](...logArguments)
    if (error) consoleError(error)
  }

  private messageMiddleware(message: string, context: LogContext = {}) {
    message = this.applyStyle(message, context)
    message = this.applyDepth(message, context)

    const prefix = this.generatePrefix(context)
    if (prefix) message = `${prefix}${message}`.trim()

    return message
  }

  private contextMiddleware(context: LogContext = {}) {
    delete context.style
    delete context.depth

    // Extend log with metadata
    context.meta = this.getMetadata()

    // Convert all keys to snake_case according to Sentry code style
    context = snakecaseKeys(context, { deep: true })

    return context
  }

  private getMetadata() {
    // TODO: Add metadata
    return removeUndefinedAndNullValues({})
  }

  private applyStyle(message: string, context: LogContext = {}) {
    if (!context.style) return message

    switch (context.style) {
      case "success":
        return pc.green(message)

      case "warn":
        return pc.yellow(message)

      case "error":
        return pc.red(message)

      case "info":
        return pc.blue(message)

      case "gray":
        return pc.gray(message)

      default:
        unreachable(context.style)
    }
  }

  private applyDepth(message: string, context: LogContext = {}) {
    const depth = context.depth
    if (!depth || depth === 0) return message

    const indentSpaces = depth === 1 ? " " : " " + " ".repeat((depth - 1) * 2)
    let symbol: string

    switch (context.style) {
      case "success":
        symbol = "✓"
        break

      case "warn":
        symbol = "⚠"
        break

      case "error":
        symbol = "✗"
        break

      default: {
        const symbols = ["·", "◦", "▫", "◇", "◯", "□", "◻", "⬚"]
        symbol = symbols[Math.min(depth - 1, symbols.length - 1)]
      }
    }

    return `${indentSpaces}${pc.dim(symbol)} ${message}`
  }

  private generatePrefix(log: LogContext) {
    const prefixes = []

    if (IsDev) prefixes.push(pc.gray(new Date().toISOString().slice(11, 19)))
    if (log.module) prefixes.push(pc.yellow(camelize(log.module).replaceAll(/[ -]/g, "")))

    if (log.service && log.serviceStep) {
      const serviceName = pc.blue(camelize(log.service).replaceAll(/[ -]/g, ""))
      const serviceStepName = pc.cyan(camelize(log.serviceStep, true).replaceAll(/[ -]/g, ""))

      if (IsDev) {
        prefixes.push(`${serviceName}${pc.dim(".")}${serviceStepName}`)
      } else {
        prefixes.push(serviceName)
      }
    }

    if (typeof log.duration === "number") prefixes.push(pc.gray(`${log.duration}ms`))
    if (prefixes.length === 0) return

    return `${prefixes.join(pc.dim("›"))} `
  }
}

export const Logger = new LoggerModule()
