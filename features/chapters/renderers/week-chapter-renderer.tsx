import { useMonthChapterContext, useYearChapterContext, WeekChapterContext } from "@/features/chapters/chapter-contexts"
import { ChapterType, WeekChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { DayChapterRenderer } from "@/features/chapters/renderers/day-chapter-renderer"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { eachWeekOfInterval, endOfWeek, getWeek, getWeekOfMonth, startOfWeek } from "date-fns"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export function WeekChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<WeekChapter>) {
  const { year } = useYearChapterContext()
  const { monthOfYear } = useMonthChapterContext()

  const startDate = new Date(year, monthOfYear, 1)
  const endDate = new Date(year, monthOfYear, 31)

  const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 })

  return weeks.map((week) => (
    <WeekChapterContext.Provider
      key={week.toString()}
      value={{
        weekOfYear: getWeek(week, { weekStartsOn: 1 }),
        weekOfMonth: getWeekOfMonth(week, { weekStartsOn: 1 }),
        weekStartDate: startOfWeek(week, { weekStartsOn: 1 }),
        weekEndDate: endOfWeek(week, { weekStartsOn: 1 }),
      }}
    >
      {chapter.children.map((child) => (
        <Fragment key={child.id}>
          {match(child)
            .with({ type: ChapterType.Day }, (child) => (
              <DayChapterRenderer
                chapter={child}
                parent={chapter}
              />
            ))
            .with({ type: ChapterType.Page }, (child) => (
              <PageChapterRenderer
                chapter={child}
                parent={chapter}
              />
            ))
            .exhaustive()}
        </Fragment>
      ))}
    </WeekChapterContext.Provider>
  ))
}
