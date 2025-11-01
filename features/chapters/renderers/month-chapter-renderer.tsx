import { MonthChapterContext, useRootChapterContext, useYearChapterContext } from "@/features/chapters/chapter-contexts"
import { ChapterType, MonthChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { WeekChapterRenderer } from "@/features/chapters/renderers/week-chapter-renderer"
import { eachMonthOfInterval, endOfMonth, max, min, startOfMonth } from "date-fns"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export function MonthChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<MonthChapter>) {
  const { startDate, endDate } = useRootChapterContext()
  const { year } = useYearChapterContext()

  const yearStartDate = max([new Date(year, 0, 1), startDate])
  const yearEndDate = min([new Date(year, 11, 31), endDate])

  const months = eachMonthOfInterval({ start: yearStartDate, end: yearEndDate })
    .map((month) => month)

  return months.map((month) => (
    <MonthChapterContext.Provider
      key={month.toString()}
      value={{
        monthOfYear: month.getMonth(),
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
