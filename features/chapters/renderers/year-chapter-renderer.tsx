import { useRootChapterContext, YearChapterContext } from "@/features/chapters/chapter-contexts"
import { ChapterType, YearChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { MonthChapterRenderer } from "@/features/chapters/renderers/month-chapter-renderer"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { tz } from "@date-fns/tz"
import { eachYearOfInterval, endOfYear, getYear, startOfYear } from "date-fns"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export function YearChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<YearChapter>) {
  const { startDate, endDate } = useRootChapterContext()

  const years = eachYearOfInterval({
    start: startDate,
    end: endDate,
  }, {
    in: tz("UTC"),
  })

  return years.map((year) => (
    <YearChapterContext.Provider
      key={year.toString()}
      value={{
        year: getYear(year),
        yearDate: year,
        yearStartDate: startOfYear(year),
        yearEndDate: endOfYear(year),
      }}
    >
      {chapter.children.map((child) => (
        <Fragment key={child.id}>
          {match(child)
            .with({ type: ChapterType.Month }, (child) => (
              <MonthChapterRenderer
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
    </YearChapterContext.Provider>
  ))
}
