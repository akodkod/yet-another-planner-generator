import { TZDate } from "@date-fns/tz"
import { Context, createContext, useContext } from "react"

export type RootChapterContext = {
  startDate: TZDate
  endDate: TZDate
  pageWidth: number
  pageHeight: number
}

export type YearChapterContext = {
  year: number
  yearDate: TZDate
  yearStartDate: TZDate
  yearEndDate: TZDate
}

export type MonthChapterContext = {
  monthDate: TZDate
  monthOfYear: number
  monthStartDate: TZDate
  monthEndDate: TZDate
}

export type WeekChapterContext = {
  weekOfYear: number
  weekOfMonth: number
  weekStartDate: TZDate
  weekEndDate: TZDate
}

export type DayChapterContext = {
  dayDate: TZDate
  dayOfYear: number
  dayOfMonth: number
  dayOfWeek: number
}

// oxlint-disable-next-line no-empty-object-type
export type PageChapterContext = {}

export const RootChapterContext = createContext<RootChapterContext | null>(null)
export const YearChapterContext = createContext<YearChapterContext | null>(null)
export const MonthChapterContext = createContext<MonthChapterContext | null>(null)
export const WeekChapterContext = createContext<WeekChapterContext | null>(null)
export const DayChapterContext = createContext<DayChapterContext | null>(null)
export const PageChapterContext = createContext<PageChapterContext | null>(null)

export const useOptionalYearChapterContext = () => useContext(YearChapterContext)
export const useOptionalMonthChapterContext = () => useContext(MonthChapterContext)
export const useOptionalWeekChapterContext = () => useContext(WeekChapterContext)
export const useOptionalDayChapterContext = () => useContext(DayChapterContext)
export const useOptionalPageChapterContext = () => useContext(PageChapterContext)

export const useRootChapterContext = () => useRequireContext(RootChapterContext)
export const useYearChapterContext = () => useRequireContext(YearChapterContext)
export const useMonthChapterContext = () => useRequireContext(MonthChapterContext)
export const useWeekChapterContext = () => useRequireContext(WeekChapterContext)
export const useDayChapterContext = () => useRequireContext(DayChapterContext)
export const usePageChapterContext = () => useRequireContext(PageChapterContext)

function useRequireContext<T>(context: Context<T | null>): T {
  const value = useContext(context)
  if (!value) throw new Error("Context not found")

  return value
}
