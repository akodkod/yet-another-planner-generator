import { MonthChapterContext, useRootChapterContext, useYearChapterContext } from "@/features/chapters/chapter-contexts"
import { ChapterType, MonthChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { WeekChapterRenderer } from "@/features/chapters/renderers/week-chapter-renderer"
import { tz, TZDate } from "@date-fns/tz"
import { eachMonthOfInterval, endOfMonth, endOfYear, getMonth, max, min, startOfMonth, startOfYear } from "date-fns"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export function MonthChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<MonthChapter>) {
  const { startDate, endDate } = useRootChapterContext()
  const { yearDate } = useYearChapterContext()

  const yearStartDate = max([startOfYear(yearDate), startDate] satisfies TZDate[])
  const yearEndDate = min([endOfYear(yearDate), endDate] satisfies TZDate[])

  const months = eachMonthOfInterval({
    start: yearStartDate,
    end: yearEndDate,
  }, {
    in: tz("UTC"),
  })

  return months.map((month) => (
    <MonthChapterContext.Provider
      key={month.toString()}
      value={{
        monthDate: month,
        monthOfYear: getMonth(month) + 1,
        monthStartDate: startOfMonth(month),
        monthEndDate: endOfMonth(month),
      }}
    >
      {chapter.children.map((child) => (
        <Fragment key={child.id}>
          {match(child)
            .with({ type: ChapterType.Week }, (child) => (
              <WeekChapterRenderer
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
    </MonthChapterContext.Provider>
  ))
}
