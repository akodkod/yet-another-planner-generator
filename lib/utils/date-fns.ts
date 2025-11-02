import * as locales from "date-fns/locale"

export function localeCodeToLocale(localeCode: string | null | undefined): locales.Locale {
  if (!localeCode) return locales.enUS

  return localeMap.get(preprocessLocaleCode(localeCode)) ?? locales.enUS
}

export function localeCodeExists(localeCode: string | null | undefined): boolean {
  if (!localeCode) return false

  return localeMap.has(preprocessLocaleCode(localeCode))
}

function preprocessLocaleCode(localeCode: string): string {
  return localeCode.toLowerCase()
}

const localeMap = new Map<string, locales.Locale>([
  ["en-US", locales.enUS],
  ["en-GB", locales.enGB],
  ["uk", locales.uk],
])
