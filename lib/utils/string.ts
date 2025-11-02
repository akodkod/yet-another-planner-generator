import * as z from "zod"
import { inflect, camelize as inflectionCamelize } from "inflection"
export { titleize, capitalize, dasherize, underscore, singularize } from "inflection"

export function toBool(value: unknown): boolean {
  return !!z.stringbool().safeParse(value).data
}

export function pluralize(text: string, count?: number, includeCount?: boolean) {
  count ??= 2

  return includeCount
    ? `${count} ${inflect(text, count)}`
    : inflect(text, count)
}

export function camelize(text: string, lowFirstLetter?: boolean) {
  const textWithoutDashes = text.replaceAll("-", "_")
  return inflectionCamelize(textWithoutDashes, lowFirstLetter)
}

export function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function parameterize(text: string) {
  // Remove all non-alphanumeric characters
  const cleaned = text.replaceAll(/[^\d A-Za-z]/g, "")

  // Replace all non-alphanumeric characters with a dash
  const dasherized = cleaned.replaceAll(/[^\dA-Za-z]/g, "-")

  // Convert to lowercase
  return dasherized.toLowerCase()
}

export function normalize(text: string) {
  // Remove end line in the beginning and end of the text
  text = text.trim()

  // Remove 3 and more new lines
  text = text.replaceAll(/\n\n\n+/g, "\n\n")

  // Remove whitespaces in the beginning and end of each line
  text = text.split("\n").map((line) => line.trim()).join("\n")

  return text
}

export function truncate(text: string, length: number) {
  return text.length > length ? text.slice(0, length - 3) + "..." : text
}

export function stringPresence(text: string | null | undefined) {
  const trimmed = text?.trim()
  if (!trimmed || trimmed.length === 0) return

  return trimmed
}

export function formatList(list: string[], options?: Intl.ListFormatOptions) {
  return new Intl.ListFormat("en-GB", {
    style: "long",
    type: "conjunction",
    ...options,
  }).format(list)
}
