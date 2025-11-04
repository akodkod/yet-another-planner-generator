import { useRequireContext } from "@/lib/hooks/use-require-context"
import { TZDate } from "@date-fns/tz"
import { createContext, useContext } from "react"

export type RootContext = {
  startDate: TZDate
  endDate: TZDate
  pageWidth: number
  pageHeight: number
}

export type YearContext = {
  year: number
  yearDate: TZDate
  yearStartDate: TZDate
  yearEndDate: TZDate
}

export type MonthContext = {
  monthDate: TZDate
  monthOfYear: number
  monthStartDate: TZDate
  monthEndDate: TZDate
}

export type WeekContext = {
  weekOfYear: number
  weekOfMonth: number
  weekStartDate: TZDate
  weekEndDate: TZDate
}

export type DayContext = {
  dayDate: TZDate
  dayOfYear: number
  dayOfMonth: number
  dayOfWeek: number
}

// oxlint-disable-next-line no-empty-object-type
export type PageContext = {}

export const RootContext = createContext<RootContext | null>(null)
export const YearContext = createContext<YearContext | null>(null)
export const MonthContext = createContext<MonthContext | null>(null)
export const WeekContext = createContext<WeekContext | null>(null)
export const DayContext = createContext<DayContext | null>(null)
export const PageContext = createContext<PageContext | null>(null)

export const useOptionalYearContext = () => useContext(YearContext)
export const useOptionalMonthContext = () => useContext(MonthContext)
export const useOptionalWeekContext = () => useContext(WeekContext)
export const useOptionalDayContext = () => useContext(DayContext)
export const useOptionalPageContext = () => useContext(PageContext)

export const useRootContext = () => useRequireContext(RootContext)
export const useYearContext = () => useRequireContext(YearContext)
export const useMonthContext = () => useRequireContext(MonthContext)
export const useWeekContext = () => useRequireContext(WeekContext)
export const useDayContext = () => useRequireContext(DayContext)
export const usePageContext = () => useRequireContext(PageContext)
